module.exports = {
    pwa:{
        name: "my-pwa-app",
        workboxPluginMode:"InjectManifest",
        workboxOptions: {
            swSrc: "src/service-worker.js"
        }
    }
};