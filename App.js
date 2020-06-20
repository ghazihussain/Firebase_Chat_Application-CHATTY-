
import React, { Component } from 'react'
import { View, Settings } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthStack from './src/navigation/AuthStack';
import Splash1 from './src/screens/splash1'
import MainApp from './src/navigation/TabNavigator';
import Chat from './src/screens/Chat/Chat'
import firebase from 'react-native-firebase'
import StackProfile from './src/navigation/StackProfile'
import SettingsStack from './src/navigation/SettingsStack'


console.disableYellowBox = true;
const RootNavigator = createSwitchNavigator(
  {
    Splash1:Splash1,
    Auth: AuthStack,
    Main: MainApp,
    Chat: Chat,
    StackProfile:StackProfile,
    SettingsStack:SettingsStack,
    
    // FriendStack:FriendStack,
  },
  {
    initialRouteName: "Splash1",
  }
);

const AppNavigator = createAppContainer(RootNavigator)
class App extends Component {

  constructor() {
    super()
    this.state = {
    
    }
  }
  componentWillUnmount () {
    console.log("componentWillUnmount")
    var user_id=firebase.auth().currentUser.uid
    console.log(user_id)
   const ref = firebase.database().ref(`users/${user_id}/Status`)
  .set({Status:false});

  }

  render() {
    // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  
    return (
      // <Provider store={store}>
        <AppNavigator />
      // </Provider>

    )
 
  
  }
}
export default App;