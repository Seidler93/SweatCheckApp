const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();
  return {
    ...defaultConfig,
    resolver: {
      sourceExts: [...defaultConfig.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx'],
    },
    transformer: {
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
    server: {
      host: '10.0.0.195', // Use the correct IP address
      proxy: {
        '/graphql': {
          target: 'http://10.0.0.195:8081', // Use the correct GraphQL server address
          changeOrigin: true,
        },
      },
    },
  };
})();
