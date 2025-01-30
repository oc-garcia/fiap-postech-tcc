import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
};

export default nextConfig;
