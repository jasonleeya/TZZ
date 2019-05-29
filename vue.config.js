module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.10.119',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
