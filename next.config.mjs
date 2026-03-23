/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "ghchart.rshah.org",
      "skillicons.dev",
      "github-profile-trophy.vercel.app",
      "raw.githubusercontent.com",
      "camo.githubusercontent.com",
      "github-readme-stats.vercel.app",
      "res.cloudinary.com",
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github-readme-stats.vercel.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'streak-stats.demolab.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'skillicons.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ghchart.rshah.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github-profile-trophy.vercel.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};


export default nextConfig;
