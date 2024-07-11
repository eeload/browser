import _Chrome from './Chrome.js';
import _globalThis from '../runtime/globalThis.js';

export default {
    name:'Maxthon',
    match(ua){
        return ua.includes('Maxthon')||_globalThis?.maxthon;
    },
    version(ua){
        let hash = {
            '109':'7.0',
            '78':'6.0'
        };
        let chrome_version = parseInt(_Chrome.version(ua));
        return ua.match(/Maxthon\/([\d.]+)/)?.[1]
        ||ua.match(/Version\/([\d.]+)/)?.[1]
        ||hash[chrome_version]
        ||'';
    }
};
