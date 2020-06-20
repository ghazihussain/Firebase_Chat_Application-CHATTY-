import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,StatusBar,AsyncStorage
} from 'react-native';
import { Icon,Item, Row } from 'native-base';
import theme from '../../utils/theme';
import firebase from 'react-native-firebase'
import { TapGestureHandler } from 'react-native-gesture-handler';




const windowWidth = Dimensions.get('window').width;
var dataArray=[]
// asdaas
// dsaa


// asada
var url=null
export default class Home5 extends Component {

    constructor(props){
        super(props);
        this.state={
            url:null,name:"",lastname:"",age:null,birthdate:null,skill:"",gender:null,email:"",city:""
        }
        }

    takedata(){
        var uid=firebase.auth().currentUser.uid
        //  console.log(uid)
        
        firebase.database().ref(`users/${uid}`).on("value",(snapshot)=>
        {
           console.log(snapshot.val().birthdayDate)
           url=snapshot.val().image_url
           console.log(url)
            this.setState({
                name:snapshot.val().name,
                lastname:snapshot.val().lastName,
                url:snapshot.val().image_url,
                birthday:snapshot.val().birthdayDate,
                skill:snapshot.val().skill,
                gender:snapshot.val().gender,
                email:snapshot.val().email,
                city:snapshot.val().city,

            },
            console.log(this.state.name)
            )
       
        })
      
        
      
        
     
        }
        componentDidMount(){
                this.takedata()
        }

