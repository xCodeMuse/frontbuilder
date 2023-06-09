const withTM = require("next-transpile-modules")(["@frontbuilder/renderer"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    runtime: "experimental-edge",
  },
};

module.exports = withTM(nextConfig);
