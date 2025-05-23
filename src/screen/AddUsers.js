import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slice/UserSlice';

const AddUsers = ({ navigation }) => {
    const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
  });
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = () => {
   
    const newUser = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        age: parseInt(formData.age)
      };
    dispatch(addUser(newUser))
    navigation.goBack()
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Add New User</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter username"
            value={formData.username}
            onChangeText={text => handleInputChange('username', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={text => handleInputChange('email', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter age"
            keyboardType="numeric"
            value={formData.age}
            onChangeText={text => handleInputChange('age', text)}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add User</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default AddUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#2E86AB',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
