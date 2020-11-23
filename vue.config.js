module.exports = {
  pwa: {
    name: "Swapito",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"
    },
     themeColor: '#17a2b8',
    msTileColor: '#000000',
    iconPaths: {
      msTileImage: 'img/icons/mstile-150x150.png'
    }
  },
  transpileDependencies: ["vuetify"]
};
