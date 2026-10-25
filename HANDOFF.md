# HANDOFF — 《那个让人怀念的夏天》短片（压缩前快照 2026-10-25）

## 一句话状态
人物模型做到 v5（`src/cast2.js`，半写实 Q 版，models_v5.jpg 已渲染），**正等用户审图点头**；分镜 `src/scenes/summer.js` 尚未创建；无 BGM；完整渲染未做。

## 用户定的规矩（别破）
1. 只做前 2:12「初遇」章节，132 秒。
2. 先画面后配乐（music.mp3 只是 BGM，不是旁白，且已丢）。
3. 审批流：人物模型 → 分镜 → 完整渲染，每步都要用户确认，不能自己往下跑。
4. 完整渲染必须用户明确选 `local` / `cloud`。
5. 完成后把风格、人物模型、经验沉淀进 painted-animation 插件（**已做**：`C:\Users\Administrator\.dsh\dsh-painted-animation\skill\examples\summer-2026\` + 两条记忆）。

## 工程
`E:\video\summer-mv`（scaffold 好的 p5.brush 工程，npm 已装）
- `src/config.js` → `{ duration:132, bpm:72, offset:0 }`
- `src/summer_kit.js` → 环境 `yardBG/corridorBG/classroomBG/storeBG` + 道具 + 旧版人物（已被覆盖）
- `src/cast2.js` → **当前人设**：`person2/face2/eye2/mouth2/hairFront2/hairBack2/bucket2/glasses2`，末尾同名覆盖 `person/drawFace/...`
- `src/subtitles.js` → 58 行字幕 + `overlayHook`
- `src/scenes/cast.js` → 8 时间点人物表预览（不是成片镜头）
- `studio.html` 脚本顺序：summer_kit → cast2 → subtitles → scenes/cast

## 已验证的 bug 与修法
- 脸上大黑块 = 小形状上用 ink/inkLine 粗笔；改成 `inkLine(...,1.1~1.8,'inkfine')` 或 `paint(...,{ink:null})`。
- 脖子 = 棕色方块压在衣服上；把脖子画在躯干**之前**，梯形收窄。
- 立领像围巾；改白圆领 tee。
- 全身/半身取景：`bust` 用 `camBegin(x, y-u*8.75, u/40, 0)`；人高约 10u。

## 下一步（按顺序）
1. 把 `out/check/models_v5.jpg` 给用户看，等确认（可再微调：男孩眉、女孩帽檐）。
2. 写 `src/scenes/summer.js`，18 镜：
   UFO 庭院 → 走廊请假 → 回教室 → 男的女的 → 趴桌 → 门口初遇 → 贼白/帽子 → 太远 → 打招呼不敢看 → 老刘登场 → 仓库搬桌椅 → 放屁走廊 → 轰隆教室 → 憋红脸递桌 → 她笑 → 看清 → 绝美！
3. 渲染分镜 sheet → 用户确认。
4. 接 BGM（用户提供）→ 用户选 local/cloud → 1920×1080@24fps 132s 完整渲染。

## 常用命令
```
cd E:\video\summer-mv
node --check src/cast2.js
```
预览：`clint_animation_render { projectDir:"E:\video\summer-mv", mode:"sheet", times:[...], out:"out/check/xxx.jpg" }`
