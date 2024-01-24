/** @type {import('next').NextConfig} */

//module.exports = {
const moduleExports = {
  reactStrictMode: true,
  env: {
    baseURL:
      process.env.NODE_ENV === "production"
        ? `https://www.incolive.com`
        : "http://localhost:3000",

    PayPal_ClientID:
      process.env.NODE_ENV === "production"
        ? "AWiUfAW3bzZcZ_uxBMEo1mY11LpzY4dtsWjrrvWGxhxjGygA1lxaEJJi337t0NGNhjKm3BJE-Lbc0kKh"
        : "Adj14oLBZL0rUJ8-bRHvHWcvH2m1ZFrN0CiRqc2RLuWO5YGPxfBftbDeo-V6uabEgagNtlvTgo8dtkAh",
    supportMail: "support@sample.com",
    companyName: "TV STREAMS",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.paypalobjects.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = moduleExports;
