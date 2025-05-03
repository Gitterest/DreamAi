import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from './theme';

export default function SleepProgressBar({ segments }) {
  // segments: [{stage:'light',durationPct:30},...]
  return (
    <View style={styles.bar}>
      {segments.map((s,i) => (
        <View key={i}
          style={[styles.seg, { flex: s.durationPct, backgroundColor:
            s.stage==='awake'? '#555':
            s.stage==='light'? '#999':
            s.stage==='deep'? '#333':
            Colors.accent }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection:'row', height:6, width:'100%' },
  seg: {}
});
