import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigate from "./screens/Navigate";
export default class App extends React.Component {
  render() {
    return (
      <Navigate/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
