import browserParser from './module/browser-parser.js';
import systemParser from './module/system-parser.js';
import deviceParser from './module/device-parser.js';
import gpuParser from './module/gpu-parser.js';
import networkParser from './module/network-parser.js';
import batteryParser from './module/battery-parser.js';
import screenParser from './module/screen-parser.js';
import languageParser from './module/language-parser.js';
import timezoneParser from './module/timezone-parser.js';

import userAgent from './module/runtime/userAgent.js';

import getHashByWebGL from './module/fingerprint/webgl.js';
import getHashByCanvas from './module/fingerprint/canvas.js';
import getHashByFont from './module/fingerprint/font.js';
import getHashByAudio from './module/fingerprint/audio.js';
import getHashByMime from './module/fingerprint/mime.js';

import getMD5 from './module/utils/getMD5.js';

import supportFontFamily from './module/support/font-family.js';
import supportWebGL from './module/support/webgl.js';
import supportNFC from './module/support/nfc.js';

export default {
    parse(ua){
        let data = {};
        [
            browserParser,
            systemParser,
            deviceParser,
        ].forEach(parser=>{
            data = Object.assign(data,parser.parse(ua));
        });
        return data;
    },
    async getInfo(list = ['browser','system','device','gpu','network','battery','screen','language','timezone']){
        let parserList = [
            browserParser,
            systemParser,
            deviceParser,
            gpuParser,
            networkParser,
            batteryParser,
            screenParser,
            languageParser,
            timezoneParser
        ].filter(parser=>list.includes(parser.name));
        let results = await Promise.all(parserList.map(parser=>parser.getInfo()));
        return Object.assign({}, ...results);
    },
    async getFingerprint(list = ['webgl','canvas','font','audio','mime']){
        let parserList = [
            getHashByWebGL, getHashByCanvas, getHashByFont, getHashByAudio, getHashByMime
        ].filter(parser=>list.includes(parser.name));
        let {screenWidth, screenHeight, screenColorDepth, isTouch} = await screenParser.getInfo();
        let group = [userAgent, JSON.stringify({screenWidth, screenHeight, screenColorDepth, isTouch})];
        let values = await Promise.all(parserList.map(parser=>parser.getInfo()));
        let data = {};
        parserList.forEach((parser, index)=>{
            data[parser.name] = values[index];
            group.push(values[index]);  // 按 index 顺序 push，保证指纹稳定
        });
        data['value'] = getMD5(group.join(','));
        return data;
    },
    isSupport(name,value){
        let support = [
            supportFontFamily,
            supportWebGL,
            supportNFC
        ].find(support=>name==support.name);
        return support?support.is(value):false;
    }
};
