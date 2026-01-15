import { version } from 'react';
import userAgent from '../runtime/userAgent.js';

export default {
    name:'iOS',
    parse(ua = userAgent){
        return {
            is:ua.includes('like Mac OS X'),
            version:ua.match(/OS ([\d_]+) like/)?.[1].replace(/_/g, '.')||''
        };
    },
    async is(){
        let isMatch = this.parse().is;
        if(!isMatch){
            if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
                const uaData = await navigator.userAgentData.getHighEntropyValues([
                    "platform"
                ]);
                return uaData.platform === "iOS";
            }
        }
        return isMatch;
    },
    async version() {
        let version = this.parse().version;
        if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
            const uaData = await navigator.userAgentData.getHighEntropyValues([
                "platformVersion"
            ]);
            return uaData.platformVersion;
        }
        return version;
    }
}