import React, { Component } from 'react'
import {
    StyleSheet, View, Text,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    ScrollView, AsyncStorage
} from 'react-native'
import { Icon } from 'native-base';
import theme from '../../src/theme/theme';
import firebase from 'react-native-firebase'


const ContentsDrawer = ({ navigation }) => {


    return (
        <View style={{ flex:1,justifyContent:'space-between' }}>
            <View style={{marginTop:30}}>
                <TouchableOpacity onPress={() => navigation.closeDrawer()} >
            <Image
                     source={theme.images.menuIcon}
                    // style={{ width:20, height: 20, }}
                    resizeMode="contain"
                    style={{height:12,transform:[{rotate:'90deg'}],}}
              />
              </TouchableOpacity>
            </View>
        <View style={{paddingLeft: 30}}>
           
            {/* <View style={{alignSelf:"center",justifyContent:"center"}}> */}
            <TouchableOpacity 
            onPress={() => 
                navigation.navigate('ProfileScreen')} 
            style={styles.container}>
                <Text style={styles.textStyle}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('EditProfileScreen')}
                style={styles.container}
            >
                <Text style={styles.textStyle}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
                 onPress={() => navigation.navigate("Settings")}
                style={styles.container}
            >
                <Text style={styles.textStyle}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity 
             onPress={() => navigation.navigate("guidelines")}
          
            style={styles.container}
            >
                <Text style={styles.textStyle}>Guidelines</Text>
            </TouchableOpacity>

            <TouchableOpacity 
           onPress={() => navigation.navigate("privacyPolicy")}
            style={styles.container}>
                <Text style={styles.textStyle}>Privacy</Text>
            </TouchableOpacity>
            {/* </View> */}
        </View>
              <View style={{paddingLeft:30,padding:30}}>
                <TouchableOpacity 
            onPress={() =>{
                firebase
                .auth()
                .signOut()
                .then(async() => {
                    await AsyncStorage.removeItem('setUser')
                    console.log("signed out!")
                    navigation.navigate('Auth')
                });
              
            }
                
                } 
                 style={styles.container}>
                <Text style={styles.textStyle}>Logout</Text>
                 </TouchableOpacity>
              </View>
         </View>
    );
};
const styles = StyleSheet.create({
    textStyle: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
        // lineHeight:13,
        padding: 6


    },
    container: {
        // lineHeight:13,
    }
})

export default ContentsDrawer;

