module.exports = {
    pwa:{
        name: "swapito",
        workboxPluginMode:"InjectManifest",
        workboxOptions: {
            swSrc: "src/service-worker.js"
        }
    }
};