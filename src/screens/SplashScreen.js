import React from 'react';
import {View,Text, Button,StyleSheet,Dimensions,Image,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons'
import theme from '../utils/theme';
Icon.loadFont();
MaterialIcons.loadFont();


const SplashScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>

          <View style={styles.header} >

              <Animatable.Image source={require('../assets/mainLogo.png')}
              animation="bounceIn"
              duraton="3000"
              style={styles.logo}
              resizeMode="stretch"

              />

          </View>
          <Animatable.View 
          animation="fadeInUpBig"

          
          style={styles.footer}>
              <Text style={styles.title}>Stay connected with everyone!</Text>
              <Text style={styles.text}>Sign in with account</Text> 
              <View style={styles.button}>
              <TouchableOpacity
              onPress={()=>navigation.navigate('LoginScreen')}
              >
                  <LinearGradient
                  colors={['#FFF','#FFF']}
                  style={styles.signIn}
                  >
                      <Text style={styles.textSign}> Get Started</Text>
                      <MaterialIcons 
                      name="navigate-next"
                      color="#FFF"
                      size={20}
                    
                    
                      
                      />

                  </LinearGradient>

              </TouchableOpacity>
              </View>

          </Animatable.View>

        
      </View>
    );
  }
  

  export default SplashScreen;

  const {height} = Dimensions.get("screen");
  const height_logo = height * 0.28;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: "#FFF"
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: theme.colors.blue,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: '#FFF',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,
       
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: theme.colors.blue,
        fontWeight: 'bold'
    }
  });