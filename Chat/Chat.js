import dayjs from 'dayjs';
import { now } from 'moment';
import { Icon } from 'native-base';
import React, { Component } from 'react';
import { Alert, Dimensions, FlatList, Image, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import firebase from 'react-native-firebase';
//import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { Gravatar } from 'react-native-gravatar';
import ImagePicker from 'react-native-image-picker';
import theme from '../../theme/theme';
import MessageBox from './common/Message';

const { height, width } = Dimensions.get('window');
var sender_username = '';
var Reciever_username = '';
var msg_array = [];
var msgId = ''
var username = ''
var profile_name = ''
var online = ''
var downloadURLGlobal = ''
var onlineStatus = '';
var Reciever_ProfileImage = '';
var sender_ProfileImage = '';
var sourcePath = ''


var copyMessageList = []

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.navigation.state.params.itemData,
            username: this.props.navigation.state.params.username,
            text: "", Reciever: "", sender: "", time: "", messages: [], loading: false,
            time: '', name: '', users: '', accepted: '', msgId: '', user: [], imageUri: null,
            url: '', progress: 0, loading: false, refresh: false, onlineStatus: 'green', online: '',
            sender_ProfileImage: '', Reciever_ProfileImage: '', fcmTokem: '', search: '', List: [],
            notification:null
        }

    }

    openImage = () => {
        const options = {
            title: 'Choose photos',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            maxWidth: 500,
            maxHeight: 500,
            quality: 1
        };
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');

            } else if (response.error) {

            } else if (response.customButton) {

            } else {

                if (Platform.OS === 'ios') {
                    sourcePath = { uri: response.uri };
                }

                else {
                    sourcePath = { uri: response.path };

                }

                this.setState({
                    profile: sourcePath.uri,
                    imageUri: sourcePath.uri
                }, () => {

                    this.uploadImage()
                });


            }
        });

    }

    uploadImage() {

        var timestamp = new Date().getTime().toString();

        var uid = firebase.auth().currentUser.uid
        if (this.state.item.Reciever === uid) {
            var secuser = this.state.item.senderuid;
        }
        else {
            var secuser = this.state.item.Reciever;
        }
        this.state.user.map((users) => {
            if (users.user_id === secuser) {
                Reciever_username = users.name
                Reciever_ProfileImage = users.image_url
            }
            if (users.user_id === uid) {
                sender_username = users.name
                sender_ProfileImage = users.image_url
            }
        })

        var today = new Date();
        var time = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        var hour = time.getHours();
        var minutes = time.getMinutes();
        var ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12;
        if (minutes.toString().length == 1) {
            minutes = "0" + minutes;
        }
        if (hour.toString().length == 1) {
            hour = "0" + hour;
        }

        time = hour + ':' + minutes + " " + ampm;

        var dbref = firebase.database().ref(`messages/`);
        var key = dbref.push().key;
        var convId = this.conversationId(uid, secuser)

        console.log("upload file called")
        console.log('s', this.state.imageUri)
        var metadata = {
            contentType: 'image/jpeg',
        };

        var fileRef = firebase.storage().ref(`images/`).child(timestamp);

        uploadTask = fileRef.putFile(this.state.imageUri, metadata)
        if (uploadTask === undefined || uploadTask === '') {
            Alert.alert('Unable to  upload')
        }
        uploadTask.on('state_changed', snap => {
            const percentUploaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
            console.log("Percentage", percentUploaded)
            this.setState({ percentUploaded }, () => {
                if (this.state.percentUploaded === 100) {
                    this.setState({ loading: true })
                }
            })

        },
            () => {
                //unsuccessful Upload
            },
            () => {
                var fileR = firebase.storage().ref(`images/`).child(timestamp);
                // Upload completed successfully, now we can get the download URL
                fileR.getDownloadURL().then((downloadURL) => {

                    downloadURLGlobal = downloadURL
                    firebase.database()
                        .ref(`messages/${convId}/conversationUid`)
                        .set({
                            conversationUid: convId

                        })
                    firebase.database()
                        .ref(`messages/${convId}/messages`).child(key)
                        .set({
                            text: 'image',
                            Reciever: secuser,
                            senderuid: uid,
                            timestamp: firebase.database.ServerValue.TIMESTAMP,
                            time: time,
                            Date: today,
                            read: false,
                            msgId: key,
                            url: downloadURLGlobal

                        })
                    firebase.database()
                        .ref(`messages/${convId}/lastMessage`)
                        .set({
                            lastMessage: 'image',
                            name: '',
                            Reciever: secuser,
                            senderuid: uid,
                            timestamp: firebase.database.ServerValue.TIMESTAMP,
                            time: new Date().toISOString(),
                            read: false,
                            msgId: key,
                            url: downloadURLGlobal,
                            Reciever_username: Reciever_username,
                            sender_username: sender_username,
                            sender_ProfileImage: sender_ProfileImage,
                            Reciever_ProfileImage: Reciever_ProfileImage

                        })
                });

            }


        );
        this.sendPush(sender_username);


    };





    takeUsersData() {
        var user = [];


        var db = firebase.database().ref(`users/`).on("value", (snapshot) => {
            snapshot.forEach(data => {

                user.push(data.val())

            });
            this.setState({ user: user }, () => {
                console.log(this.state.item.Reciever)
                if (this.state.item.Reciever === uid) {

                    var secuser = this.state.item.senderuid;

                }
                else {
                    var secuser = this.state.item.Reciever;

                }
                this.state.user.map((user) => {

                    if (user.user_id === secuser) {
                        this.setState({ fcmTokem: user.fcmToken,notification:user.notifications }, () => {
                            console.log("fcmTokem", this.state.fcmTokem,this.state.notification)

                        })

                    }
                })



                user = [];


            })
        })






    }

    conversationId = (a, b) => {
        if (a > b) {
            return a + b;

        }
        else {
            if (b > a) {
                return b + a;
            }
        }
    }
    renderOnline() {
        uid = firebase.auth().currentUser.uid
        if (this.state.item.Status.Status === true) {
            this.setState({ online: 'online' })
            online = 'online'


        }
        else {
            online = 'offline'

        }

    }

    onSend() {
        var uid = firebase.auth().currentUser.uid


        if (this.state.item.Reciever === uid) {

            var secuser = this.state.item.senderuid;

        }
        else {
            var secuser = this.state.item.Reciever;

        }
        this.state.user.map((users) => {
            if (users.user_id === secuser) {
                Reciever_username = users.name
                Reciever_ProfileImage = users.image_url
            }
            if (users.user_id === uid) {
                sender_username = users.name
                sender_ProfileImage = users.image_url
            }
        })


        var today = new Date();
        var time = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        var hour = time.getHours();
        var minutes = time.getMinutes();
        var ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12;
        if (minutes.toString().length == 1) {
            minutes = "0" + minutes;
        }
        if (hour.toString().length == 1) {
            hour = "0" + hour;
        }
        time = hour + ':' + minutes + " " + ampm;



        let now = dayjs();


        var dbref = firebase.database().ref(`messages/`);
        var key = dbref.push().key;
        var convId = this.conversationId(uid, secuser)


        if (this.state.text !== 'image') {
            firebase.database()
                .ref(`messages/${convId}/conversationUid`)
                .set({
                    conversationUid: convId
                })
            firebase.database()
                .ref(`messages/${convId}/messages`).child(key)
                .set({
                    text: this.state.text,
                    Reciever: secuser,
                    senderuid: uid,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    Date: new Date().toISOString(),
                    time: time,
                    read: false,
                    msgId: key,

                })
            firebase.database()
                .ref(`messages/${convId}/lastMessage`)
                .set({
                    lastMessage: this.state.text,
                    Reciever: secuser,
                    senderuid: uid,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    time: new Date().toISOString(),
                    name: '',
                    accepted: 'pending',
                    sender_username: sender_username,
                    Reciever_username: Reciever_username,
                    sender_ProfileImage: sender_ProfileImage,
                    Reciever_ProfileImage: Reciever_ProfileImage
                })
            this.sendPush(sender_username);
            this.setState({ text: '' })

        }

    }
    async sendPush(sender_username) {
        console.log("push is called")
        var uid = firebase.auth().currentUser.uid


        if(this.state.notification!=0){
        try {
            const response = await fetch("https://fcm.googleapis.com/fcm/send", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:
                        "key=AAAAHL1yNVc:APA91bHIjnfSzBmRhWgKL7v5Zi7e9Sj6I3oGnyXLalc0p0jbp5q8hWcogE_8Nto1SOIkBlHFCJt1FpG2q5ZsBC_qdT4_UdC_6dFKBaZInDJhTx1rmoWG7qLdDnYRoKwmKqYLoiOmZLd_"


                },
                body: JSON.stringify({
                    to: this.state.fcmTokem,
                    data: {
                        body: "",
                        title: "You have a new message!",
                        sound: "Enabled",
                        type: "Home4"
                        // icon: "default.png"
                    },
                    notification: {
                        body: "New message from " + sender_username,
                        title: "You have a new message!",
                        sound: "Enabled",



                        // icon: "default.png"
                    }

                })

            });

            const responseJson = await response.json();
            console.log("----------------RESPONSE--------- ", responseJson);
            // return responseJson;
        } catch (error) {
            // console.error("error",error);
        }
    }
     else{
         console.log("notification is not sent")
     }
     }

    renderOnlineStatus() {
        this.state.user.map((users) => {


            if (users.user_id === this.state.item.Reciever && uid !== this.state.item.Reciever) {


                Reciever_username = users.name

                if (users.Status.Status === false) {
                    online = 'offline'

                }
                else {
                    online = 'online'

                }

            }
            else if (users.user_id === this.state.item.senderuid && uid !== this.state.item.senderuid) {


                sender_username = users.name

                if (users.Status.Status === false) {
                    online = 'offline'
                    onlineStatus = 'green'
                }
                else {
                    online = 'online'
                    onlineStatus = 'green'
                }

            }
        })
    }
    renderName() {

        uid = firebase.auth().currentUser.uid;

        if (this.state.item.Reciever === uid) {

            return (
                <Text style={{ fontWeight: '600' }}>{this.state.item.sender_username}</Text>

            );

        }
        else {


            return (
                <Text style={{ fontWeight: '600' }}>{this.state.item.Reciever_username}</Text>
            );
        }


    }
    renderProfileImage() {
        uid = firebase.auth().currentUser.uid;

        if (this.state.item.image_url === undefined && (this.state.item.sender_ProfileImage === undefined || this.state.item.Reciever_ProfileImage === undefined)) {

            return (
                <View style={{ borderRadius: 40, alignItems: 'center', justifyContent: 'center', width: '20%' }}>
                    <Gravatar options={{
                        email: 'example@gmail.com',
                        parameters: { "size": "200", "d": "mm" },
                        secure: true
                    }}
                        style={{ height: 50, width: 50, borderRadius: 40, borderColor: 'white', borderWidth: 1 }}


                    />
                    <View
                        style={{ borderColor: 'white', borderWidth: 2.5, borderRadius: 50, height: 17, width: 17, backgroundColor: '#90EE90', position: "absolute", top: 33, right: -5 }}
                    />
                </View>);
        }
        else
            if (this.state.item.Reciever === uid) {
                return (
                    <View style={{ borderRadius: 40, alignItems: 'center', justifyContent: 'center', width: '20%' }}>
                        <Image
                            resizeMode="cover"
                            style={{ height: 50, width: 50, borderRadius: 40, borderColor: 'white', borderWidth: 1 }}
                            source={
                                this.state.item.image_url === undefined ? { uri: this.state.item.sender_ProfileImage } : { uri: this.state.item.image_url }

                            } />
                        <View
                            style={{ borderColor: 'white', borderWidth: 2.5, borderRadius: 50, height: 17, width: 17, backgroundColor: '#90EE90', position: "absolute", top: 33, right: -5 }}
                        />
                    </View>
                );
            }
            else {
                return (
                    <View style={{ borderRadius: 40, alignItems: 'center', justifyContent: 'center', width: '20%' }}>
                        <Image
                            resizeMode="cover"
                            style={{ height: 50, width: 50, borderRadius: 40, borderColor: 'white', borderWidth: 1 }}
                            source={
                                this.state.item.image_url === undefined ? { uri: this.state.item.Reciever_ProfileImage } : { uri: this.state.item.image_url }

                            } />
                        <View
                            style={{ borderColor: 'white', borderWidth: 2.5, borderRadius: 50, height: 17, width: 17, backgroundColor: '#90EE90', position: "absolute", top: 33, right: -5 }}
                        />
                    </View>
                );
            }

    }
    componentDidMount() {
        uid = firebase.auth().currentUser.uid;
        this.getMessage()
        this.takeUsersData()

        const ref = firebase.database().ref(`users/${uid}/Status`);
        ref.onDisconnect().set({ Status: false });






    }


    getMessage() {
        var uid = firebase.auth().currentUser.uid
        if (this.state.item.Reciever === uid) {
            var senderuid = this.state.item.senderuid;
        }
        else {
            var senderuid = this.state.item.Reciever;

        }

        var currId = this.conversationId(uid, senderuid);

        firebase.database().ref(`messages/${currId}/messages/`).on("value", (snapshot) => {
            snapshot.forEach(messages => {

                msg_array.push(messages.val())
                copyMessageList = msg_array;

                msgId = messages.val().msgId
                if (messages.val().Reciever === uid) {
                    console.log(messages.val().Reciever)
                    firebase.database().ref(`messages/${currId}/messages/${messages.val().msgId}`).update({
                        read: true,

                    })
                }

            });

            this.setState({ messages: msg_array }, () => {
                this.state.messages.reverse();
                this.setState({ loading: false })
                this.setState({ msgId: msgId })

            });
            msg_array = [];
        })

    }
    renderImage() {
        { this.renderOnlineStatus() }


        if (online === 'online' || this.state.item.Status === true) {
            return (
                this.renderProfileImage()
            );
        }
        else {
            if (this.state.item.image_url === undefined && (this.state.item.Reciever_ProfileImage === undefined || this.state.item.sender_ProfileImage === undefined)) {
                return (
                    <Gravatar options={{
                        email: 'example@gmail.com',
                        parameters: { "size": "200", "d": "mm" },
                        secure: true
                    }}
                        style={{ height: 50, width: 50, borderRadius: 40, borderColor: 'white', borderWidth: 1 }}


                    />
                )
            }
            else {
                { this.renderOnlineStatus() }
                uid = firebase.auth().currentUser.uid;

                if (this.state.item.Reciever === uid) {
                    return (
                        <View style={{ borderRadius: 40, alignItems: 'center', justifyContent: 'center', width: '20%' }}>
                            <Image
                                resizeMode="cover"
                                style={{ height: 50, width: 50, borderRadius: 40, borderColor: 'white', borderWidth: 1 }}
                                source={
                                    this.state.item.image_url === undefined ? { uri: this.state.item.sender_ProfileImage } : { uri: this.state.item.image_url }

                                } />

                        </View>
                    );
                }
                else
                    return (
                        <View style={{ borderRadius: 40, alignItems: 'center', justifyContent: 'center', width: '20%' }}>
                            <Image
                                resizeMode="cover"
                                style={{ height: 50, width: 50, borderRadius: 40, borderColor: 'white', borderWidth: 1 }}
                                source={
                                    this.state.item.image_url === undefined ? { uri: this.state.item.Reciever_ProfileImage } : { uri: this.state.item.image_url }

                                } />

                        </View>
                    );
            }
        }



    }
    updateSearch = (search) => {
        this.setState({ search: search })
        let List = copyMessageList.filter((item) => {

            return String(item.text.toLowerCase()).includes(search.toLowerCase())
        })
        this.setState({
            messages: List
        }, () => console.log(this.state.messages))

    }
    renderchtBox(item) {
        var uid = firebase.auth().currentUser.uid
        return (
            <View>
                <MessageBox
                    uid={uid}
                    item={item}

                />
            </View>
        );
    }
    render() {

        return (
            <SafeAreaView forceInset={{ top: 'always', bottom: 'never' }} style={{ flex: 1 }}>
                <StatusBar backgroundColor={theme.colors.purple} barStyle="dark-content" hidden={false} networkActivityIndicatorVisible={true} />
                <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white'}}
                   behavior="padding"
                   keyboardVerticalOffset={Platform.select({ios: 0, android: -500})}
                   
                >
                     <View style={{ height: 40, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' ,marginTop:15 }}>
                        <View style={{ marginLeft: 10 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home4')} >
                                <Icon name="ios-arrow-back"
                                    style={{
                                        fontSize: 30,
                                        paddingLeft: 8,
                                        paddingRight: 5
                                    }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderRadius: 40, alignItems: 'center', justifyContent: 'center', width: '10%', marginLeft: 20 }}>
                            <View>
                                {this.renderImage()}
                            </View>




                        </View>
                        <View style={{ flexDirection: "column", marginLeft: 20 }}>

                            <Text style={{ fontSize: 20, fontWeight: '400' }}>
                                {this.state.item.name === '' ? this.renderName() : this.state.item.name}
                            </Text>

                            <Text> {online}</Text>
                        </View>
                        {/* <View style={{ alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center' }}> */}
                            {/* <Input
                                    style={{ 
                                        fontSize: 16, paddingLeft: 20, borderBottomWidth: 0, color: 'black'
                                     }}
                                    placeholderTextColor='black'
                                    placeholder="Search..."
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.List}
                                    onChangeText={(value) => this.updateSearch(value)}
                                >
                                </Input> */}
                            {/* <TouchableOpacity onPress={()=>{
                                   // this.scr
                                   this.flatListRef.scrollToIndex({index:1,animated:true})
                                }}>
                                    <Text>search</Text>
                                </TouchableOpacity> */}

                        {/* </View> */}

                    </View>


                    <View style={{ flex: 1 }}>
                        {/* <SafeAreaView style={{ flex: 1 }}> */}

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                ref={(ref) => { this.flatListRef = ref; }}
                                style={{ margin: 10, transform: [{ scaleY: -1 }] }}
                                data={this.state.messages}
                                extraData={this.state.refresh}
                                // onScroll={(e) => { console.log(e.Date)}}
                                keyExtractor={(item, index) => { index.toString() }}
                                renderItem={({ item, separators, index }) => {
                                    var preDate = ''
                                    var msgDate = ''
                                    //dayjs.extend(updateLocale)

                                    console.log(index)
                                    if (index > 0) {
                                        preDate = new Date(this.state.messages[index - 1].Date).getDate()
                                        msgDate = new Date(item.Date).getDate()
                                        console.log("a", preDate)
                                        console.log(msgDate)
                                    }
                                    if (this.state.messages.length - 1 === index) {
                                        console.log("item", item)
                                        let today = now();
                                        console.log(today)
                                        return (
                                            <View>
                                                {this.renderchtBox(item)}
                                                <Text style={styles.messageTextStyle}>{dayjs(item.Date).format("dddd, DD MMM YYYY")}</Text>

                                            </View>
                                        )

                                    }


                                    if (msgDate !== preDate) {
                                        console.log(item)
                                        return (
                                            <View>
                                                <Text style={styles.messageTextStyle}>{dayjs(item.Date).format("dddd, DD MMM YYYY")}</Text>
                                                {this.renderchtBox(item)}

                                            </View>
                                        )

                                    }
                                    else {
                                        return (
                                            <View>
                                                {this.renderchtBox(item)}
                                            </View>
                                        )
                                    }



                                }



                                }

                            // ListHeaderComponent={this.renderHeader}
                            />

                        {/* </SafeAreaView> */}

                        <View style={{}}>

                            <View style={styles.container}>
                                {/* <View style={{ justifyContent: 'center', marginLeft: 10, flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.openImage()}>
                                            <View style={{ marginLeft:10}}>
                                                <Icon style={{ color: 'grey' }} name={'ios-arrow-dropleft-circle'} />
                                            </View>
                                        </TouchableOpacity >
                                        <TouchableOpacity >
                                            <View style={{ marginLeft: 10 }}>
                                                <Icon style={{ color: 'grey' }} name={'ios-happy'} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>  */}

                                <View style={{ width: '70%', justifyContent: 'center' }}>

                                    <TextInput
                                        autoCorrect={false}
                                        style={{ padding: 10, borderColor: 'gray', fontSize: 15 }}
                                        onChangeText={(text) => this.setState({ text })}
                                        value={this.state.text}
                                        multiline={true}
                                        placeholder={'Type something'}

                                    />

                                </View>

                                <View style={{ marginLeft: '19%' }}>
                                    <TouchableOpacity onPress={() => this.onSend()}
                                        style={{
                                            justifyContent: 'center', alignItems: 'center',
                                            //  marginRight: 30 
                                        }}>
                                        <Icon style={{ color: 'purple' }} name={'md-send'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>


                {/* </View> */}
            </SafeAreaView>


        );
    }

};
const styles = StyleSheet.create({
    messageTextStyle: {
        marginTop: 4,
        fontSize: 12,
        alignSelf: "center",
        transform: [{ scaleY: -1 }]
    },
    container: {
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }

})