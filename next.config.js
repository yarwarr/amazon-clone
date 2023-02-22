module.exports = {
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com"],
    disableStaticImages: true,
    unoptimized: true,
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
  },
};
