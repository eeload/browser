import userAgent from '../runtime/userAgent.js';
import globalThis from '../runtime/globalThis.js';
export default {
    name:'macOS',
    parse(ua = userAgent){
        return {
            is:ua.includes('Macintosh'),
            version:ua.match(/Mac OS X -?([\d_\.]+)/)?.[1].replace(/_/g, '.')||''
        };
    },
    async version(){
        let version = this.parse().version;
        // macOS 11+ 起 UA 冻结在 10_15_7，需用 User-Agent Client Hints 取真实版本
        if(globalThis?.navigator?.userAgentData){
            const uaData = await globalThis.navigator.userAgentData.getHighEntropyValues(["platformVersion"]);
            if(uaData.platform === "macOS"){
                version = uaData.platformVersion||version;
            }
        }
        return version;
    }
}
