module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.performance
      .maxEntrypointSize(700000)
      .maxAssetSize(400000)
  },
  runtimeCompiler: true,
}
