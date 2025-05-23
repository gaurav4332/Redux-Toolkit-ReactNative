import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Users from '../screen/Users';
import AddUsers from '../screen/AddUsers';
import UpdateUser from '../screen/UpdateUser';
import PostsScreen from '../screen/PostsScreen';

const AppNavigator = () => {
  const stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator 
      initialRouteName="PostsScreen"
      screenOptions={{
        headerShown: false     // Hide header for all screens
      }}
       >
        <stack.Screen name="PostsScreen" component={PostsScreen} />
        <stack.Screen name="Users" component={Users} />
        <stack.Screen name="AddUsers" component={AddUsers} />
        <stack.Screen name="UpdateUser" component={UpdateUser} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
