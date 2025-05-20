import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import AppNavigator from './src/navigator/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
