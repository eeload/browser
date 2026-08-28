import globalThis from './runtime/globalThis.js';

export default {
    name:'battery',
    parse(){
        return {};
    },
    async getInfo(){
        let isCharging = true;
        let battery = 1;
        if(globalThis?.navigator?.getBattery){
            const batteryManager = await globalThis.navigator.getBattery().catch(()=>null);
            if(batteryManager){
                isCharging = batteryManager.charging;
                battery = +batteryManager.level||-1;
            }
        }

        return {
            isCharging,
            battery
        };
    }
}