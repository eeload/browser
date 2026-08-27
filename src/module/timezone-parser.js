export default {
    name:'timezone',
    parse(){
        return {};
    },
    async getInfo(){
        let timezone = Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone;
        
        const offsetMinutes = (new Date()).getTimezoneOffset();
        const offsetHours = -offsetMinutes / 60;
        return {
            timezone,
            timezoneOffset: offsetHours
        };
    }
}