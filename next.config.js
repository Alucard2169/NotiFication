module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Enable tree shaking
    config.optimization.minimize = true;
    config.optimization.minimizer[0].options.terserOptions = {
      // Enable tree shaking for production build
      compress: {
        pure_funcs: ["console.log"],
      },
    };

    // Exclude server-side specific packages from client-side bundle
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        module: false,
        net: false,
        child_process: false,
      };
    }

    return config;
  },
};
