export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "formidable",
    "@unlok-co/nuxt-stripe",
    "nuxt-vue3-google-signin",
  ],
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  stripe: {
    server: {
      key: process.env.STRIPE_SECRET_KEY,
      options: {
        apiVersion: "2022-11-15",
      },
    },
    client: {
      key: process.env.STRIPE_PUBLISHABLE_KEY,
    },
  },
  ssr: false,
  runtimeConfig: {
    public: {
      devUrl: process.env.DEVELOPMENT_URL,
      prodUrl: process.env.PRODUCTION_URL,
      env: process.env.NODE_ENV,
    },
    private: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      stagingDB: process.env.STAGING_POSTGRES_STRING,
      prodDB: process.env.PRODUCTION_POSTGRES_STRING,
    },
  },
  routeRules: {
    // Homepage pre-rendered at build time
    "/": { prerender: true },
    // Blog posts page generated on demand, revalidates in background, cached on CDN for 1 hour (3600 seconds)
    "/blog": { ssr: true },
    // Blog post page generated on demand once until next deployment, cached on CDN
    "/blog/**": { ssr: true },
    // Add cors headers on API routes
    "/api/**": { cors: true },
  },
});
