import React from 'react';
import { Image, View, Dimensions,Alert, TouchableOpacity, TouchableHighlight, Text } from 'react-native';
import { Icon, Input } from 'native-base';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator,
    DrawerActions,
    createSwitchNavigator
} from "react-navigation";
import Home1 from '../screens/Tab/Home1';
import Home2 from '../screens/Tab/Home2';
import Home3 from '../screens/Tab/Home3';
import Home4 from '../screens/Tab/Home4';
import Home5 from '../screens/Tab/Home5';
import theme from '../utils/theme';


const Home1Nav = createStackNavigator(
    {
        Home1,
    },
    {
        initialRouteName: 'Home1',
        headerMode:'none',

    
        navigationOptions: ({ navigation }) => ({

            tabBarIcon: ({ tintColor }) => {
                console.log("Route Name", navigation.state.routeName)


                if (tintColor === theme.colors.purple) {
                    return (
                        <TouchableOpacity>

                            <Icon name={'md-home'} style={{ color: theme.colors.blue }} />

                        </TouchableOpacity>
                    )
                }
                else {
                    return (
                        <Icon name={'md-home'} style={{ color: 'black' }} />
                    )
                }
            }
        }),

    }
);

const Home2Nav = createStackNavigator(
    {
        Home2,
        
    },
    {
        initialRouteName: 'Home2',
        headerMode:'none',
        navigationOptions: ({ navigation }) => ({
            
            tabBarIcon: ({ tintColor }) => {

                
                if (tintColor === theme.colors.purple) {
                    return (
                        <TouchableOpacity>
                            <Icon name={'message1'}  type={'AntDesign'} style={{ color: theme.colors.blue,fontSize:23,fontWeight:"bold" }}/>
                        </TouchableOpacity>

                    )

                } else {
                    return (

                        <Icon name={'message1'}  type={'AntDesign'} style={{ color: 'black',fontSize:23,fontWeight:"bold" }} />
                    )

                }
            }
        })
    }
);

const Home3Nav = createStackNavigator(
    {
        Home3,
    },
    {
        initialRouteName: 'Home1',
        // headerMode:'none',

        navigationOptions: ({ navigation }) => ({
            
            tabBarIcon: ({ tintColor }) => {

                if (tintColor === theme.colors.purple) {
                    return (
                        <TouchableOpacity>
                            <Icon name={'plus'} type='FontAwesome' style={{ color: theme.colors.blue}} />
                        </TouchableOpacity>

                    )

                } else {
                    return (

                        <Icon name={'plus'} type='FontAwesome' style={{ color: 'black' }} />
                    )

                }
            }
        })
    }
);
const Home4Nav = createStackNavigator(
    {
        Home4,
    },
    {
        initialRouteName: 'Home3',
        headerMode:'none',

        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {

                if (tintColor === theme.colors.purple) {
                    return (
                        <TouchableOpacity>

                            <Icon name={'star'} type='MaterialCommunityIcons' style={{ color: theme.colors.blue }} />

                        </TouchableOpacity>

                    )

                } else {
                    return (

                        <Icon name={'star'} type='MaterialCommunityIcons' style={{ color: 'black' }} />
                    )

                }
            }
            
        }),
       
       
    }
    
);
const Home5Nav = createStackNavigator(
    {
        Home5,
    },
    {
        initialRouteName: 'Home5',
        headerMode:'none',
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: theme.colors.purple },
            headerTitleStyle: { color: 'white', flex: 1, textAlign: 'center', fontSize: 17, marginLeft: 0 },
            headerLeft: (
                <View style={{ marginLeft: 15 }}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.toggleLeftDrawer()
                        }
                    >
                        <Image
                            source={theme.images.menuIcon}
                            style={{ width: 25, height: 25, }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

            ),
            headerRight: (
                <View><Text></Text></View>
            )
        }),

        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {

                if (tintColor === theme.colors.purple) {
                    return (
                        <TouchableOpacity>

                            <Icon name={'user'} type='FontAwesome' style={{ color: theme.colors.blue }} />
                        
                        </TouchableOpacity>

                    )

                } else {
                    return (

                        <Icon name={'user'} type='FontAwesome' style={{ color: 'black' }} />
                    )

                }
            }
        })
    }
);
const BottomTabNavigator = createBottomTabNavigator(
    {
        Home1: Home1Nav,
        Home2: Home2Nav,
        // Home3: Home3Nav,
        // Home4: Home4Nav,
        Home5: Home5Nav,

    },
    {
        initialRouteName: 'Home1',
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: theme.colors.purple,
            showLabel: false,
            style: {
                borderTopColor: 'white',
            },
        },
    },
    {
        navigationOptions: {
       
        }
    }

);


// const drawerNavigatorLeft = createDrawerNavigator(
//     {
//         Home1: { screen: BottomTabNavigator },
//         EditProfileStack : {screen: EditProfileStack},
//         ProfileStack:{screen: ProfileStack},
//         Settings:Settings,
//         privacyPolicy:{ screen:  privacyPolicy, },
      
//         guidelines:{ screen: guidelines,},

//         EditProfileScreen2: {
//             screen: EditMoreProfile,
//             navigationOptions: ({ navigation }) => ({
//                 title: "LETS'S BUILD YOUR PROFILE",
//                 headerStyle: { backgroundColor: theme.colors.purple },
//                 headerTitleStyle: { color: 'white', flex: 1, textAlign: 'center', fontSize: 17, marginLeft: 0 },
//                 headerLeft: (
//                     <View style={{ marginLeft: 15 }}>
//                         <TouchableOpacity
//                             onPress={() =>
//                                 navigation.navigate('EditProfileScreen')
//                             }
//                         >
//                             <Icon type={"Ionicons"} name="md-arrow-back"
//                                 style={{ color: 'white', fontSize: 25 }} />
//                         </TouchableOpacity>
//                     </View>

//                 ),
//                 headerRight: (
//                     <View><Text></Text></View>
//                 )
//             })
//         }

//     },
//     {
//         getCustomActionCreators: (route, stateKey) => {
//             return {
//                 toggleLeftDrawer: () => DrawerActions.toggleDrawer({ key: stateKey })
//             };
//         },
//         initialRouteName: "Home1",
//         gesturesEnabled: false,
//         drawerBackgroundColor: theme.colors.purple,
//         drawerPosition: "left",
       

//         contentComponent: ContentContainer,
//     },
// );


const MainApp = createStackNavigator(
    {
        Home1: { screen: BottomTabNavigator }
          // drawerNavigatorLeft: drawerNavigatorLeft
    },
    {
        initialRouteName: "Home1",
        headerMode: 'none',

    },


);
export default MainApp;