
const COOKIE_NAME = "__Host-classroom_invite";
const ONE_HOUR = 60 * 60 * 1000;

function denyAccess() {
  return new Response(
    "Invitation required, invalid, or expired.",
    {
      status: 403,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      }
    }
  );
}

async function hashToken(token) {
  const bytes = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function checkInvitation(env, token) {
  if (!/^[A-Za-z0-9_-]{43}$/.test(token || "")) {
    return null;
  }

  const hash = await hashToken(token);

  const invitation = await env.CYBER_AWARENESS_INVITES.get(
    `invite:${hash}`,
    { type: "json" }
  );

  if (!invitation) return null;
  if (invitation.revoked === true) return null;
  if (!Number.isFinite(invitation.expiresAt)) return null;
  if (Date.now() >= invitation.expiresAt) return null;

  return invitation;
}

function readCookie(request) {
  const cookies = request.headers.get("Cookie") || "";

  for (const item of cookies.split(";")) {
    const [name, ...value] = item.trim().split("=");

    if (name === COOKIE_NAME) {
      return value.join("=");
    }
  }

  return null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Accept a generated invitation link.
    if (url.pathname.startsWith("/invite/")) {
      const token = url.pathname.slice("/invite/".length);
      const invitation = await checkInvitation(env, token);

      if (!invitation) return denyAccess();

      const remaining = Math.max(
        1,
        Math.min(
          3600,
          Math.floor((invitation.expiresAt - Date.now()) / 1000)
        )
      );

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

    // Require a valid invitation for website files.
    const token = readCookie(request);
    const invitation = await checkInvitation(env, token);

    if (!invitation) return denyAccess();

    // Serve the existing website after verification.
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    headers.set("Cache-Control", "private, no-store");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
