/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "export",
    distDir: "out",
    transpilePackages: ['@uiw/react-codemirror', '@codemirror/lang-markdown', '@codemirror/language-data'],
  };
  
  module.exports = nextConfig;