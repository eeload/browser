import userAgent from '../runtime/userAgent.js';

export default {
    name:'OpenBSD',
    parse(ua = userAgent){
        return {
            is:ua.includes('OpenBSD'),
            version:''
        };
    }
}