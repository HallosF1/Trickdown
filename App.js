import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { Audio } from 'expo-av';

import Countdown from './src/components/Countdown';

const colors = [
  'white',
  'blue',
  'green',
  'pink',
  'red',
  'purple',
  'yellow',
  'gray',
];

export default function App() {
  const [running, setRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [music, setMusic] = useState(null);
  const [color, setColor] = useState(0);


  async function play() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/sounds/beep120.mp3')
    );
    setMusic(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return music
      ? () => {
          console.log('Unloading Sound');
          music.unloadAsync(); }
      : undefined;
  }, [music]);

  useEffect(() => {
    const interval = setInterval(() => {
      setColor((c) => (c === 9 ? 0 : c + 1));
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.icon}>
          <Ionicons name='warning-outline' size={200} color={colors[color]}/>
        </View>
        <View style={{...styles.textContainer, borderColor: colors[color]}} >
          <Text style={{...styles.text, color: colors[color]}}>ALL YOUR DATA WILL BE SHARED</Text>
          <Text style={{...styles.text, color: colors[color]}}>WITH YOUR FRIENDS</Text>
          <Text style={{...styles.text, color: colors[color]}}>IN</Text>
          <Countdown isPaused={!isStarted} />
        </View>
        {running ? <View></View> : 
        <View style={styles.button}>
          <TouchableOpacity onPress={() => {
            setRunning(true)
            setIsStarted(true)
            play()
            }}>
            <Text style={{...styles.text, color:'yellow'}}>START</Text>
          </TouchableOpacity>
        </View>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center'
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 30,
    borderWidth: 5,
    padding: 10
  },
  text: {
    fontSize: 22
  },
  icon: {
    alignItems: 'center', 
  },
  clockContainer: {
    alignItems: 'center',
    marginVertical: 30,
    borderColor: 'red',
    borderWidth: 5,
    height: 100,
    justifyContent: 'center',

  },
  min: {
    color: 'red',
    fontSize: 70
  },
  button: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    borderColor: 'yellow',
    borderWidth: 5
  }
});
