import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pg', '@prisma/client', 'bcryptjs', '@prisma/adapter-pg'],
};

export default nextConfig;
