
const COOKIE_NAME = "__Host-classroom_invite";
const LINK_LIFETIME_SECONDS = 3600;

function denyAccess() {
  return new Response("Invitation required, invalid, or expired.", {
    status: 403,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

async function hashToken(token) {
  const digest = await crypto.subtle.digest(
    "SHA-256", new TextEncoder().encode(token)
  );
  return Array.from(new Uint8Array(digest))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

function generateToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function checkInvitation(env, token) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(token || "")) return null;

  const hash = await hashToken(token);
  const record = await env.CYBER_AWARENESS_INVITES.get(
    `invite:${hash}`, { type: "json" }
  );

  if (!record || record.revoked === true) return null;
  if (!Number.isFinite(record.expiresAt)) return null;
  if (Date.now() >= record.expiresAt) return null;
  return record;
}

function readCookie(request) {
  const cookies = request.headers.get("Cookie") || "";
  for (const item of cookies.split(";")) {
    const [name, ...value] = item.trim().split("=");
    if (name === COOKIE_NAME) return value.join("=");
  }
  return null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Only an authorized administrator can create links.
    if (url.pathname === "/api/admin/invitations") {
      if (request.method !== "POST") {
        return new Response("Method not allowed", {
          status: 405,
          headers: {
            "Allow": "POST",
            "Cache-Control": "no-store"
          }
        });
      }

      if (
        typeof env.Invite_Admin_Secret !== "string" ||
        !env.Invite_Admin_Secret ||
        request.headers.get("Authorization") !==
          `Bearer ${env.Invite_Admin_Secret}`
      ) {
        return new Response("Not authorized", {
          status: 401,
          headers: { "Cache-Control": "no-store" }
        });
      }

      const token = generateToken();
      const createdAt = Date.now();
      const expiresAt = createdAt + LINK_LIFETIME_SECONDS * 1000;
      const hash = await hashToken(token);

      await env.CYBER_AWARENESS_INVITES.put(
        `invite:${hash}`,
        JSON.stringify({
          createdAt,
          expiresAt,
          revoked: false
        }),
        { expirationTtl: LINK_LIFETIME_SECONDS }
      );

      return Response.json({
        url: new URL(`/invite/${token}`, url.origin).toString(),
        expiresAt: new Date(expiresAt).toISOString()
      }, {
        headers: {
          "Cache-Control": "no-store",
          "Referrer-Policy": "no-referrer"
        }
      });
    }

    // Verify the student invitation.
    if (url.pathname.startsWith("/invite/")) {
      const token = url.pathname.slice("/invite/".length);
      const invitation = await checkInvitation(env, token);

      if (!invitation) return denyAccess();

      const remaining = Math.max(1, Math.min(
        LINK_LIFETIME_SECONDS,
        Math.floor((invitation.expiresAt - Date.now()) / 1000)
      ));

      return new Response(null, {
        status: 302,
        headers: {
          "Location": "/?classroom=live-practice",
          "Set-Cookie":
            `${COOKIE_NAME}=${token}; Path=/; ` +
            `HttpOnly; Secure; SameSite=Lax; Max-Age=${remaining}`,
          "Cache-Control": "no-store",
          "Referrer-Policy": "no-referrer"
        }
      });
    }

    // Protect website files from unauthorized visitors.
    const invitation = await checkInvitation(env, readCookie(request));
    if (!invitation) return denyAccess();

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    headers.set("Cache-Control", "private, no-store");
    headers.set("Referrer-Policy", "no-referrer");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
