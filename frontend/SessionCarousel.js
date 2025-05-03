import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from './theme';

export default function SessionCarousel({ sessions, onSelect, onDelete }) {
  return (
    <FlatList
      data={sessions}
      horizontal
      style={styles.list}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text style={styles.date}>{new Date(item.ts).toLocaleString()}</Text>
          <Text numberOfLines={2} style={styles.summary}>{item.summary}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={()=>onSelect(item)}><Text>View</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>onDelete(item)}><Text>Del</Text></TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={i=>''+i.ts}
    />
  );
}

const styles = StyleSheet.create({
  list: { position:'absolute', bottom:0, backgroundColor:Colors.background, paddingVertical:10 },
  card: { backgroundColor:Colors.lightGray, padding:10, marginHorizontal:5, borderRadius:6, width:200 },
  date: { fontSize:12, color:Colors.text },
  summary: { marginVertical:6, color:Colors.text },
  actions: { flexDirection:'row', justifyContent:'space-between' }
});
