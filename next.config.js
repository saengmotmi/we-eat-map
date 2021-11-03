/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['maps.googleapis.com', 'maps.gstatic.com'],
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
    PROJECT_ROOT: __dirname,
  },
};
