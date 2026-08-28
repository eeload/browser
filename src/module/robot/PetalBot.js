import userAgent from '../runtime/userAgent.js';
export default {
    name:'PetalBot',
    parse(ua = userAgent){
        return {
            is:ua.includes('PetalBot'),
            version:ua.match(/PetalBot\/([\d.]+)/)?.[1]||''
        };
    }
}