        render() {
          
            return (
              <View style={styles.container}>
              <StatusBar backgroundColor={'#011935'} barStyle="dark-content" hidden={false} networkActivityIndicatorVisible={false}/>
              <View style={styles.header}>
              {/* <Image style={{height:200,width:"100%"}} source={require('../../assets/cover.png')}/> */}
              <StatusBar backgroundColor={'#011935'} barStyle="dark-content" hidden={false} networkActivityIndicatorVisible={false}/>
              </View>
              <Image
        style={styles.avatar}
        source={{
          uri: url,
        }}
      />
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Settings')} style={styles.buttonContainer}>
               <Icon name={"user-plus"} type={"FontAwesome5"} style={{color:theme.colors.blue,fontWeight:"bold",fontSize:19,marginRight:10,marginTop:2,transform: [{rotateY: '180deg'}]}}/>   
              <Text style={{fontWeight:"bold",color:theme.colors.blue}} >Edit Profile</Text>
              </TouchableOpacity>
              <View style={styles.body}>
                <View style={styles.bodyContent}>
                <Text style={styles.name}>{this.state.name} {this.state.lastname}</Text>
                  <View style={{alignSelf:"flex-start",flexDirection:"row",}}>
                  <Text style={styles.cati}>{this.state.city}</Text>
                  
                  </View>
                  {/* <View></View> */}
                <Item style={{width:windowWidth-80,height:50,borderBottomWidth:1,flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={{color:"black",fontSize:17,fontWeight:"400"}}>Email</Text>
                <Text style={{color:"black",fontSize:17,fontWeight:"400"}} >{this.state.email}</Text>
              </Item>
              <Item style={{width:windowWidth-80,height:50,borderBottomWidth:1,flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={{color:"black",fontSize:17,fontWeight:"400"}}>Date Of Birth</Text>
                <Text style={{color:"black",fontSize:17,fontWeight:"400"}} >{this.state.birthday}</Text>
              </Item>
              <Item style={{width:windowWidth-80,height:50,borderBottomWidth:1,flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={{color:"black",fontSize:17,fontWeight:"400"}}>Skill</Text>
                <Text style={{color:"black",fontSize:17,fontWeight:"400"}} >{this.state.skill}</Text>
              </Item>
              <Item style={{width:windowWidth-80,height:50,borderBottomWidth:1,flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={{color:"black",fontSize:17,fontWeight:"400"}}>Gender</Text>
                <Text style={{color:"black",fontSize:17,fontWeight:"400"}} >{this.state.gender}</Text>
              </Item>
                </View>
                <Item style={{width:windowWidth-80,height:50,borderBottomWidth:0,flexDirection:"row",justifyContent:"space-between",alignSelf:"center"}}>
                  <TouchableOpacity onPress={() => {
                                        firebase
                                            .auth()
                                            .signOut()
                                            .then(async () => {
                                                await AsyncStorage.removeItem('setUser')
                                                console.log("signed out!")
                                                this.props.navigation.navigate('Auth')
                                            });

                                    }} style={{height:40,width:"100%",backgroundColor:theme.colors.blue,borderRadius:5,justifyContent:"center"}}>
                      <Text style={{alignSelf:"center",color:"white",fontWeight:"bold",fontSize:17}}>SIGN OUT</Text>
                  </TouchableOpacity>
                  
                </Item>
                
            </View>
          </View>            );
          }
        }

        const styles = StyleSheet.create({
          container:{
              flex:1,
              backgroundColor:"#FFF"
          },  
          header:{
             backgroundColor: "#011935",
            height:180,
          },
          avatar: {
            width: 130,
            height: 130,
            borderRadius: 20,
            borderWidth: 4,
            borderColor: "white",
            marginBottom:10,
            // alignSelf:'center',
            left:"10%",
            position: 'absolute',
            marginTop:100,
            // backgroundColor:"white"
          },
          name:{
            fontSize:22,
            color:"#FFFFFF",
            fontWeight:'600',
          //  top:200
          },
          body:{
            // marginTop:30,
            flex:1,
          },
          switchButton:{
            backgroundColor:"#FFF",
            width:(windowWidth/3)-50,
            justifyContent:"center",
            alignItems:"center",
            height:40,
            borderRadius:10,
            // padding:10
          },
          bodyContent: {
            flex: 1,
            alignItems: 'center',
            padding:30,
          },
          name:{
            fontSize:20,
            color: "black",
            fontWeight: "600",
            alignSelf:"flex-start",
            marginLeft:"3%",
            bottom:20
            
          },
          buttonContainer: {
            alignSelf:"flex-end",
            marginRight:"4%",
            justifyContent:"center",
            backgroundColor:"#fff",
            alignItems:"center",
            width:"47%",
            marginTop:10,
            height:33,
            flexDirection:"row",
            borderRadius:10,
            shadowOffset: { width: .5, height: .5 },
            shadowOpacity: 0.2,
          },
          cati:{
            fontSize:12,
            color: "#858585",
            fontWeight: "400",
            alignSelf:"flex-start",
            marginLeft:"3%",
            bottom:20
            
          },
          starStyle:{
            // fontSize:12,
            // color: "#858585",
            // fontWeight: "bold",
            alignSelf:"flex-start",
            // marginLeft:"3%",
            bottom:20
            
          },
          info:{
            fontSize:16,
            color: "#00BFFF",
            marginTop:10
          },
          description:{
            fontSize:16,
            color: "#696969",
            marginTop:10,
            textAlign: 'center'
          },
          cardStyle:{
            // borderWidth:1,
            // borderColor:"black",
            backgroundColor: '#FFF',
            justifyContent:"center",
            width: '100%',
            height:150,
            marginVertical: 5,
            
            alignSelf: 'center',
            
            borderRadius: 10,
            shadowOffset: { width: .5, height: .5 },
            shadowOpacity: 0.2,
        
        
            elevation: 5
        },
        imageStyle:{
            // borderRadius: 20, 
            borderTopLeftRadius:10,
            alignItems: 'center',
            justifyContent:"center", 
            // justifyContent: 'center',
             width: '27%',
         marginLeft:5
        },
        textView:{
            // paddingVertical: 20, 
            // paddingHorizontal: 10, 
            // padding:"2%",
           
            marginLeft:"8%",
            marginTop:5,
            alignItems: 'flex-start', 
            width: '80%',
            flexDirection: 'column',
            // height:80
        },
        profileImageStyle:{
            // borderRadius: 40, 
            borderTopLeftRadius:10,
            backgroundColor:"white",
            alignItems: 'center', 
            justifyContent: 'center',
             width: '30%'
        },
        
        });