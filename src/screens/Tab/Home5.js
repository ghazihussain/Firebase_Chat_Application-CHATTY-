import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,StatusBar
} from 'react-native';
import firebase from 'react-native-firebase'
import theme from '../../utils/theme';
import LinearGradient from 'react-native-linear-gradient'

var dataArray=[]


export default class Home5 extends Component {

    constructor(props){
        super(props);
        this.state={
            url:"",name:"",lastname:"",age:null,birthdate:null,skill:"",gender:null,email:""
        }
        }

    takedata(){
        var uid=firebase.auth().currentUser.uid
        //  console.log(uid)
        firebase.database().ref(`users/${uid}`).on("value",(snapshot)=>
        {
           
            this.setState({
                name:snapshot.val().name,
                lastname:snapshot.val().lastName,
                url:snapshot.val().image_url,
                birthday:snapshot.val().birthdayDate,
                skill:snapshot.val().skill,
                gender:snapshot.val().gender,
                email:snapshot.val().email,

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
                  <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Image style={styles.avatar}
                          source={{uri: this.state.url}}/>
        
                        <Text style={styles.name}>
                          {this.state.name } {this.state.lastname}
                        </Text>
                    </View>
                  </View>
        
                  <View style={styles.body}>
                    <View style={styles.bodyContent}>
                      <Text style={styles.textInfo}>
                      Email:{this.state.email}
                      </Text>
                    
                  
                      <Text style={styles.textInfo}>
                        BirthDay:{this.state.birthday}
                      </Text>
                    
                      <Text style={styles.textInfo}>
                       Skill:{this.state.skill}
                      </Text>
                     
                    </View>
                    
                    <TouchableOpacity style={{marginTop:"30%",width:"80%",alignSelf:"center",height:50}}>
                            <LinearGradient
                    colors={[theme.colors.blue,"#01168a"]}
                    style={styles.signIn}
                    
                    >
                    <Text style={[{alignSelf:"center"},{color:'#FFF'}]}>NEXT</Text>

                    </LinearGradient>
            </TouchableOpacity>
           
                    
                </View>
                
              </View>
            );
          }
        }

        const styles = StyleSheet.create({
            header:{
              backgroundColor: "#1E90FF",
            },
            headerContent:{
              padding:30,
              alignItems: 'center',
            },
            avatar: {
              width: 130,
              height: 130,
              borderRadius: 63,
              borderWidth: 4,
              borderColor: "white",
              marginBottom:10,
            },
            name:{
              fontSize:22,
              color:"#FFFFFF",
              fontWeight:'600',
            },
            bodyContent: {
              flex: 1,
              alignItems: 'center',
              padding:30,
            },
            signIn: {
                width: '100%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10
            },
            textInfo:{
              fontSize:18,
              marginTop:20,
              color: "black",
              fontWeight:"bold"
            }
          });
           
 