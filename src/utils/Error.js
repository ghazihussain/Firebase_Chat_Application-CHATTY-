import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Error = ({error}) => {
    
    return(
        <View>
            <Text style={{alignSelf:"center", color:'red'}}> {error} </Text>
        </View>
    )
}
const style=StyleSheet.create({

})
export default Error;