# MyPaper - Academic Paper Repository

一个用于展示论文和研究项目的学术个人网站。仿照参考图片的风格，展示你的论文收集和代码资源。

## 功能特性

- 📄 **论文展示** - 组织和展示你的学术论文
- 💻 **代码链接** - 链接到论文对应的代码实现
- 🏷️ **分类系统** - 按研究方向分类论文
- 📱 **响应式设计** - 适配桌面和移动设备
- 🌓 **深色模式** - 自动适配系统深色模式偏好

## 项目结构

```
MyParpers/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # JavaScript脚本
└── README.md           # 项目说明
```

## 快速开始

### 1. 本地浏览
直接在浏览器中打开 `index.html` 即可查看页面效果。

### 2. 修改内容
编辑 `index.html` 文件：
- 更新论文信息（标题、会议/期刊、链接）
- 添加新的研究分类
- 修改导航菜单

### 3. 推送到 GitHub

#### 创建新的 GitHub 仓库
1. 登录 [GitHub](https://github.com/)
2. 点击 "New" 创建新仓库
3. 仓库名称：`username.github.io` （用你的Github用户名替换username）
4. 选择 "Public"
5. 点击 "Create repository"

#### 推送代码到 GitHub

```bash
# 进入项目目录
cd /c/Users/Ricardo\ M.lu/MyParpers

# 初始化git仓库
git init

# 添加所有文件
git add .

# 创建初始提交
git commit -m "Initial commit: Create MyPaper academic website"

# 关联到远程仓库（用你的用户名替换 username）
git remote add origin https://github.com/username/username.github.io.git

# 重命名分支为main（如果需要）
git branch -M main

# 推送到GitHub
git push -u origin main
```

### 4. 启用 GitHub Pages

1. 进入你的仓库设置：`https://github.com/username/username.github.io/settings`
2. 找到 "Pages" 部分
3. 在 "Source" 下选择 "Deploy from a branch"
4. 选择 "main" 分支和 "/ (root)" 文件夹
5. 点击 "Save"

稍等几分钟，你的网站就会在 `https://username.github.io` 上线了！

## 自定义指南

### 修改个人信息
编辑 `index.html` 中的：
- 页面标题：找到 `<title>MyPaper</title>`
- 页面头部：找到 `<h1>MyPaper</h1>`

### 添加新论文
```html
<li>
    <strong>[XXXX CONF] 论文标题</strong>
    <a href="url_to_paper" class="paper-link">[paper]</a>
    <a href="url_to_code" class="code-link">[code]</a>
</li>
```

### 修改颜色主题
编辑 `style.css` 中的 CSS 变量：
```css
:root {
    --link-color: #0891b2;        /* 链接颜色 */
    --text-color: #333;            /* 文本颜色 */
    --bg-color: #ffffff;           /* 背景颜色 */
    --section-bg: #f5f5f5;         /* 分区背景 */
    --border-color: #e0e0e0;       /* 边框颜色 */
}
```

## 常见问题

**Q: 如何更新已发布的网站？**
A: 修改文件后，提交并推送到GitHub即可：
```bash
git add .
git commit -m "Update: Add new papers"
git push
```

**Q: 页面更新后不显示新内容？**
A: 清除浏览器缓存或在地址栏按 Ctrl+Shift+R 进行硬刷新。

**Q: 如何添加自己的域名？**
A: 在 GitHub Pages 设置中的 "Custom domain" 部分添加你的域名。

## 许可证

MIT License

## 相关资源

- [GitHub Pages 官方文档](https://pages.github.com/)
- [Markdown 语法参考](https://github.github.com/gfm/)
- [HTML/CSS 学习资源](https://developer.mozilla.org/)
