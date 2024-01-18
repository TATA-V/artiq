/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['phinf.pstatic.net', 'ifh.cc', 'lh3.googleusercontent.com', 'zuvqhyraygegegljnixc.supabase.co'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
      },
    ];
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
