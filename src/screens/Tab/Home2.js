import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StatusBar, FlatList, Image, StyleSheet, TouchableHighlight, SafeAreaView, Alert } from 'react-native';
import firebase from 'react-native-firebase'
import relativeTime from 'dayjs/plugin/relativeTime';
import { Icon, Input, Item } from 'native-base';
import theme from '../../utils/theme';
import dayjs from 'dayjs';

import {Spinner} from '../../utils/Spinner'
import {Gravatar, GravatarApi} from 'react-native-gravatar';


var count = 0;
var username = '';
var profile_url = '';
conversationId = [];
var copyList = [];
var copyData = [];
var copyList2 = [];
var copyData2 = [];
var online = ''

export default class ChatInbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [], accepted: '', count: 0,
            user: [], username: '', read: [], conversationId: [], List: [], search: '', data2: [],
            loading: true

        }

    }
    conversationId = (a, b) => {
        if (a > b) {
            return (a + b);

        }
        else {
            return (b + a);
        }
    }
    renderLastMessage(item){
        var uid =firebase.auth().currentUser.uid
        if(item.Reciever===uid)
        return(
            <Text  numberOfLines={1} style={{color: '#808080',width:"40%" }}>{item.lastMessage}</Text>
        )
        else
        return(
            <Text  numberOfLines={1} style={{ color: '#808080',width:"40%" }}>{item.lastMessage}</Text>
        )
    }
    takeUsersData() {
        var user = [];
        var db = firebase.database().ref(`users/`).on("value", (snapshot) => {
            snapshot.forEach(data => {
                user.push(data.val())
                copyList = user
                copyList2 = user


            });
            this.setState({ user: user }, () => {


                user = [];



            })
        })



    }
    renderName(item) {
        uid = firebase.auth().currentUser.uid;
        if (item.Reciever === uid) {
            return (
                <Text>{item.sender_username}</Text>
            );
        }
        else {
            return (
                <Text>{item.Reciever_username}</Text>
            );
        }
    }
    takeCount() {
        var uid = firebase.auth().currentUser.uid

        var db = firebase.database().ref(`messages/`).on("value", (snapshot) => {
            snapshot.forEach(data => {
                if (data.val().conversationUid.conversationUid != undefined) {
                    firebase.database().ref(`messages/${data.val().conversationUid.conversationUid}/messages/`).on("value", (snap) => {
                        snap.forEach(data => {
                            
                            if (data.val().Reciever === uid && data.val().read === false) {
                                count = count + 1
                               
                            }

                            this.setState({
                                loading: false,
                                count: count
                            }, () => {
                              
                            })
                        })


                    })
                    count = 0;
                }


            });



        })

    }

    async takeData() {
        var senderUid = '';
        var inbox_array = [];
        var uid = firebase.auth().currentUser.uid

        var db = firebase.database().ref(`messages/`)

        db.on("value", async (snap) => {

            await snap.forEach(data => {

                if (data.val().lastMessage.senderuid !== undefined && data.val().lastMessage.Reciever !== undefined
                    && (data.val().lastMessage.sender_username!==undefined && data.val().lastMessage.Reciever_username!==undefined))
                {

                    if (data.val().lastMessage.senderuid === uid) {
                        inbox_array.push(data.val().lastMessage)
                    }
                    else {
                        if (data.val().lastMessage.Reciever === uid) {
                            inbox_array.push(data.val().lastMessage)


                        }

                    }
                }


            });
            var usersarray = inbox_array.sort(function (a, b) { return b.timestamp - a.timestamp });
            this.setState({ data: usersarray, loading: false }, () => {
                copyData = usersarray;
                copyData2 = usersarray;
                inbox_array = [];



            })






        })

    }


    componentDidMount() {
        this.takeData();
        // this.takeCount()
        // this.takeUsersData()


    }
    renderOnlineStatus(item) {
        var uid = firebase.auth().currentUser.uid
        this.state.user.map((users) => {


            if (users.user_id === item.Reciever && uid !== item.Reciever) {




                if (users.Status.Status === false) {
                    online = 'offline'

                }
                else {
                    online = 'online'

                }

            }
            else if (users.user_id === item.senderuid && uid !== item.senderuid) {




                if (users.Status.Status === false) {
                    online = 'offline'

                }
                else {
                    online = 'online'

                }

            }
        })
    }
    renderTime(item) {
        dayjs.extend(relativeTime)
        let now = item.time;
        return (
            <Text> {dayjs(item.time).fromNow()} </Text>
        )



    }

    onPressInbox = (item) => {
        this.props.navigation.push('Chat', { itemData: item, user: this.state.user })
    }
    renderUnReadMsg() {


        if (this.state.count !== 0) {
            console.log(this.state.count)
            return (
                <Text>
                    You have {this.state.count} new message
                </Text>
            );
        }


    }
    renderImage(item) {

        { this.renderOnlineStatus(item) }

        if (online === 'online' || item.Status === true) {
            return (
                this.renderProfileImage(item)
            );
        }
        else {
            { this.renderOnlineStatus(item) }
            uid = firebase.auth().currentUser.uid;
           if(item.Reciever_ProfileImage===undefined||item.sender_ProfileImage===undefined){
               return(
                <Gravatar options={{
                    email: 'example@gmail.com',
                    parameters: { "size": "200", "d": "mm" },
                    secure: true
                        }}
                        style={{ height: 55, width: 55, borderRadius: 55}}    
                       
    
                />
               )
           }
            if (item.Reciever === uid) {
                return (

                    <View style={styles.profileImageStyle}>
                        <Image
                            resizeMode="cover"
                            style={{ height: 55, width: 55, borderRadius: 55}}
                            source={
                                item.image_url === undefined ? { uri: item.sender_ProfileImage } : { uri: item.image_url }

                            } />

                    </View>

                );
            }
            else {
                return (
                    <View style={styles.profileImageStyle}>
                        <Image
                            resizeMode="cover"
                            style={{ height: 55, width: 55, borderRadius: 55}}
                            source={
                                item.image_url === undefined ? { uri: item.Reciever_ProfileImage } : { uri: item.image_url }

                            } />

                    </View>
                );
            }
        }
    }
    renderProfileImage(item) {
        uid = firebase.auth().currentUser.uid;
        if(item.sender_ProfileImage ===undefined ||item.Reciever_ProfileImage===undefined){
            return(
                <View style={styles.profileImageStyle}>
            <Gravatar options={{
                email: 'example@gmail.com',
                parameters: { "size": "200", "d": "mm" },
                secure: true
                    }}
                    style={{ height: 55, width: 55, borderRadius: 55}}    
                   

            />
             <View
                         style={styles.gravatarStyle}
                    />
                </View>);
            
        }
        if (item.Reciever === uid) {
            return (
                <View style={styles.profileImageStyle}>
                    <Image
                        resizeMode="cover"
                        style={{ height: 55, width: 55, borderRadius: 55, }}
                        source={{ uri: item.sender_ProfileImage }} />
                    <View
                        style={styles.gravatarStyle}
                    />
                </View>

            );
        }
        else {
            return (
                <View style={styles.profileImageStyle}>
                    <Image
                        resizeMode="cover"
                        style={{ height: 55, width: 55, borderRadius: 55, }}
                        source={{ uri: item.Reciever_ProfileImage }} />
                    <View
                        style={styles.gravatarStyle}
                    />
                </View>
            );
        }

    }
    updateSearch = (search) => {

        if (search === '') {

            this.setState({ data: copyData2 })

        }
        else {
            this.setState({ search: search })

            let List = copyData.filter((item) => {
                if (String(item.Reciever_username.toLowerCase()).includes(search.toLowerCase())) {
                    return String(item)

                }
                else if (String(item.sender_username.toLowerCase()).includes(search.toLowerCase())) {
                    return String(item)
                }


            })
            this.setState({
                data: List
            })

        }
    }



    render() {
        if (this.state.loading === true) {

            return (
                <View style={styles.spinnerView}>
                    <Spinner visible={this.state.loading} />
                </View>

            );
        }
        else {

            return (

                <SafeAreaView style={{ flex: 1,backgroundColor:theme.colors.blue }}>
                   
                    <StatusBar backgroundColor={theme.colors.blue} barStyle="light-content" hidden={false} networkActivityIndicatorVisible={true} />
                    

                    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                        <View style={styles.container}>

                            <View 
                            style={{position:'absolute',marginLeft:"5%",
                           
                            }}
                            >
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home1')}>
                                
                                        <Icon type={"Ionicons"} name="ios-arrow-back"
                                            style={{ color: 'white', fontSize: 25,}} />
                                
                                    </TouchableOpacity>
                                </View>
                            <Item rounded style={styles.inputStyle}>

                                <Input
                                    style={{ 
                                        fontSize: 16, paddingLeft: 20, borderBottomWidth: 0, color: '#FFF'
                                     }}
                                    placeholderTextColor='white'
                                    placeholder="Search..."
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.List}
                                    onChangeText={(value) => this.updateSearch(value)}
                                >
                                </Input>
                                <Icon name={'ios-search'} type='Ionicons' style={{ color: 'white', marginHorizontal: 10 }} />
                            </Item>
                        </View>
                        <View>
                            <Text style={{ marginTop: 10, marginLeft: 8, fontSize: 25, fontWeight: '500' }}>Messages</Text>
                           
                        </View>

                        <FlatList
                            style={{ flex: 1, marginTop: 20, }}
                            data={this.state.data}

                            extraData={this.state}

                            renderItem={({ item, index }) => {
                                return (


                                    <TouchableHighlight underlayColor={theme.colors.blue}


                                        onPress={() => {
                                            this.props.navigation.navigate('Chat', { itemData: item, username: username })
                                        }}
                                    >

                                        <View style={styles.cardStyle }>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={styles.imageStyle}>
                                                    {this.renderImage(item)}
                                                 </View>
                                                <View style={styles.textView}>

                                                    <Text style={{ fontSize: 16, fontWeight: '400' }}>{this.renderName(item)}</Text>

                                                    {this.renderLastMessage(item)}
                                                </View>
                                                <View style={styles.timeView}>
                                                    <Text style={{ color: "#808080", fontSize: 12 }}>{this.renderTime(item)}</Text>
                                                </View>
                                            </View>


                                        </View>
                                    </TouchableHighlight>

                                )
                            }}
                            keyExtractor={(item, index) => { index.toString() }}
                        // ListHeaderComponent={this.renderHeader}
                        />
                    </View>
                </SafeAreaView>

            )
        }
    };
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.blue,
        height: 80,
        justifyContent: 'center'
    },
    inputStyle: {
        alignSelf: "center",
        width: '70%',
        backgroundColor: '#891989',
        height: 35,
        justifyContent: 'center',
        color: 'white',
        borderColor: "#FFF",
         backgroundColor:theme.colors.blue

    },
    cardStyle:{

        backgroundColor: '#FFF',

        width: '95%',
        marginVertical: 5,
        alignSelf: 'center',
        borderRadius: 10,
        shadowOffset: { width: .5, height: .5 },
        shadowOpacity: 0.2,


        elevation: 5
    },
    imageStyle:{
        borderRadius: 40, 
        alignItems: 'center', 
        justifyContent: 'center',
         width: '20%'
    },
    textView:{
        paddingVertical: 20, 
        paddingHorizontal: 10, 
        alignItems: 'flex-start', 
        width: '45%',
        flexDirection: 'column',
        height:80
    },
    timeView:{
        backgroundColor: '#FFF', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#808080',
        width:'33%'
    },
    gravatarStyle:{
        borderColor: 'white',
         borderWidth: 2.5, 
         borderRadius: 50, 
         height: 17, 
         width: 17, 
         backgroundColor: '#90EE90',
          position: "absolute", 
          top: 40, 
          right: -25
    },
    spinnerView:{
        flex: 1,
         backgroundColor: '#D3D3D3', 
         justifyContent: 'center', 
         alignItems: 'center', 
         opacity: 20
    },
    profileImageStyle:{
        borderRadius: 40, 
        alignItems: 'center', 
        justifyContent: 'center',
         width: '20%'
    }


    


})