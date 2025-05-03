import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from './theme';

const steps = [
  { key: 'record', text: 'Tap here to record your dream.' },
  { key: 'sleep', text: 'Tap here to start sleep tracking.' },
  { key: 'history', text: 'Swipe up to see past sessions.' }
];

export default function Onboarding({ children }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('onboarded').then(v => {
      if (!v) setVisible(true);
    });
  }, []);

  const next = async () => {
    if (stepIndex + 1 >= steps.length) {
      await AsyncStorage.setItem('onboarded', 'true');
      setVisible(false);
    } else setStepIndex(stepIndex + 1);
  };

  if (!visible) return children;
  const step = steps[stepIndex];
  return (
    <Modal transparent>
      <View style={styles.overlay}>
        <Text style={styles.text}>{step.text}</Text>
        <TouchableOpacity onPress={next} style={styles.button}>
          <Text style={styles.btnText}>{stepIndex + 1 === steps.length ? 'Got it' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex:1, backgroundColor:'rgba(0,0,0,0.8)',
    justifyContent:'center', alignItems:'center', padding:20
  },
  text: { color:Colors.accent, fontSize:20, textAlign:'center', marginBottom:20 },
  button: { padding:12, backgroundColor:Colors.accent, borderRadius:8 },
  btnText: { color:'#fff', fontSize:16 }
});
