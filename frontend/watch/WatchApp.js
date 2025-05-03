import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';
import WatchConnectivity from 'react-native-watch-connectivity';
import Tooltip from 'react-native-walkthrough-tooltip';
import Haptic from 'react-native-haptic-feedback';

export default function WatchApp() {
  const [tipVisible,setTip]=useState(false);
  const shakeAnim=new Animated.Value(0);

  const realityCheck=()=>{
    Haptic.trigger('notificationWarning');
    Animated.sequence([
      Animated.timing(shakeAnim,{toValue:10,duration:50,useNativeDriver:true}),
      Animated.timing(shakeAnim,{toValue:-10,duration:50,useNativeDriver:true}),
      Animated.timing(shakeAnim,{toValue:0,duration:50,useNativeDriver:true})
    ]).start();
    WatchConnectivity.sendMessage({type:'reality-check'});
  };

  return (
    <View style={styles.container}>
      <Tooltip isVisible={tipVisible} content={<Text>Tap to reality‑check</Text>}
        placement="top" onClose={()=>setTip(false)}>
        <Animated.View style={{ transform:[{ translateX:shakeAnim }] }}>
          <Button title="Reality Check" onPress={realityCheck} onLongPress={()=>setTip(true)}/>
        </Animated.View>
      </Tooltip>
    </View>
  );
}

const styles=StyleSheet.create({
  container:{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#121212' }
});
