
import { createStackNavigator } from 'react-navigation';
import React from 'react';
import {TouchableHighlight,Text,StyleSheet,View} from 'react-native';
import {Icon} from 'native-base'
import Register from '../screens/Auth/Register';

import Login from '../screens/Auth/Login';
import theme from '../utils/theme';
import SplashScreen from '../screens/SplashScreen';
import RegisterTwo from '../screens/Auth/RegisterTwo'
import Register3 from '../screens/Auth/Register3'
import UserProfile from '../screens/Auth/UserProfile'

const AuthStack = createStackNavigator({
    Splash: {
        screen: SplashScreen,
        navigationOptions: {
          header: null
  
        }
      },
    LoginScreen:{
        screen:Login,
        navigationOptions:{
             header: null,
            title:'YOUR INTRO'
        }
    },
   
    RegisterScreen:{
        screen:Register,
        navigationOptions:({ navigation })=>({
            header: null,
            title:'Create an account',
            headerLeft: (
                <TouchableHighlight
                    onPress={() => navigation.navigate("RegisterScreen")
                }
                    underlayColor={'#444444'}
                    >
                      
    
                         <Icon type={"Ionicons"} name="ios-arrow-down"
                          style={{color:'black',marginLeft:20,fontSize:25}}/>
                        
                </TouchableHighlight>
            ),
            
        })
    },
   RegisterTwo:{
        screen:RegisterTwo,

        navigationOptions:({ navigation })=>({
            // header: null
            title:'Verification code',
            headerLeft: (
                <TouchableHighlight
                    onPress={() => navigation.goBack()
                }
                    underlayColor={'#444444'}
                    >
                      
    
                         <Icon type={"Ionicons"} name="md-arrow-back"
                          style={{color:'black',marginLeft:20,fontSize:25}}/>
                        
                </TouchableHighlight>
            ),
            
        })
    },
    Register3:{
        screen:Register3,

        navigationOptions:({ navigation })=>({
             header: null,
            title:'Name',
            headerLeft: (
                <TouchableHighlight
                    onPress={() => navigation.goBack()
                }
                    underlayColor={'#444444'}
                    >
                      
    
                         <Icon type={"Ionicons"} name="md-arrow-back"
                          style={{color:'black',marginLeft:20,fontSize:25}}/>
                        
                </TouchableHighlight>
            ),
            
        })
    },
    // UserProfile:{
    //     screen:UserProfile,

    //     navigationOptions:({ navigation })=>({
    //          header: null,
    //         title:'Name',
    //         headerLeft: (
    //             <TouchableHighlight
    //                 onPress={() => navigation.goBack()
    //             }
    //                 underlayColor={'#444444'}
    //                 >
                      
    
    //                      <Icon type={"Ionicons"} name="md-arrow-back"
    //                       style={{color:'black',marginLeft:20,fontSize:25}}/>
                        
    //             </TouchableHighlight>
    //         ),
            
    //     })
    // },
},
{
    defaultNavigationOptions: ({ navigation }) =>({
        headerStyle:{backgroundColor:theme.colors.white},
        headerTitleStyle:{color:'#df',flex:1,textAlign:'center'},
          headerLeft: (
            <TouchableHighlight
                onPress={() => navigation.goBack()
            }
                underlayColor={'#444444'}
                >
                  

                     <Icon type={"Ionicons"} name="ios-arrow-back"
                      style={{color:'white',marginLeft:20,fontSize:25}}/>
                    
            </TouchableHighlight>
        ),
            headerRight:(
            <View></View>
        )
    } )
},
    (navigationOptions = {
      
    })
)

const styles =StyleSheet.create({
})

export default AuthStack