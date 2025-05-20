import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deleteUser } from '../redux/slice/UserSlice';

const Users = ({navigation}) => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  const renderItem = ({item,index}) => (
    <View style={styles.itemContainer}>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.email}>{item.email}</Text>
        <Text style={styles.age}>Age: {item.age}</Text>
      </View>

      <View style={styles.actions}>
        {/* Edit Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("UpdateUser",{index,item})}
          style={[styles.actionButton, styles.editButton]}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={() => dispatch(deleteUser(index))}
          style={[styles.actionButton, styles.deleteButton]}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        {users.length > 0 ? ( // Fixed the condition here (changed <0 to >0)
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No Data found to show</Text>
          </View>
        )}

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddUsers')} // Navigate to AddUsers screen
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f2f3',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80, // Add padding to prevent FAB from covering content
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  userInfo: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 8, // Space between buttons
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  editButton: {
    backgroundColor: '#3498db', // Blue color
  },
  deleteButton: {
    backgroundColor: '#e74c3c', // Red color
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 40,
    backgroundColor: '#17A2B8',
    borderRadius: 28,
    elevation: 8, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default Users;
