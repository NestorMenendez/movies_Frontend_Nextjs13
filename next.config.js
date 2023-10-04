/** @type {import('next').NextConfig} */
const nextConfig = {

    experimental: {
        serverActions: true,
    
      },
      webpack(config) {
        config.resolve.fallback = {
          ...config.resolve.falback,
          fs: false,
        };
        return config;
      },

}

module.exports = nextConfig

