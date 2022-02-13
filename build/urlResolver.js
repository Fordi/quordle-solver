/**
 * This is used so that eslint doesn't balk on unpkg-based resources.
 */
module.exports = {
  interfaceVersion: 2,
  resolve(source) {
    let url;
    try {
      // If it's a valid URL; just roll with it.
      url = new URL(source);
    } catch (_) { /* skip */ }
    return { found: !!url, path: null };
  },
};
