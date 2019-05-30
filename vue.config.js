module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.10.173',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
