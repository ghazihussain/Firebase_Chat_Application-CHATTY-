import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, StyleSheet, Alert, Modal, AsyncStorage } from "react-native";
import theme from '../../utils/theme';
import { Icon, Input, Item, Form, Picker } from 'native-base'
import RadioGroup, { Radio } from "react-native-radio-input";
import firebase from 'react-native-firebase';



var month;

const yearData = [
    '1971',
    '1972',
    '1973',
    '1974',
    '1975',
    '1976',
    '1977',
    '1978',
    '1979',
    '1980',
    '1981',
    '1982',
    '1983',
    '1984',
    '1985',
    '1986',
    '1987',
    '1988',
    '1989',
    '1990',
    '1991',
    '1992',
    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
];
const monthData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const dateData = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
];
const dateData2 = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
];
const dateData3 = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
];
const notificationData = [
    // "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990",
    // "1991", "1992", "1993", "1994", "1995", "1996", "1997", "1998", "1999", "2000",
    // "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010",
    // "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018",
    "Yes", "No"
]

var location = 0
var notification = 0
var confirm_result = ""
export default class Settings extends Component {
    state = {
        newPassword: "", currentPassword: "", newEmail: "", oldPassword: "",
        notification: 0, location: 0, user: [], modalVisible: false, confirmResult: "", deleteVisible: false,
        newName: "", month: "", year: "", date: "",pronoun:"", newLastName: "",newLocation:"",
        

    }
    componentDidMount() {
        // var uid = firebase.auth().currentUser.uid
        // var db = firebase.database().ref(`users/`).on("value", (snapshot) => {
        //     snapshot.forEach(data => {
        //         if (data.val().user_id === uid)
        //             location = data.val().locationPermission
        //         notification = data.val().notificationPermission

        //     });
        //     this.setState({
        //         location: location,
        //         notification: notification
        //     })
        // })
    }
    
    // deleteUser() {
    //     var user = firebase.auth().currentUser;

    //     user.delete().then(function () {
    //         console.log("user deleted")
    //     }).catch(function (error) {
    //         // An error happened.
    //     });
    // }

