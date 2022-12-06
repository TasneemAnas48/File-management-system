const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
});
module.exports = {
  runtimeCompiler: true,

  transpileDependencies: [
    'vuetify'
  ]
}
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/dashboard-admin/" : "/",
  };