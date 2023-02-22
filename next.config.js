module.exports = {
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com"],
    unoptimized: true,
    loader: "static",
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
