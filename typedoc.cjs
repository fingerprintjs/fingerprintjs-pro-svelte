module.exports = {
  excludePrivate: true,
  excludeProtected: true,
  tsconfig: './tsconfig.docs.json',
  mode: "modules",
  out: {
    sort: ['source-order', 'static-first'],
  },
};
