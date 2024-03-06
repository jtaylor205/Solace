import React from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'


const Journal = () => {
    const {width, height} = useWindowDimensions()

    return (
      <>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient 
            start={vec(0,0)}
            end={vec(width, height)}
            colors={['#9D89C4', '#FFAC6B']}
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