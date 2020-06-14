import React from 'react';
import {TextInput,View,Text,Image,Keyboard} from 'react-native';
//import { Icon } from 'native-base';
import  Icon  from 'react-native-vector-icons/FontAwesome';


const ChatInput=({label,value,onChangeText,placeholder,secureTextEntry,name,color,icon,size,maxLength,autoCapitalize})=>
{
    
    
    return(
        
        <View style={Styles.ViewStyle}>
         
        
        <TextInput
          style={Styles.inputStyle}
          placeholder={placeholder}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          multiline = {true}
          secureTextEntry={secureTextEntry}
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          editable={true}
          returnKeyType='done'
          onSubmitEditing={Keyboard.dismiss}
          
         
         ></TextInput>
          
         
        
        
        </View>
    )
}
const Styles={
 inputStyle:
{
    
    
    height:'80%',
    marginLeft:0,
    fontSize:18,
    color:'#29cf23',
    
    

},
LabelView:
{
    height:"100%",
    width:50,
    fontFamily:'bold',
    lineHeight:45,
    

    

},
iconView:
{
    fontSize:20,
    

},
ViewStyle:
{
    flexDirection:'row',
    alignItems:'flex-start',
    borderColor:'#15b50c',
    marginLeft:5,
    marginRight:5,
    marginBottom:2,
    borderWidth:.5,
    marginTop:5,
    borderRadius:10,
    width:"80%",
   
    
    

}



};
export {ChatInput}; 


