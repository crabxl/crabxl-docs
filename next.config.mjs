import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  // A static export has no server for /_next/image, so serve the files as built.
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default withMDX(config);
