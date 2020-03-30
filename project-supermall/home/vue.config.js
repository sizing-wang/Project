module.exports = {
    devServer: {
      port: 3006,
      proxy: "http://localhost:3000"
    },
    configureWebpack: {
        resolve: {
            alias: {
                "assets": "@/assets",
                "common": "@/common",
                "components": "@/components",
                "network": "@/network",
                "views": "@/views"
            }
        }
    }
}
