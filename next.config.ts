import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    turbopack: {},
    experimental: {
        reactCompiler: true,
    },
};

export default nextConfig;
