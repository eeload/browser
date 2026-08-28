import userAgent from '../runtime/userAgent.js';
export default {
    name:'Applebot',
    parse(ua = userAgent){
        return {
            is:ua.includes('Applebot')||ua.includes('Applebot-Extended'),
            version:ua.match(/Applebot(?:\-Extended)?\/([\d.]+)/)?.[1]||''
        };
    }
}
