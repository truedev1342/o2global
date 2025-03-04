const nextConfig = {
  async headers() {
    return [
      {
        source: '/_next/static/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },
  reactStrictMode: true,
  trailingSlash: true,
  optimizeFonts: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  experimental: {
    cssChunking: 'strict',
    optimizeCss: true,
    optimizePackageImports: [
      'ua-parser-js',
      'bootstrap',
      'react-bootstrap',
      'next',
      'react-dom',
      'recoil'
    ]
  },
  swcMinify: false,
  /* config options here */
  env: {
    API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
  }
}

export default nextConfig
