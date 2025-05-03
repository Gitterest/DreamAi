import AppleHealthKit from 'react-native-health';
import { NativeEventEmitter, NativeModules } from 'react-native';

const options={ permissions:{ read:['SleepAnalysis'], write:[] } };
let emitter;

export function startSleepTracking() {
  AppleHealthKit.initHealthKit(options,(err)=>{ if(err) console.error(err); });
  emitter = new NativeEventEmitter(NativeModules.AppleHealthKit);
}

export function subscribeSleep(cb) {
  emitter.addListener('SleepAnalysis', event=>cb(event));
}
