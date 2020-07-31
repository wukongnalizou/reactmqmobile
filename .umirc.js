import routes from './config/routes';
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  hash: true,
  // history: 'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'newMoguPlan',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
    ["babel-plugin-import", { libraryName: "antd-mobile", style: "css" }],
  ],
  // routes
}
