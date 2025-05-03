import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from './theme';

export default function TranscriptView({ text, listening }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {text}
        {listening && <Text style={styles.cursor}>|</Text>}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding:10, borderColor:Colors.lightGray, borderWidth:1, borderRadius:4, width:'100%' },
  text: { color:Colors.text, minHeight:24 },
  cursor: { opacity:0.8 }
});
