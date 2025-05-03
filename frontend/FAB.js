import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Haptic from 'react-native-haptic-feedback';
import { Colors } from './theme';

export default function FAB({ recording, onPress }) {
  const iconName = recording ? 'stop' : 'mic';
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => { Haptic.trigger('impactLight'); onPress(); }}
        onLongPress={() => Haptic.trigger('notificationSuccess')}>
        <Icon name={iconName} size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position:'absolute', bottom:30, right:30 },
  fab: {
    width:64, height:64, borderRadius:32,
    backgroundColor:Colors.accent, justifyContent:'center', alignItems:'center',
    elevation:6
  }
});
