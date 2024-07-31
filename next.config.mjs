/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        // Your server runtime options go here
        // Example:
        // MY_SECRET_KEY: 'my-secret-key',
      },
      images: {
        domains: [
          "img.clerk.com",
          "images.clerk.dev",
        ],
      },
      typescript: {
        // Place TypeScript configuration outside of images
        ignoreBuildErrors: true,
      },
};

export default nextConfig;
