# 雀魂添加新角色插件模板 ![License](https://img.shields.io/github/license/Fr0stbyteR/majsoul-character.svg)

## <b style="color: pink">本项目仅供学习研究使用。未经雀魂官方许可请勿擅自发布新角色插件。</b>
#### 新角色制作方法
1. 安装 `Node.js`，在项目目录运行
    ```
    npm install
    ```
2. 得到新角色的资源文件并整理妥当
3. 请参考 `./characters/12dora/` 目录下 `def.ts` 与 `exports.ts` 进行配置。本项目使用 `webpack-url-loader` 将所有资源文件内联编译到 `js` 文件中，在 `exports.ts` 文件中可以找到所有导入文件的定义，它们均为 `string` 类型的 `DataURI`.
4. `index.ts` 将会对雀魂的代码进行注入，并添加导入的人物。
5. 使用 `webpack` 的 `Banner` 插件添加新的 `userscript` 头
6. 打包代码
    ```
    npm run build
    ```
#### TODO
目前新人物的语音暂时无法在游戏内调节音量，可以 `def.ts` 对 `charDef.sound_volume` 进行设置。

