import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import Login from './src/features/auth/Login'
import store from './src/redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <Login/>
    </Provider>
  )
}

export default App