import userAgent from '../runtime/userAgent.js';

export default {
    name:'DuckDuckBot',
    parse(ua = userAgent){
        return {
            is:ua.includes('DuckDuckBot'),
            version:''
        };
    }
}