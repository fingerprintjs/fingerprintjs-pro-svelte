module.exports = {
  excludePrivate: true,
  excludeProtected: true,
  tsconfig: './tsconfig.docs.json',
  out: {
    sort: ['source-order', 'static-first'],
  },
}
