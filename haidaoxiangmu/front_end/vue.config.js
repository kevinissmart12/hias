const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    //代理
    devServer: {
        proxy: {
            '/api': {
                target: "http://localhost:3000",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
        client: {
            webSocketURL: 'ws://0.0.0.0:8080/ws'
        }
    },
})
