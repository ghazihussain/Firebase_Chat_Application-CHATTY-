
import React, { Component } from 'react'
import { View } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthStack from './src/navigation/AuthStack';
import Splash1 from './src/screens/SplashScreen'
import MainApp from './src/navigation/TabNavigator';
import Chat from './src/screens/Chat/Chat'

console.disableYellowBox = true;
const RootNavigator = createSwitchNavigator(
  {
    Splash1:Splash1,
    Auth: AuthStack,
    Main: MainApp,
    Chat: Chat,
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