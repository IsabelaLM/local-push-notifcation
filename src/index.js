import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import Routes from './routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>oie!</Text>
    </View>
  );
}
