const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  (ext: string) => ext !== 'png'
);
defaultConfig.resolver.sourceExts.push('png');

module.exports = defaultConfig;