# Yangsiyu Chen · Portfolio

三语静态网站（默认法语，另有英文、中文）。纯 HTML + CSS + JavaScript，不依赖任何框架，也不需要构建步骤。

## 文件夹结构

```
yangsiyu-portfolio/
├── index.html          首页（法语）
├── cyma.html           Cyma 项目页（法语）
├── lv.html             Fondation Louis Vuitton 项目页（法语）
├── sweat.html          Sweat 项目页（法语）
├── ikea.html           IKEA 项目页（法语）
├── en/                 以上页面的英文版
├── zh/                 以上页面的中文版
├── assets/
│   ├── css/            base.css + 每个页面各一份样式
│   ├── js/main.js      语言切换、视差滚动、首页 slogan 圆圈交互
│   ├── img/            按项目分文件夹的图片，logos/ 是学校和公司 logo
│   └── cv/             CV（PDF）
├── vercel.json         Vercel 配置（去掉 .html 后缀、图片缓存）
└── README.md
```

## 在电脑上打开

直接双击 `index.html` 就能看。字体 Geist 从 Google Fonts 加载，所以联网时显示效果才和线上一致；离线时会用系统字体代替。

如果想用本地服务器预览：在这个文件夹里运行 `python3 -m http.server 8000`，然后打开 http://localhost:8000 。

## 上线

**GitHub**：新建一个仓库，把这个文件夹**里面的内容**（不是文件夹本身）上传，然后 commit。

**Vercel**：Add New → Project → 导入上面的 GitHub 仓库。Framework Preset 选 *Other*，Build Command 留空，Output Directory 留空（即根目录），点 Deploy。

**GitHub Pages**（另一种方式）：仓库 Settings → Pages → Deploy from branch → 选 `main` 分支和 `/ (root)`。

## 以后怎么改

- 改文字：直接改对应的 `.html` 文件。注意三种语言各有一份：根目录（法语）、`en/`、`zh/`。
- 换图片：用同样的文件名替换 `assets/img/` 里的图片即可。
- 换 CV：替换 `assets/cv/CV_Yangsiyu_CHEN_EN.pdf`。
- 语言选择会记在浏览器里，下次访问会自动打开上次选的语言。
