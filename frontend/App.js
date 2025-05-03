import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Alert, AppRegistry } from 'react-native';
import Voice from '@react-native-voice/voice';
import Onboarding from './onboarding';
import FAB from './FAB';
import TranscriptView from './TranscriptView';
import SleepProgressBar from './SleepProgressBar';
import SessionCarousel from './SessionCarousel';
import { Colors } from './theme';
import { startSleepTracking, subscribeSleep } from './sleepTracker';
import AsyncStorage from '@react-native-async-storage/async-storage';

AppRegistry.registerComponent('DreamWeaver', () => App);

export default function App() {
  const [dreamText,setDreamText]=useState('');
  const [listening,setListening]=useState(false);
  const [recording,setRecording]=useState(false);
  const [segments,setSegments]=useState([]);
  const [sessions,setSessions]=useState([]);

  useEffect(()=>{
    Voice.onSpeechStart=()=>{ setListening(true); };
    Voice.onSpeechResults=e=>setDreamText(e.value[0]);
    Voice.onSpeechEnd=()=>setListening(false);
    loadSessions();
    subscribeSleep(data=>setSegments(data.levels.map(l=>({stage:l.level, durationPct: l.seconds/3600*100}))));
  },[]);

  const loadSessions=async()=>{
    const json=await AsyncStorage.getItem('sessions');
    setSessions(json?JSON.parse(json):[]);
  };

  const saveSession=async(summary)=>{
    const newS={ts:Date.now(),summary};
    const updated=[newS,...sessions].slice(0,10);
    await AsyncStorage.setItem('sessions',JSON.stringify(updated));
    setSessions(updated);
  };

  const handleFAB=async()=>{
    if(!recording){
      setRecording(true);
      await Voice.start('en-US');
    } else {
      await Voice.stop();
      setRecording(false);
      // call AI service
      const resp=await fetch('https://api/…/process-dream',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({transcript:dreamText,user_id:'u1'})});
      const { summary }=await resp.json();
      saveSession(summary);
    }
  };

  return (
    <Onboarding>
      <SafeAreaView style={styles.container}>
        <SleepProgressBar segments={segments}/>
        <TranscriptView text={dreamText} listening={listening} />
        <FAB recording={recording} onPress={handleFAB}/>
        <SessionCarousel
          sessions={sessions}
          onSelect={s => Alert.alert('Session', s.summary)}
          onDelete={async s=>{ const f=sessions.filter(x=>x.ts!==s.ts); await AsyncStorage.setItem('sessions',JSON.stringify(f)); setSessions(f);}}
        />
      </SafeAreaView>
    </Onboarding>
  );
}

const styles=StyleSheet.create({
  container:{ flex:1, backgroundColor:Colors.background, padding:16 }
});
