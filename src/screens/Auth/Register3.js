import React,{useState} from 'react';
import {View,Text, Button,StyleSheet,TouchableOpacity,Dimensions,TextInput,Platform, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Value } from 'react-native-reanimated';
import theme from '../../utils/theme';
import firebase from 'react-native-firebase'
import { ScrollView } from 'react-native-gesture-handler';

FontAwesome.loadFont();
Feather.loadFont();


const Register3 = ({ navigation }) => {


  const onPressButton=()=>{
   firebase.auth()
  .createUserWithEmailAndPassword(data.email, data.password)
  .then(() => {
    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).set({
      email:data.email
    })
    navigation.navigate("LoginScreen")

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

  const [data,setData] = useState({
    email: '',
    password: '',
    confirmPassword:'',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  })
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
  const handleConfirmPassChange=(val)=>{
    setData({
      ...data,
      confirmPassword: val,
    })
  }
  const updateSecureTextEntry= () => {
    setData({
      ...data,
      secureTextEntry:!data.secureTextEntry
    })
  }
  const updateConfirmSecureTextEntry= () => {
    setData({
      ...data,
      confirm_secureTextEntry:!data.confirm_secureTextEntry
    })
  }
    return (
        
      <View style={styles.container}>
        {/* <ScrollView > */}
        <StatusBar backgroundColor={theme.colors.blue} barStyle="light-content"/>
        <View style={styles.header}>
          <Text style={styles.text_header}>Register Now!</Text>

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
            color="green"
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

          <Text style={[styles.text_footer,{marginTop:35}]}>Confirm Password</Text>
          <View style={styles.action}>
            <Feather
            name="lock"
            color="#05375a"
            size={20}
            />
            <TextInput
            // secureTextEntry={true}
            secureTextEntry={data.confirm_secureTextEntry}
            placeholder="Confirm Your Password"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val)=>handleConfirmPassChange(val)}
            />
            <TouchableOpacity
            onPress={()=>updateConfirmSecureTextEntry()}
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
          

          <TouchableOpacity onPress={()=>onPressButton()} style={styles.button}>
            <LinearGradient
            colors={[theme.colors.blue,theme.colors.blue]}
            style={styles.signIn}
            
            >
              <Text style={[styles.textSign,{color:'#FFF'}]}>Sign Up </Text>

            </LinearGradient>

            <TouchableOpacity
            onPress={()=>navigation.goBack()}
            style={[styles.signIn,{
              borderColor:'#009387',
              borderWidth:1,
              marginTop:15
            }]}
            >
              <Text style={[styles.textSign,{color:'#009387'}]}> Sign In</Text>
            </TouchableOpacity>

           </TouchableOpacity>
           
           </Animatable.View>
           {/* </ScrollView>   */}
      </View>
    );
  }
  
  export default Register3;

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
      backgroundColor: 'black',
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
      // marginTop: ,
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