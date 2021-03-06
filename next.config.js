const isProd = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
});

module.exports = withMDX(withPWA({
  pageExtensions: ["tsx", "mdx", "js"],
  pwa: {
    disable: false,
    dest: "public",
    register: true
  },
}))


