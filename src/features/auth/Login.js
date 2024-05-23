import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux'; // Import hooks from react-redux
import {addUser, deleteUsers} from '../../redux/slices/userSlice'; // Import the addUser action from userSlice
import {faker} from '@faker-js/faker';


const Login = () => {
  const dispatch = useDispatch(); // useDispatch is used to dispatch actions to the Redux store
  const data = useSelector(state => state.users); // useSelector is used to access the state from the Redux store
  console.log('userData ', data);
  const generateRandomName = () => {
    const name = faker.internet.userName(); // Generate a random full name
    dispatch(addUser(name)); // Dispatch the addUser action with the payload 'Gaurav'
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <View
      style={{
        flex: 1,
        backgroundColor: 'cyan',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ScrollView>
        {data.map((res, id) => (
          <View key={id}>
            <Text onPress={()=>{dispatch(deleteUsers(id))}}>{res}</Text>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{
          padding: 20,
          backgroundColor: 'red',
          borderRadius: 9,
          position: 'relatove',
          bottom: '0',
        }}
        onPress={() => {
          generateRandomName();
        }}>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
