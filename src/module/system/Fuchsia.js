import userAgent from '../runtime/userAgent.js';

export default {
    name:'Fuchsia',
    parse(ua = userAgent){
        return {
            is:ua.includes('Fuchsia'),
            version:''
        };
    }
}