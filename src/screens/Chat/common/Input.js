
import React from 'react';
import {TextInput,View,Text,Image} from 'react-native';
//import { Icon } from 'native-base';
import  Icon  from 'react-native-vector-icons/FontAwesome';


const Input=({label,value,onChangeText,placeholder,secureTextEntry,name,color,icon,size,maxLength,autoCapitalize})=>
{
    
    
    return(
        
        <View style={Styles.ViewStyle}>
         
         <Icon name={name} color={color} size={size} style={Styles.LabelView}>{icon}</Icon>
        <TextInput
          style={Styles.inputStyle}
          placeholder={placeholder}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          //multiline={true}
          
         
         ></TextInput>
         
        
        
        </View>
    );
}
const Styles={
 inputStyle:
{
    
    width:500,
    flex:1,
    fontSize:18,
    color:'#29cf23',
    

},
LabelView:
{
    //height:50,
    width:50,
    
    fontFamily:'bold',
    
    lineHeight:45,
    marginLeft:25

    

},
iconView:
{
    fontSize:20,
    

},
ViewStyle:
{
    flexDirection:'row',
    alignItems:'center',
    borderColor:'#15b50c',
    borderWidth:.5,
    borderRadius:20,
    marginTop:5,
    
}



};

export {Input}; 

