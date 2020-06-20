import React from "react";
import { View, Dimensions, Text, Image,AsyncStorage } from "react-native";
import firebase from 'react-native-firebase'


import theme from '../utils/theme';
class Splash1 extends React.Component {
  constructor(props) {
    super(props);
   
  }


   renderUseEffect = async() => {

          
        
  }

  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 3000)
    );
  };
  async componentDidMount() {
 const data = await this.performTimeConsumingTask();
 console.log("splash called")
  
 const setUser = await AsyncStorage.getItem('setUser');
     console.log("set user is :",setUser)
     if (setUser=='true'){
        // confirebase.auth().onAuthStateChanged(function(user) {
            const user = firebase.auth().currentUser;
            const uid = firebase.auth().currentUser.uid;
            console.log("Loggedin User: ",user)
            if (user) {
             
                firebase.database().ref(`users/${uid}/Status`).set({
                    Status:true
                  })
                 this.props.navigation.navigate('Main')
             
                    console.log("loggen in: ",user)
            } else {   
               
              console.log("logged out")
            }
        
     }
     else{
       console.log("User not found")
            this.props.navigation.navigate('Auth')
     }
  
  }

  render() {
    console.log("splash called")
    return (
    <View style={styles.container}>
            <Image style={styles.imageStyle} source={theme.images.mainLogo} resizeMode="contain" />
    </View>
      




    );
  }
}
// const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const styles = {
    imageStyle:{
        // marginTop:'30%',
        height:'50%',
        width:'85%',
        // alignSelf:'center'
        // backgroundColor:'pink'
    },
    container:{
        flex:1,
        // height:400,
        // width:400,
        // alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        // alignContent:"center"
        // padding:10
    }
};
 export default Splash1;
