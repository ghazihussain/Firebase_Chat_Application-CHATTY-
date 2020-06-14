import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import theme from '../theme/theme';
import { Icon, Input, Item } from 'native-base';

const Header = (props) => {
    const [term, setTerm] = useState('')
    return (
        <View style={styles.container}>
            
            <Item rounded style={styles.inputStyle}>
              
                <Input
                    style={{ fontSize: 16,paddingLeft:20,borderBottomWidth:0, }}
                    placeholderTextColor='white'
                    placeholder="Search..."
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={term}
                    onChangeText={x =>setTerm(x)}
                >
                </Input>
                <Icon name={'ios-search'} type='Ionicons' style={{ color: 'white', marginHorizontal: 10 }} />
            </Item>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.purple,
        height: 80,
        justifyContent:'center'
    },
    inputStyle: {
        alignSelf: "center",
        width: '70%',
        backgroundColor: '#891989',
        height:35, 
        justifyContent:'center',
        color:'white',
        borderColor:theme.colors.purple

    },


})
export default Header