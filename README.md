# browser-parser.js
这个工具是用来做不兼容浏览器跳转的，比如，你的程序最低兼容到ie8，你可以使用此程序轻松地验证所有ie8浏览器，然后对这些浏览器进行跳转，跳转到升级浏览器的页面。

## 安装
```HTML
<script src = './browser-parser.min.js'></script>
```

```shell
yarn add browser-parser-js
```

## 使用
```js
//const browserParser = require('browser-parser-js');
browserParser([{
    name: 'IE',
    version: '8.2',
},{
    name: 'Chrome',
    version: '70',
}], 'https://github.com'); //IE的最低支持为8.2，Chrome的支持为70，如果当前浏览器版本低于最低限制，则跳转到github
```
提示：version代表的是最低支持版本

## 支持的浏览器名称
```
2345Explorer, 360 Browser, Amaya, Android Browser, Arora, Avant, Avast, AVG,
BIDUBrowser, Baidu, Basilisk, Blazer, Bolt, Brave, Bowser, Camino, Chimera,
Chrome Headless, Chrome WebView, Chrome, Chromium, Comodo Dragon, Dillo,
Dolphin, Doris, Edge, Electron, Epiphany, Facebook, Falkon, Fennec, Firebird,
Firefox [Reality], Flock, Flow, GSA, GoBrowser, ICE Browser, IE, IEMobile, IceApe, 
IceCat, IceDragon, Iceweasel, Instagram, Iridium, Iron, Jasmine, K-Meleon,
Kindle, Konqueror, LBBROWSER, Line, Links, Lunascape, Lynx, MIUI Browser,
Maemo Browser, Maemo, Maxthon, MetaSr Midori, Minimo, Mobile Safari, Mosaic,
Mozilla, NetFront, NetSurf, Netfront, Netscape, NokiaBrowser, Oculus Browser,
OmniWeb, Opera Coast, Opera [Mini/Mobi/Tablet], PaleMoon, PhantomJS, Phoenix, 
Polaris, Puffin, QQ, QQBrowser, QQBrowserLite, Quark, QupZilla, RockMelt, Safari, 
Sailfish Browser, Samsung Browser, SeaMonkey, Silk, Skyfire, Sleipnir, Slim, 
SlimBrowser, Swiftfox, Tesla, Tizen Browser, UCBrowser, Vivaldi, Waterfox, WeChat,
Weibo, Yandex, baidu, iCab, w3m, Whale Browser...
```
（来自ua-parser.js)