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

var dataArray=[]


export default class UserProfile extends Component {

    constructor(props){
        super(props);
        
        this.state={
            item: this.props.navigation.state.params.itemData,
            // url:"",name:"",lastname:"",age:null,birthdate:null,skill:"",gender:null,email:""
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
                image_url:snapshot.val().image_url,
                birthday:snapshot.val().birthdayDate,
                skill:snapshot.val().skill,
                gender:snapshot.val().gender,
                email:snapshot.val().email,

            },
            console.log(this.state.item.lastName),
           
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
                          source={{uri: this.state.item.image_url}}/>
        
                        <Text style={styles.name}>
                          {this.state.item.name } {this.state.item.lastName}
                        </Text>
                    </View>
                  </View>
        
                  <View style={styles.body}>
                    <View style={styles.bodyContent}>
                      <Text style={styles.textInfo}>
                      Email:{this.state.item.email}
                      </Text>
                    
                  
                      <Text style={styles.textInfo}>
                        BirthDay:{this.state.item.birthdayDate}
                      </Text>
                    
                      <Text style={styles.textInfo}>
                       Skill:{this.state.item.skill}
                      </Text>
                    </View>
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
            textInfo:{
              fontSize:18,
              marginTop:20,
              color: "black",
              fontWeight:"bold"
            }
          });
           
 