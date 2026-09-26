export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://anish-ai.vercel.app/sitemap.xml",
    host: "https://anish-ai.vercel.app",
  };
}
