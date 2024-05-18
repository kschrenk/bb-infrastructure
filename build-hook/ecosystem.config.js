module.exports = {
  apps: [
    {
      name: "build-hook",
      script: "NODE_ENV=production node index.js",
    },
  ],
};
