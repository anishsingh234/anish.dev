const baseUrl = "https://anish-ai.vercel.app";

export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: baseUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/resume.pdf`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
