<h1 align="center">梦奇app活动项目说明</h1>
app活动页面通用脚手架

<div>
<a href="https://umijs.org/">
    <img src="https://img.shields.io/badge/build%20with-umi-blue">
</a>
<a href="https://github.com/axios/axios">
    <img src="https://img.shields.io/badge/request%20with-axios-orange">
</a>
</div>


## 使用

项目下载

```
git clone -b develop http://192.168.2.242:9999/javaScript/Brokerage.git
```

依赖安装(进入文件夹根目录)

配置私服
```
$ npm config set registry http://192.168.2.242:8081/repository/npm/
```

登录私服(username: admin, password: admin123)
```
$ npm login –registry=http://192.168.2.242:8081/repository/npm/
```

安装依赖
```bash
$ npm i
```

项目启动 （删除models中无用文件，否则启动失败）
```bash
$ npm start
```
其他命令(详见package.json)


## 结构说明

```

- mock                         #本地模拟数据 
- public                       #Favicon
- src                          #开发文件夹
  - assets                     #静态资源文件
    - demo                     #对应页面图片
  - components                 #活动组件
    - Demo                     #单个组件
      - index.js
      - index.less
  - layout                     #布局组件
  - models                     #活动model
    - demo.js                  #demo页model
  - pages                      #业务页面
    - document.ejs             #模板文件
    - Demo                     #模块名称
      - index.js               #demo页面
      - index.less             #demo样式
  - services                   #接口服务
    - demo.js                  #demo请求
  - utils                      #全局通用工具库
    - iosBridge.js             #ios通信
    - localData.js             #本地存储
    - setting.js               #配置信息
    - urlSearch.js             #url参数解析
    - request.js               #请求配置
  - app.js                     #运行时配置文件
  - global.css                 #全局样式
  - global.js                  #全局js
- eslintrc.js                  #eslint配置规则文件
- .gitignore                   #git提交忽略文件
- package.json                 #命令及依赖
- README.md                    #说明文档
- yarn.lock                    #版本锁定
```

## 路由配置

Umi约定式路由，如`pages`下`Demo`下`index.js`路由地址为`/Demo`

## 请求

```
request({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});

```


## 日常开发使用约定
出于对项目的维护,迁移及代码接手原因，约定如下
### 开发流程相关
1. 新增页面 `-pages`下帕斯卡命名(既首字母大写，和每一个逻辑断点大写标记)文件夹如: `Demo`下创建文件 `index.js` `index.less`,类命名与文件夹名一致。
2. 新增model `-models`下驼峰命名如: `demo.js`, 命名空间与文件名一致，`namespace: 'demo'`。effects做异步请求， reducers做状态修改。model层只能做数据处理，不能做UI显示 如：toast notification message等 和 不能引入路由控制router 如 `router.push`等。如需引入请传入`callback`函数，进行回调处理。
3. 新增service `-services`下驼峰命名如: `demo.js`,请求时引用全局工具类util request 做统一请求处理。
4. 新建组件 `components`下帕斯卡命名文件夹如`Demo`,下创建`index.js` `index.less`。类名与文件夹名一致。
5. less.js  样式书写需在index.less最外层div定义Container 如`<div className={styles.Container} />`在less文件中需要有根`.Container{}`,其他样式在`.Container{}`内嵌套书写，避免全局污染。`!important`样式覆盖绝对禁止使用。[嵌套详见](https://less.bootcss.com/)。
6. 页面内组件封装在组件内部，使用函数组件方式，如 `const ClearInfo = (props) => {...}` 组件命名为帕斯卡 使用为<ClearInfo />。方法内部实现代码限制行数为`80`行。超出80行封装在component里，为模块级组件。
7. utils 工具类命名为驼峰命名如`localData.js`
8. 引用插件及类库使用`import` 引入在使用的`index.js`文件中，禁止修改在`document.ejs`模板文件中`<script>`标签引用。
9. 项目文件git初始化，提交代码前检查对比文件，是否误删误改文件。(编辑器对比或git status)
