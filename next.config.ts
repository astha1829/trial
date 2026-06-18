const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://bulkify.9brainz.com";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/contacts",
        destination: `${API_URL}/api/v1/contacts/`,
      },
      {
        source: "/api/v1/groups",
        destination: `${API_URL}/api/v1/groups/`,
      },
      {
        source: "/api/v1/templates",
        destination: `${API_URL}/api/v1/templates/`,
      },
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;