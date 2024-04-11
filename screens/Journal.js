import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'


const Journal = () => {
    const {width, height} = useWindowDimensions()
    const [gradientColors, setGradient] = useState(['#2E97D1', '#FEC49F','#F56810'])

    useEffect(() => {
      const now = new Date();
      const hours = now.getHours();
    
      if (hours < 12) {
        setGradient(['#2E97D1', '#FEC49F','#F56810']);
      } else if (hours < 18) {
        setGradient(['#66CCFF', '#FFCC99']);
      } else {
        setGradient(['#9D89C4', '#FFAC6B']);
      }
    }, []); 

    return (
      <>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient 
            start={vec(0,0)}
            end={vec(width, height)}
            colors={gradientColors}
            />
        </Rect>
      </Canvas>
      <View style={styles.container}>
        <Text style={styles.greeting}>Journal</Text>
      </View>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      paddingTop: 75,
      paddingHorizontal: 25,
    },
    greeting: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });
  
  export default Journal;