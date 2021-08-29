const UaParser = require('ua-parser-js');

const notHaveWindow = typeof (window) === 'undefined';
const browserNames = ['2345Explorer', '360 Browser', 'Amaya', 'Android Browser', 'Arora', 'Avant', 'Avast', 'AVG', 'BIDUBrowser', 'Baidu', 'Basilisk', 'Blazer', 'Bolt', 'Brave', 'Bowser', 'Camino', 'Chimera', 'Chrome Headless', 'Chrome WebView', 'Chrome', 'Chromium', 'Comodo Dragon', 'Dillo', 'Dolphin', 'Doris', 'Edge', 'Electron', 'Epiphany', 'Facebook', 'Falkon', 'Fennec', 'Firebird', 'Firefox [Reality]', 'Flock', 'Flow', 'GSA', 'GoBrowser', 'ICE Browser', 'IE', 'IEMobile', 'IceApe', 'IceCat', 'IceDragon', 'Iceweasel', 'Instagram', 'Iridium', 'Iron', 'Jasmine', 'K-Meleon', 'Kindle', 'Konqueror', 'LBBROWSER', 'Line', 'Links', 'Lunascape', 'Lynx', 'MIUI Browser', 'Maemo Browser', 'Maemo', 'Maxthon', 'MetaSr Midori', 'Minimo', 'Mobile Safari', 'Mosaic', 'Mozilla', 'NetFront', 'NetSurf', 'Netfront', 'Netscape', 'NokiaBrowser', 'Oculus Browser', 'OmniWeb', 'Opera Coast', 'Opera [Mini/Mobi/Tablet]', 'PaleMoon', 'PhantomJS', 'Phoenix', 'Polaris', 'Puffin', 'QQ', 'QQBrowser', 'QQBrowserLite', 'Quark', 'QupZilla', 'RockMelt', 'Safari', 'Sailfish Browser', 'Samsung Browser', 'SeaMonkey', 'Silk', 'Skyfire', 'Sleipnir', 'Slim', 'SlimBrowser', 'Swiftfox', 'Tesla', 'Tizen Browser', 'UCBrowser', 'Vivaldi', 'Waterfox', 'WeChat', 'Weibo', 'Yandex', 'baidu', 'iCab', 'w3m', 'Whale Browser'];
const userBrowser = new UaParser(notHaveWindow ? 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)' : undefined).getBrowser();

class BrowserParserError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BrowserParserError';
    }
}

/**
 * 得到主版本号、次版本号和修订版本号
 * @param {string} version 提供的版本号
 */
function getVersion(version) {
    const res = version.split('.');
    return {
        large: res[0],
        middle: res[1],
        small: res[2],
    };
}

/**
 * 将简化的版本复原
 * @param {string} version 提供的版本号
 */
function reVersion(version) {
    let res = version;
    const arrayVersion = version.split('.');
    for (let i = 0; i < 3 - arrayVersion.length; i++) {
        res += '.0';
    }
    return res;
}

/**
 * 比较两个版本
 * @param {string} a 比较的版本
 * @param {string} b 被比较的版本
 * @return {bool} 返回版本b是否小于等于a
 */
function rangeVersion(a, b) {
    const arrayVersionA = reVersion(a).split('.').map((x) => parseInt(x, 10));
    const arrayVersionB = reVersion(b).split('.').map((x) => parseInt(x, 10));

    for (let i = 0; i < 3; i++) {
        if (arrayVersionB[i] > arrayVersionA[i]) {
            return false;
        }
    }
    return true;
}

/**
 * 比较指定的版本和ua
 * @param {*} version 指定的版本
 */
function compareUa(version) {
    return rangeVersion(userBrowser.version, version);
}

/**
 * 检测浏览器并跳转，函数带有副作用，但副作用仅在环境在浏览器并且用户浏览器不符合parser标准的情况下生效，在node环境中无效。
 * 在不产生副作用的情况下，将返回一个boolean，为true时表示浏览器不符合规范，反之，为false时浏览器通过验证
 * @param {Array} rules 规则
 * @param {string} href 链接
 * @param {boolean} older 如何处理其他浏览器版本，true将将其设置为违规，false将将其设置为合法，默认false
 * @return {boolean}
 */
function browserParser(rules, href = 'https://browsehappy.com/', order = false) {
    function verify() {
        return (rules.every((x) => (browserNames.includes(x.name)))
            && rules.some((x) => (x.name === userBrowser.name)))
            || order;
    }
    if (!verify()) throw new BrowserParserError('rules参数错误');

    for (const rule of rules) {
        if (rule.name === userBrowser.name && compareUa(rule.version)) {
            if (!notHaveWindow) {
                window.location.href = href;
            } else {
                return true;
            }
        }
    }

    if (!rules.every((x) => (x.name === userBrowser.name)) && order) {
        return true;
    }
    return false;
}

module.exports = {
    getVersion,
    reVersion,
    rangeVersion,
    compareUa,
    browserParser,
};
