## 🍕 初始化

```bash
npm init -y

tsc --init
# 初始化 tsconfig.json

npm init @eslint/config
# 初始化 .eslintrc.js 并安装相应的插件

npm i express body-parser
# 安装依赖

npm i -D @types/node @types/express @babel/cli @babel/core @babel/preset-env @babel/preset-typescript babel-plugin-root-import
# @types/node
# @types/express
# @babel/cli
# @babel/core
# @babel/preset-env
# @babel/preset-typescript
# babel-plugin-root-import
```

配置
`.gitignore`
`.eslintrc.js`,
`.eslintignore`,
`tsconfig.json`,
`babel.config.json`,
`package.json`

- `package.json`

```json
{
  "scripts": {
    "babel": "babel src -d dist -x \".ts\" -w",
    "typeCheck": "tsc --noEmit --watch",
    "nodemon": "npx nodemon dist/app.js"
  },
}
```

- `babel.config.json`

```json
{
  "plugins": [
    [
      "babel-plugin-root-import",
      {
        "rootPathSuffix": "src",
        "rootPathPrefix": "@"
      }
    ]
  ],
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ]
}
```