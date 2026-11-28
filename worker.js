
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      const kvConnected = Boolean(
        env.CYBER_AWARENESS_INVITES
      );

      const secretConnected = Boolean(
        env.Invite_Admin_Secret
      );

      const matchingBindings = Object.keys(env)
        .filter(name => /invite|admin|secret/i.test(name));

      return Response.json({
        ready: kvConnected && secretConnected,
        kvConnected,
        secretConnected,
        matchingBindings
      }, {
        headers: { "Cache-Control": "no-store" }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
