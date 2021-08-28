const UaParser = require('ua-parser-js');

const browserNames = ['2345Explorer', '360 Browser', 'Amaya', 'Android Browser', 'Arora', 'Avant', 'Avast', 'AVG,\nBIDUBrowser', 'Baidu', 'Basilisk', 'Blazer', 'Bolt', 'Brave', 'Bowser', 'Camino', 'Chimera,\nChrome Headless', 'Chrome WebView', 'Chrome', 'Chromium', 'Comodo Dragon', 'Dillo,\nDolphin', 'Doris', 'Edge', 'Electron', 'Epiphany', 'Facebook', 'Falkon', 'Fennec', 'Firebird,\nFirefox [Reality]', 'Flock', 'Flow', 'GSA', 'GoBrowser', 'ICE Browser', 'IE', 'IEMobile', 'IceApe', '\nIceCat', 'IceDragon', 'Iceweasel', 'Instagram', 'Iridium', 'Iron', 'Jasmine', 'K-Meleon,\nKindle', 'Konqueror', 'LBBROWSER', 'Line', 'Links', 'Lunascape', 'Lynx', 'MIUI Browser,\nMaemo Browser', 'Maemo', 'Maxthon', 'MetaSr Midori', 'Minimo', 'Mobile Safari', 'Mosaic,\nMozilla', 'NetFront', 'NetSurf', 'Netfront', 'Netscape', 'NokiaBrowser', 'Oculus Browser,\nOmniWeb', 'Opera Coast', 'Opera [Mini/Mobi/Tablet]', 'PaleMoon', 'PhantomJS', 'Phoenix', '\nPolaris', 'Puffin', 'QQ', 'QQBrowser', 'QQBrowserLite', 'Quark', 'QupZilla', 'RockMelt', 'Safari', '\nSailfish Browser', 'Samsung Browser', 'SeaMonkey', 'Silk', 'Skyfire', 'Sleipnir', 'Slim', '\nSlimBrowser', 'Swiftfox', 'Tesla', 'Tizen Browser', 'UCBrowser', 'Vivaldi', 'Waterfox', 'WeChat,\nWeibo', 'Yandex', 'baidu', 'iCab', 'w3m', 'Whale Browser']
const userBrowser = new UaParser().getBrowser();

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
    return rangeVersion(version, userBrowser.version);
}

function browserParser() {

}

module.exports = {
    getVersion,
    reVersion,
    rangeVersion,
    browserParser,
};
