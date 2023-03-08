module.exports = {
  devServer: {
    overlay: false,
    proxy: process.env.VUE_APP_API_URL,
  },
  outputDir: 'C:\\Users\\pc\\Desktop\\프론트 빌드파일',
  transpileDependencies: ['vuetify'],
};
