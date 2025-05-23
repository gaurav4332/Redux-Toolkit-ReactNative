import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../redux/slice/OnlineUserSlice';


const PostsScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const {onlineUsers,loading,error}= useSelector((state)=>state?.onlineUsers)

console.log(onlineUsers,loading,error)
  useEffect(() => {
   dispatch(fetchUserData())
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.postContainer}
      onPress={() => navigation.navigate('PostDetail', { post: item })}
    >
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text 
        style={styles.postBody}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.body.replace(/\n/g, ' ')}
      </Text>
      <Text style={styles.postMeta}>Post ID: {item.id} • User ID: {item.userId}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.errorText}>Error loading posts</Text>
        <Text style={styles.errorDetail}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            fetchPosts();
          }}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Posts</Text>
        <Text onPress={()=>navigation.navigate('Users')} style={styles.headerTitle}>Add User</Text>
      </View>

      <FlatList
        data={onlineUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text>No posts available</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection:'row',
    justifyContent:'space-between',
    padding: 16,
    backgroundColor: '#6200ee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  listContent: {
    padding: 16,
  },
  postContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  postBody: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  postMeta: {
    fontSize: 12,
    color: '#999',
  },
  errorText: {
    fontSize: 18,
    color: '#d32f2f',
    marginBottom: 8,
  },
  errorDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PostsScreen;


//implent pagination

// import React, { useState, useEffect } from 'react';
// import {
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserData } from '../redux/slice/OnlineUserSlice';

// const PostsScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const { onlineUsers, loading, error } = useSelector((state) => state?.onlineUsers);
//   const [page, setPage] = useState(1);
//   const [allPosts, setAllPosts] = useState([]);
//   const postsPerPage = 10;

//   useEffect(() => {
//     dispatch(fetchUserData());
//   }, []);

//   // Update allPosts when onlineUsers changes
//   useEffect(() => {
//     if (onlineUsers.length > 0) {
//       setAllPosts(onlineUsers);
//     }
//   }, [onlineUsers]);

//   // Get current page posts
//   const currentPosts = allPosts.slice(0, page * postsPerPage);

//   const loadMorePosts = () => {
//     if (currentPosts.length < allPosts.length) {
//       setPage(page + 1);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.postContainer}
//       onPress={() => navigation.navigate('PostDetail', { post: item })}
//     >
//       <Text style={styles.postTitle}>{item.title}</Text>
//       <Text 
//         style={styles.postBody}
//         numberOfLines={2}
//         ellipsizeMode="tail"
//       >
//         {item.body.replace(/\n/g, ' ')}
//       </Text>
//       <Text style={styles.postMeta}>Post ID: {item.id} • User ID: {item.userId}</Text>
//     </TouchableOpacity>
//   );

//   const renderFooter = () => {
//     if (currentPosts.length >= allPosts.length) return null;
//     return (
//       <View style={styles.footer}>
//         <ActivityIndicator size="small" color="#6200ee" />
//       </View>
//     );
//   };

//   if (loading && allPosts.length === 0) {
//     return (
//       <SafeAreaView style={styles.centerContainer}>
//         <ActivityIndicator size="large" color="#6200ee" />
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.centerContainer}>
//         <Text style={styles.errorText}>Error loading posts</Text>
//         <Text style={styles.errorDetail}>{error}</Text>
//         <TouchableOpacity
//           style={styles.retryButton}
//           onPress={() => dispatch(fetchUserData())}
//         >
//           <Text style={styles.retryText}>Try Again</Text>
//         </TouchableOpacity>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Posts</Text>
//       </View>

//       <FlatList
//         data={currentPosts}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={styles.listContent}
//         ListEmptyComponent={
//           <View style={styles.centerContainer}>
//             <Text>No posts available</Text>
//           </View>
//         }
//         ListFooterComponent={renderFooter}
//         onEndReached={loadMorePosts}
//         onEndReachedThreshold={0.5}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   header: {
//     padding: 16,
//     backgroundColor: '#6200ee',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   listContent: {
//     padding: 16,
//   },
//   postContainer: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 1,
//   },
//   postTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
//   },
//   postBody: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//     lineHeight: 20,
//   },
//   postMeta: {
//     fontSize: 12,
//     color: '#999',
//   },
//   errorText: {
//     fontSize: 18,
//     color: '#d32f2f',
//     marginBottom: 8,
//   },
//   errorDetail: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   retryButton: {
//     backgroundColor: '#6200ee',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 6,
//   },
//   retryText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   footer: {
//     padding: 10,
//     alignItems: 'center',
//   },
// });

// export default PostsScreen;