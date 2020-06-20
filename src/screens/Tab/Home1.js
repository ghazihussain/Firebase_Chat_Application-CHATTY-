
import React, { Component } from 'react';
import {Text,View,TouchableOpacity,StatusBar, Alert,StyleSheet,Image} from 'react-native';
import {Button,Item,Icon,Input} from 'native-base'
import theme from '../../utils/theme';
import firebase from 'react-native-firebase'
import { FlatList } from 'react-native-gesture-handler';

console.disableYellowBox = true;
var data_array=[];
 var data_array2=[];
var List=[]
export default class Profiles extends Component{
constructor(props){
super(props);
this.state={
data:[],
loading:true,
search:null
}
}

componentDidMount(){

var usid = firebase.auth().currentUser.uid;

const ref = firebase.database().ref(`users/${usid}/Status`);
ref.onDisconnect().set({ Status: false });

this.takedata();
}

takedata(){
   var uid=firebase.auth().currentUser.email
   //  console.log(uid)
   var db=firebase.database().ref('users/').on("value",(snapshot)=>
   {snapshot.forEach(data=>{
   //  console.log(uid)
   if(data.val().email!==uid)
   data_array.push(data.val())
     console.log("data",data_array)
   });
   this.setState({data:data_array},()=>{
   this.setState({loading:false})
   })
   console.log("a",data_array)
   data_array2=data_array
   data_array=[]
   console.log("av",data_array2)
   })
   
 
   

   }
onFriendChat(item){
this.props.navigation.navigate('Chat',{itemData:item})
}
onUserPress(item){
  this.props.navigation.navigate('UserProfile',{itemData:item})
  }
updateSearch = (search) => {
  this.setState({ search: search })
   List = data_array2.filter((item) => {
    return String(item.name.toLowerCase()).includes(search.toLowerCase())
  }
  )
  this.setState({
    data: List
  })

}
render(){
return(
<View style={{flex:1}}>
   <View style={{width:'100%'}}>
   <StatusBar backgroundColor={'#FFF'} barStyle="dark-content" hidden={false} networkActivityIndicatorVisible={false} />

   <Item style={styles.inputStyle}>
            <Icon name={'ios-search'} type='Ionicons' style={{ color: '#6A9993', marginHorizontal: 10 }} />
            <Input
              style={{ fontSize: 16 }}
              placeholderTextColor='#6A9993'
              placeholder="Search"
              autoCapitalize="none"
              autoCorrect={false}
              // ref={ref => (this.erEmail = ref)}
              // value={this.state.Search}
              // onEndEditing={
              //     this.props.searchFellows(this.state.SearchTerm)
              // }

              value={this.state.List}
              onChangeText={(value) => this.updateSearch(value)}
            ></Input>
          </Item>
      <FlatList
         style={{margin:10,alignContent:"center"}}
         data={this.state.data}
         extraData={this.state}
         renderItem={({item,index})=>
      {
      return(
        <View >
        <TouchableOpacity  onPress={() => this.onUserPress(item)}>
          <View style={styles.box}>
            {/* <Image style={styles.icon} source={{uri: 'https://png.icons8.com/ok/color/20/ffffff'}}/> */}
            <Image style={styles.image} source={{uri: item.image_url}} />
            <View style={styles.boxContent}>
              <Text style={styles.title}>{`${item.name} ${item.lastName}`}</Text>
              <Text style={styles.description}>{item.gender}</Text>
            </View>
            <TouchableOpacity onPress={() => this.onFriendChat(item)} style={{justifyContent:"center"}}>
                            <Icon name={'message1'}  type={'AntDesign'} style={{ color: theme.colors.blue,fontSize:28,fontWeight:"bold" }}/>
                        </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
   );
   }}
   keyExtractor={(item,index)=>{index.toString()}}
   />
</View>
</View>
);
}
} ;

const styles = StyleSheet.create({
  image: {
    width: 70,
    height:70,
    borderRadius:40
  },
  icon:{
    width:20,
    height:20,
    alignSelf:'center',
    marginRight:10
  },
  box: {
   margin:10,
    padding:10,
    marginTop:5,
    borderRadius:10,
    marginBottom:5,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxContent: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft:10,
  },
  description:{
    fontSize:15,
    color: "#646464",
  },
  title:{
    fontSize:18,
    color:"#151515",
    fontWeight:"bold"
  },
  inputStyle: {
    alignSelf: "center",
    width: '95%',
    borderRadius: 5,
    alignSelf: "center",
    backgroundColor: '#E7EFEE',
    marginVertical: 5,
    marginTop: 10
  },
  
});