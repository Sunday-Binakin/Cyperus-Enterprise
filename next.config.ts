// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Webpack alias configuration
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },

  // Production optimizations
  productionBrowserSourceMaps: true,
  optimizeFonts: true,
  compress: true,

  // React Strict Mode
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Enable SWC minification
  swcMinify: true,

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      }
    ];
  },
};

// Security headers configuration
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

module.exports = nextConfig;