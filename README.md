# vite-plugin-replace-json

替换JSON文件内容的vite插件
# 快速开始
### 安装
```bash
# npm
npm install vite-plugin-replace-json -D
or
# yarn
yarn add vite-plugin-replace-json -D
or
#pnpm
pnpm install vite-plugin-replace-json -D
```

### 配置
在vite配置文件中引入`vite-plugin-replace-json`，并在`plugins`中配置，建议放在`plugins`的第一个位置，以保证替换后的内容生效。
```typescript
// vite.config.js or vite.config.ts

import { defineConfig } from "vite";
import replaceJson from "vite-plugin-replace-json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [replaceJson([{
    path: "./src/config.json",
    replace: {
      name: '"vite-plugin-replace-json"'
    }
  }])]
});
```

### 使用
`vite-plugin-replace-json`支持替换**多个JSON文件**内容，支持替换一个JSON文件中**多个字段**的值。
```typescript
// vite.config.js or vite.config.ts

import { defineConfig } from "vite";
import replaceJson from "vite-plugin-replace-json";

// https://vitejs.dev/config/
export default defineConfig({

  // 替换多个JSON文件内容
  plugins: [replaceJson([{
    path: "./src/api.json",
    replace: {
      name: '"vite-plugin-replace-json"'
    }
  },{
    path: "./src/config.json",
    replace: {
      name: '"vite-plugin-replace-json"'
    }
  }])]

  // 替换一个JSON文件中多个字段的值
  plugins: [replaceJson([{
    path: "./src/api.json",
    replace: {
      name: '"vite-plugin-replace-json"',
      version: '"1.0.0"'
    }
  }])]
});
```

`vite-plugin-replace-json`支持替换JSON文件中**深层嵌套**字段的值。（类似对象语法）
```typescript
// vite.config.js or vite.config.ts

import { defineConfig } from "vite";
import replaceJson from "vite-plugin-replace-json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [replaceJson([{
    path: "./src/config.json",
    replace: {
      'config.api.name': '"vite-plugin-replace-json"'
    }
  }])]
});
```

`vite-plugin-replace-json`支持替换常用**数据类型**的值，支持替换字符串、数字、布尔值、数组、对象等。
```typescript
// vite.config.js or vite.config.ts

import { defineConfig } from "vite";
import replaceJson from "vite-plugin-replace-json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [replaceJson([{
    path: "./src/config.json",
    replace: {
      // 替换字符串
      name: '"vite-plugin-replace-json"'

      // 替换数字
      version: 1.0.0

      // 替换布尔值
      production: true

      // 替换数组
      list: '[1, 2, 3]'

      // 替换对象
      obj: '{"a": 1, "b": 2}'
    }
  }])]
});
```

### uni-app cli vue3 项目中使用
uni-app项目中的`manifest.json`文件是应用的配置文件，用于指定应用的名称、图标、权限等。但是不支持条件编译，在实际项目开发中往往会遇到以下问题：

1.小程序开发者工具中打开项目后，可以看到项目名称开发版和正式版一致，因为项目名称是由`manifest.json`中的name决定的
2.一份代码打包多个小程序，`manifest.json`中的appid不能动态修改

`vite-plugin-replace-json`通过一些简单的配置，就可以解决这些问题:
```typescript
// vite.config.js or vite.config.ts

import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import replaceJson from "vite-plugin-replace-json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [replaceJson([{
    path: "./src/manifest.json",
    replace: {
      name: 'vite-plugin-replace-json-开发版', // 仅示例，项目中可以根据开发环境动态替换
      appid: 'xxxxxxxx' // 仅示例，项目中可以可以使用自定义编译平台动态配置
    }
  }]), uni()]
});
```