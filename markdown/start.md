## 🍕 初始化

### 初始化 npm, ts, eslint

```bash
npm init -y

tsc --init
# 初始化 tsconfig.json

npm init @eslint/config
# 初始化 .eslintrc.js 并安装相应的插件
```

### 安装依赖

- babel

  ```bash
  npm i -D  @babel/cli @babel/core @babel/preset-env @babel/preset-typescript babel-plugin-root-import
  # @babel/cli
  # @babel/core
  # @babel/preset-env
  # @babel/preset-typescript
  # babel-plugin-root-import
  ```

- express, body-parse, mongoose

  ```bash
  npm i express body-parser mongoose
  ```

- 声明文件(node, express)

  ```bash
  npm i -D @types/node @types/express
  # @types/node
  # @types/express
  ```

### 编辑配置文件

- `.gitignore`
- `.eslintrc.js` 直接拷贝
- `.eslintignore`
- `tsconfig.json`
- `babel.config.json`
- `package.json` 中的脚本