    notificationList = () => {
        return notificationData.map((x, i) => {
            // console.log("years are ",x)
            return <Picker.Item label={x} key={x} value={x} />;
        });
    };
    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
    changePassword = (currentPassword, newPassword) => {

        if (this.state.oldPassword !== "" && this.state.newPassword !== "")
            this.reauthenticate(this.state.oldPassword).then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(this.state.newPassword).then(() => {
                    this.setState({ newPassword: "", oldPassword: "", modalVisible: true, confirmResult: "Password Updated" }, () => {

                        console.log(confirm_result)
                    })


                }).catch((error) => { console.log(error); });
            }).catch((error) => {
                this.setState({ confirmResult: error },
                    () => {
                        console.log(this.state.confirmResult)
                        //this.setState({modalVisible:true})
                    })
            });

    }
    // 
    yearList() {
        return yearData.map((x, i) => {
            // console.log("years are ",x)
            return <Picker.Item label={x} key={x} value={x} />;
        });
    };
    monthList() {
        return monthData.map((x, i) => {
            // console.log("years are ",i++)
            if (i > 9) {
                return <Picker.Item label={x} key={x} value={i + 1} />;
            } else {
                return <Picker.Item label={x} key={x} value={`0` + (i + 1)} />;
            }
        });
    };

    //   birthdayDate = year + '-' + month + '-' + date;

    //   console.log('bithday data is ', birthdayDate);
   
    

    dateList = () => {
        if (
            month === '01' ||
            month === '03' ||
            month === '05' ||
            month === '07' ||
            month === '08' ||
            month === '10' ||
            month === '12'
        ) {
            return dateData.map((x, i) => {
                // console.log("years are ",x)
                return <Picker.Item label={x} key={x} value={x} />;
            });
        } else if (month === '02') {
            return dateData3.map((x, i) => {
                // console.log("years are ",x)
                return <Picker.Item label={x} key={x} value={x} />;
            });
        } else {
            return dateData2.map((x, i) => {
                // console.log("years are ",x)
                return <Picker.Item label={x} key={x} value={x} />;
            });
        }
    };
    changeName = () => {
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref(`users/${uid}`).update({
            name: this.state.newName,
            lastName:this.state.newLastName

        })
        this.setState({ modalVisible: true, confirmResult: "Name Updated!!" })


    }
    
    
   
    renderModalTrue() {
        if (this.state.modalVisible) {
            setTimeout(() => { this.setState({ modalVisible: false }) }, 1000);
        }
    }

    changeEmail = (currentPassword, newEmail) => {
        if (this.state.currentPassword !== "" && this.state.newEmail !== "")
            this.reauthenticate(this.state.currentPassword).then(() => {
                var user = firebase.auth().currentUser;
                user.updateEmail(this.state.newEmail).then(() => {
                    this.setState({ currentPassword: "", newEmail: "", modalVisible: true, confirmResult: "Email Updated!" })
                    confirm_result = "Email Updated!"
                }).catch((error) => { console.log(error); });
            }).catch((error) => { console.log(error); });
    }
    changeBirthday() {
        const uid = firebase.auth().currentUser.uid
        var birthdayDate = this.state.year + '-' + this.state.month + '-' + this.state.date;
        firebase.database().ref(`users/${uid}`).update({
            birthdayDate: birthdayDate
        })
        this.setState({ month: "", year: "", date: "", modalVisible: true, confirmResult: "Birthday Updated!" })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.blue }}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ fontSize: 16, fontWeight: "300", color: "white", alignSelf: "center" }}>{this.state.confirmResult}</Text>
                            {this.renderModalTrue()}
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.deleteVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}

                >
                    <View style={styles.centeredDeleteView}>
                        <View style={styles.modalDeleteView}>

                            <Text style={{ fontSize: 16, fontWeight: "bold", color: theme.colors.blue, alignSelf: "center", marginTop: 0 }}> Do you want to delete profile?</Text>
                            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>

                                <TouchableOpacity
                                    onPress={
                                        () => { this.deleteUser() }
                                    }
                                    style={styles.ButtonDelStyle}>
                                    <Text style={{ alignSelf: 'center', color: "white", fontWeight: "600", fontSize: 15 }}>Yes</Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ deleteVisible: false })
                                    }}
                                    style={styles.ButtonDelStyle}>
                                    <Text style={{ alignSelf: 'center', color: "white", fontWeight: "600", fontSize: 15 }}>No</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>

                </Modal>
                <StatusBar backgroundColor={theme.colors.blue} barStyle="light-content" hidden={false} networkActivityIndicatorVisible={true} />

                <View style={{ backgroundColor: "white", flex: 1 }}>
                    <View style={styles.container}>

                        <View
                            style={{
                                position: 'absolute', marginLeft: "5%",
                            }}
                        >
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home1')}>

                                <Icon type={"Ionicons"} name="ios-arrow-back"
                                    style={{ color: 'white', fontSize: 25, }} />

                            </TouchableOpacity>
                        </View>
                        <View style={{ alignSelf: "center" }}>
                            <Text style={{ fontSize: 20, color: "white", fontWeight: "600" }}>Settings</Text>
                        </View>
                    </View>

                    <ScrollView>
                        <View style={{ height: '30%' }}>
                            <Form style={{ width: '100%' }}>

                                <View style={styles.cardStyle}>
                                    <Text style={{ margin: 10, fontSize: 20, fontWeight: "500" }}>Change email</Text>
                                    <View style={{}}>
                                        <View style={{ marginLeft: 30, alignSelf: 'flex-start', zIndex: 1, }}>
                                            <Text
                                                style={{ top: 18, backgroundColor: 'white', paddingLeft: 4, color: theme.colors.blue }}>
                                                Change Your Email
                                             </Text>
                                        </View>
                                        <Item style={styles.inputStyle} rounded>
                                            <Input
                                                style={{}}
                                                placeholder="Enter your new email here"
                                                autoCapitalize="none"

                                                autoCorrect={false}
                                                value={this.state.newEmail}
                                                onChangeText={(newEmail) => { this.setState({ newEmail }) }}


                                            />
                                        </Item>
                                    </View>
                                    <View>
                                        <View style={{ marginLeft: 30, alignSelf: 'flex-start', zIndex: 1, }}>

                                            <Text
                                                style={{ top: 18, backgroundColor: 'white', paddingLeft: 4, color: theme.colors.blue }}>
                                                Old Password
                        </Text>
                                        </View>

                                        <Item style={styles.inputStyle} rounded>

                                            <Input
                                                style={{}}
                                                placeholder="Enter your old password"
                                                secureTextEntry={true}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                value={this.state.currentPassword}
                                                onChangeText={(currentPassword) => { this.setState({ currentPassword }) }}



                                            />
                                        </Item>
                                    </View>
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <TouchableOpacity
                                            onPress={
                                                this.changeEmail
                                            }
                                            style={styles.ButtonStyle}>
                                            <Text style={{ alignSelf: 'center', color: "white", fontWeight: "600", fontSize: 15 }}>Update Email</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                </View>
                                <View style={styles.cardStyle}>
                                    <Text style={{ margin: 10, fontSize: 20, fontWeight: "500" }}>Change password</Text>
                                    <View >
                                        <View style={{ marginLeft: 30, alignSelf: 'flex-start', zIndex: 1, }}>
                                            <Text
                                                style={{ top: 18, backgroundColor: 'white', paddingLeft: 4, color: theme.colors.blue }}>
                                                New Password
                                          </Text>
                                        </View>
                                        <Item style={styles.inputStyle} rounded>
                                            <Input
                                                style={{}}
                                                placeholder="Enter your new password"
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                secureTextEntry={true}
                                                value={this.state.newPassword}
                                                onChangeText={(newPassword) => { this.setState({ newPassword }) }}


                                            />
                                        </Item>
                                    </View>
                                    <View>
                                        <View style={{ marginLeft: 30, alignSelf: 'flex-start', zIndex: 1, }}>
                                            <Text
                                                style={{ top: 18, backgroundColor: 'white', paddingLeft: 4, color: theme.colors.blue }}>
                                                Old Password
                        </Text>
                                        </View>

                                        <Item style={styles.inputStyle} rounded>

                                            <Input
                                                style={{}}
                                                placeholder="Enter your old Password"
                                                secureTextEntry={true}
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                value={this.state.oldPassword}
                                                onChangeText={(oldPassword) => { this.setState({ oldPassword }) }}



                                            />
                                        </Item>
                                    </View>
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <TouchableOpacity
                                            onPress={
                                                this.changePassword
                                            }
                                            style={styles.ButtonStyle}>
                                            <Text style={{ alignSelf: 'center', color: "white", fontWeight: "600", fontSize: 15 }}>Update Password</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                </View>
                                <View style={styles.cardStyle}>
                                    <Text style={{ margin: 10, fontSize: 20, fontWeight: "500" }}>Change Name</Text>
                                    <View style={{}}>
                                        <View style={{ marginLeft: 30, alignSelf: 'flex-start', zIndex: 1, }}>
                                            <Text
                                                style={{ top: 18, backgroundColor: 'white', paddingLeft: 4, color: theme.colors.blue }}>
                                                Enter first name
                                             </Text>
                                        </View>
                                        <Item style={styles.inputStyle} rounded>
                                            <Input
                                                style={{}}
                                                placeholder=" Enter first name"
                                                autoCapitalize="none"

                                                autoCorrect={false}
                                                value={this.state.newName}
                                                onChangeText={(newName) => { this.setState({ newName }) }}


                                            />
                                        </Item>
                                    </View>
                                    <View style={{}}>
                                        <View style={{ marginLeft: 30, alignSelf: 'flex-start', zIndex: 1, }}>
                                            <Text
                                                style={{ top: 18, backgroundColor: 'white', paddingLeft: 4, color: theme.colors.blue }}>
                                               Enter last name
                                             </Text>
                                        </View>
                                        <Item style={styles.inputStyle} rounded>
                                            <Input
                                                style={{}}
                                                placeholder=" Enter last name"
                                                autoCapitalize="none"

                                                autoCorrect={false}
                                                value={this.state.newLastName}
                                                onChangeText={(newLastName) => { this.setState({ newLastName }) }}


                                            />
                                        </Item>
                                    </View>
                                    <View>


                                    </View>
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <TouchableOpacity
                                            onPress={
                                                this.changeName
                                            }
                                            style={styles.ButtonStyle}>
                                            <Text style={{ alignSelf: 'center', color: "white", fontWeight: "600", fontSize: 15 }}>Update Name</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                </View>
                                <View style={styles.cardStyle}>
                                   <View>
                                    <Text style={{ margin: 10, fontSize: 20, fontWeight: "500" }}>Change Birthday</Text>
                                    
                                   <View>
                                   </View>
                                    <View style={{ marginLeft: 30, alignSelf: 'flex-start', zIndex: 1 }}>
                                        <Text
                                            style={{
                                                top: 15,
                                                backgroundColor: 'white',
                                                paddingLeft: 4,
                                                color: theme.colors.blue,
                                            }}>
                                            Birthday{' '}
                                        </Text>
                                    </View>
                                    <Item style={styles.inputStyle} rounded>
                                        <View
                                            style={{ flexDirection: 'row', }}>

                                            <Picker
                                                style={styles.pickerStyle}
                                                selectedValue={this.state.month}
                                                placeholder="Select month"
                                                mode="dropdown"
                                                iosHeader="Select month"
                                                onValueChange={(value) => { this.setState({ month: value }) }}
                                                value={'Select month'}>
                                                <Picker.Item value="" label="Month" />
                                                {this.monthList()}
                                            </Picker>

                                           
                                            {Platform.OS === 'ios' ?
                                                <View style={{ marginHorizontal: '15%' }} >
                                                    <Picker
                                                        style={styles.pickerStyle}
                                                        selectedValue={this.state.date}
                                                        placeholder="Select date"
                                                        mode="dropdown"
                                                        iosHeader="Date"
                                                        onValueChange={(value) => { this.setState({ date: value }) }}
                                                        // onValueChange={x => setDate(x)}
                                                        value={'Date'}>
                                                        <Picker.Item value="" label="Date" />
                                                        {this.dateList()}
                                                    </Picker>
                                                </View>
                                                :
                                                <Picker
                                                    style={styles.pickerStyle}
                                                    selectedValue={this.state.date}
                                                    placeholder="Select date"
                                                    mode="dropdown"
                                                    iosHeader="Date"
                                                    //   onValueChange={x => setDate(x)}
                                                    onValueChange={(value) => { this.setState({ date: value }) }}
                                                    value={'Date'}>
                                                    <Picker.Item value="" label="Date" />
                                                    {this.dateList()}
                                                </Picker>
                                            }

                                            <Picker
                                                style={styles.pickerStyle}
                                                selectedValue={this.state.year}
                                                placeholder="Select year"
                                                mode="dropdown"
                                                iosHeader="Select year"
                                                // onValueChange={x => setYear(x)}
                                                onValueChange={(value) => { this.setState({ year: value }) }}
                                                value={'Select year'}>
                                                {/* <Picker.Item label="select hours" value="" />; */}
                                                <Picker.Item value="" label="Year" />
                                                {this.yearList()}
                                            </Picker>



                                            {/* </Item> */}
                                        </View>
                                     </Item>
                                     
                                     
                                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                this.changeBirthday()
                                            }
                                            style={styles.ButtonStyle}>
                                            <Text style={{ alignSelf: 'center', color: "white", fontWeight: "600", fontSize: 15 }}>Update Birthday</Text>
                                        </TouchableOpacity>
                                    </View>
                                    </View>
                                </View>
                           
                               
                                
                                  
                                  
                                     
                                    
                               
                                <View style={styles.cardStyle}>
                                    <View>
                                  
                                    <View>
                                    </View>
                                    
                                     
                                    
                                </View>
                           


                             
                                
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-evenly", margin: 20, marginBottom: 20 }}>
                                    <TouchableOpacity onPress={() => {
                                        firebase
                                            .auth()
                                            .signOut()
                                            .then(async () => {
                                                await AsyncStorage.removeItem('setUser')
                                                console.log("signed out!")
                                                this.props.navigation.navigate('Auth')
                                            });

                                    }} style={{
                                        padding: 10, backgroundColor: "#8F8882", borderRadius: 8, width: "90%", shadowColor: "#000",
                                        alignItems: "center"
                                    }}>
                                        <Text style={{ alignSelf: 'center', color: 'white', fontWeight: "500", fontSize: 17 }}>SignOut</Text>
                                    </TouchableOpacity>
                                    


                                </View>

                            </Form>


                        </View>
                    </ScrollView>
                </View>

            </SafeAreaView>
        )
    }


}
const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.blue,
        height: 80,
        justifyContent: 'center',
        // flexDirection:"row"
    },
    inputStyle: {
        width: "70%",
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        width: '87%',
        margin: '2%',
        borderWidth: 3,
        borderRadius: 5,
        alignSelf: "center",
        borderColor: theme.colors.blue,


    },
    TextInputStyle: {
        height: 40,
        fontSize: 16,
        backgroundColor: "white",
        borderBottomColor: "#818790",
        borderBottomWidth: 0.5,
        marginLeft: 17,
        marginRight: 17,
        marginTop: 10



    },
    textStyle: {
        marginLeft: 20,
        // padding:5,
        marginRight: 10,
        marginTop: 10,
        fontWeight: "700",
        fontSize: 19
    },
    cardStyle: {
        backgroundColor: "#FFF", borderRadius: 10,
        shadowOffset: { width: .5, height: .5 },
        shadowOpacity: 0.2,
        alignSelf: 'center',
        marginVertical: "5%",
        width: "90%",
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(100,100,100, 0.5)',
        //position: 'absolute',



    },
    centeredDeleteView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#8F8882",
        //position: 'absolute',
        backgroundColor: 'rgba(100,100,100, 0.7)',



    },
    modalDeleteView: {

        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "center",

        height: "20%",
        width: "70%",
        // padding:20,
        //shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,

    },
    modalView: {

        backgroundColor: "#8F8882",
        borderRadius: 10,
        justifyContent: "center",

        height: "5%",
        width: "50%",
        // padding:20,
        //shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,

    },
    ButtonStyle: {
        padding: 8,
        backgroundColor: theme.colors.blue,
        borderRadius: 8,
        width: "50%",
        alignItems: "center",
        margin: 20
    },
    ButtonDelStyle: {
        padding: 8,
        backgroundColor: theme.colors.blue,
        borderRadius: 8,
        width: "40%",
        alignItems: "center",
        margin: 10
    },
    imputTextLabel: {
        top: 15,
        backgroundColor: 'white',
        paddingLeft: 4,
        color: theme.colors.blue
    }



})