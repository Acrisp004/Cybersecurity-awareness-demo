export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      const ready = Boolean(
        env.CYBER_AWARENESS_INVITES &&
        env.Invite_Admin_Secret
      );

      return Response.json(
        { ready },
        {
          status: ready ? 200 : 503,
          headers: { "Cache-Control": "no-store" }
        }
      );
    }

    return env.ASSETS.fetch(request);
  }
};
