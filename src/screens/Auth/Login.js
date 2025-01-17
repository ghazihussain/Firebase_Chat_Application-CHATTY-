
import React,{useState} from 'react';
import {View,Text, Button,StyleSheet,AsyncStorage,TouchableOpacity,Dimensions,TextInput,Platform, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Value } from 'react-native-reanimated';
import theme from '../../utils/theme';
import firebase from 'react-native-firebase'

FontAwesome.loadFont();
Feather.loadFont();


const SigninScreen = ({ navigation }) => {





  const [data,setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,

  })
  
  const onPressButton=()=>{
    firebase.auth()
   .signInWithEmailAndPassword(data.email, data.password)
   .then(() => {
      AsyncStorage.setItem('setUser','true')
      var uid =firebase.auth().currentUser.uid
      firebase.database().ref(`users/${uid}/Status`).set({
        Status:true
      })
     navigation.navigate("Home1")
   })
   .catch(error => {
     if (error.code === 'auth/email-already-in-use') {
       console.log('That email address is already in use!');
     }
 
     if (error.code === 'auth/invalid-email') {
       console.log('That email address is invalid!');
     }
 
     console.error(error);
   });
   }
  const textInputChange = (val)=>{
    if (val.length !==0){
      setData({
        ...data,
        email: val,
        check_textInputChange: true
      })
    }else{
      setData({
        ...data,
        email: val,
        check_textInputChange: false
      })

    }
  }
  const handlePasswordChange=(val)=>{
    setData({
      ...data,
      password: val,
    })
  }
  const updateSecureTextEntry= () => {
    setData({
      ...data,
      secureTextEntry:!data.secureTextEntry
    })
  }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={theme.colors.blue} barStyle="light-content"/>
        <View style={styles.header}>
          <Text style={styles.text_header}>Welcome!</Text>

        </View>
        <Animatable.View 
        animation="fadeInUpBig"
        style={styles.footer}
        >
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome
            name="user-o"
            color="#05375a"
            size={20}
            />
            <TextInput
            placeholder="Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val)=>textInputChange(val)}
            />
            {data.check_textInputChange ? 
            <Animatable.View
            animation="bounceIn"
            >
            <Feather

            name="check-circle"
            color={theme.colors.blue}
            size={20}
            />
            </Animatable.View>
          : null }


          </View>
          <Text style={[styles.text_footer,{marginTop:35}]}>Password</Text>
          <View style={styles.action}>
            <Feather
            name="lock"
            color="#05375a"
            size={20}
            />
            <TextInput
            // secureTextEntry={true}
            secureTextEntry={data.secureTextEntry}
            placeholder="Your Password"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val)=>handlePasswordChange(val)}
            />
            <TouchableOpacity
            onPress={()=>updateSecureTextEntry()}
            >
              {data.secureTextEntry ? 
            <Feather
            name="eye-off"
            color="grey"
            size={20}
            />
            : 
            <Feather
            name="eye"
            color="grey"
            size={20}
            />
          }
            </TouchableOpacity>

          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={()=>onPressButton()} style={styles.signIn}>
            <LinearGradient
            colors={[theme.colors.blue,theme.colors.blue]}
            style={styles.signIn}
            
            >
              <Text style={[styles.textSign,{color:'#FFF'}]}>Sign In </Text>

            </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>navigation.navigate('RegisterScreen')}
            style={[styles.signIn,{
              borderColor:theme.colors.blue,
              borderWidth:1,
              marginTop:15
            }]}
            >
              <Text style={[styles.textSign,{color:theme.colors.blue}]}> Sign Up</Text>
            </TouchableOpacity>

           </View>
           </Animatable.View>
        
      </View>
    );
  }
  
  export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: theme.colors.blue
  },
  header: {
      // flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
  },
  text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30
  },
  text_footer: {
      color: '#05375a',
      fontSize: 18
  },
  action: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5
  },
  actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5
  },
  textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
  },
  errorMsg: {
      color: '#FF0000',
      fontSize: 14,
  },
  button: {
      alignItems: 'center',
      marginTop: 50
  },
  signIn: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  }
});
