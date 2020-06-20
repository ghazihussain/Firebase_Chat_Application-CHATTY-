
import moment, {isMoment, months} from 'moment';
import {Button, DatePicker, Form, Icon, Input, Item, Picker} from 'native-base';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import RadioGroup, {Radio} from 'react-native-radio-input';
import LocationData from '../Auth/LocationData'
import SchoolData from '../Auth/SchoolData'

import theme from '../../utils/theme';
import Error from '../Error/Error';

import {Gravatar, GravatarApi} from 'react-native-gravatar';
import {Spinner} from '../../utils/Spinner';


var sourcePath = '';
var notificationPermission = '';

var user_id;
 const pronounsData = [
  'He/Him/His',
  'She/Her/Hers',
  'They/Them/Theirs',
  'Just use my name'
]
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
 const RegisterTwo = ({navigation}, props) => {
  // var notificationPermission='';
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [state, setState] = useState(false);
  const [location, setLocation] = useState();
  const [Skill, setSkills] = useState();
  // const [year, setYear] = useState()
  // const [major, setMajor] = useState('')
  // const [birthdayDate, setBirthdayDate] = useState()
  const [gender, setGender] = useState();
  const [pronouns, setPronouns] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [school, setSchool] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [isFirstModal, setIsFirstModal] = useState(false);
  const [isSecondModal, setIsSecondModal] = useState(false);
  const [locationPermission, setLocationPermission] = useState();
  // const [notifications, setNotifications] = useState()
  const [imageUrl, setImageUrl] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [imageData, setImageData] = useState();
  const [visible, setvisible] = useState(false);
  const [City, setCity] = useState('');

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');

  

  

  const openModal = () => {
    setModalVisible(true);
    setIsFirstModal(true);
    setIsSecondModal(false);
  };
  const closeModal = () => {
    setModalVisible(false);
    console.log('modal closed');
    pushDetails();
  };
  const modalUpdate = () => {
    setIsFirstModal(false);
    setIsSecondModal(true);
  };
  const registered = () => {
    validation();
    // openModal()
  };

  // const schoolList = () => {
  //     return SchoolData.map((x, i) => {

  //         return <Picker.Item label={x} key={x} value={x} />;
  //     });
  // };
  // const yearList = () => {
  //     return yearData.map((x, i) => {
  //         // console.log("years are ",x)
  //         return <Picker.Item label={x} key={x} value={x} />;
  //     });
  // };

  const pronounsList = () => {
    return pronounsData.map((x, i) => {
      // console.log("years are ",x)
      return <Picker.Item label={x} key={x} value={x} />;
    });
  };

//   const showSchool = value => {
//       setSchool(value);

//   };
  // const showYear = value => {
  //     setYear(value);

  // };

  const yearList = () => {
    return yearData.map((x, i) => {
      // console.log("years are ",x)
      return <Picker.Item label={x} key={x} value={x} />;
    });
  };
  const monthList = () => {
    return monthData.map((x, i) => {
      // console.log("years are ",i++)
      if (i > 9) {
        return <Picker.Item label={x} key={x} value={i + 1} />;
      } else {
        return <Picker.Item label={x} key={x} value={`0` + (i + 1)} />;
      }
    });
  };

  var birthdayDate = year + '-' + month + '-' + date;

  console.log('bithday data is ', birthdayDate);
  const locationList = () => {
    return locationData.map((x, i) => {
      // console.log("years are ",x)
      return <Picker.Item label={x} key={x} value={x} />;
    });
  };
//   const schoolList = () => {
//       return SchoolData.map((x, i) => {

//           return <Picker.Item label={x} key={x} value={x} />;
//       });
//   };
  


  const dateList = () => {
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

  console.log(year, month, date);
  const showPronouns = value => {
    setPronouns(value);
  };
  const showLocation = value => {
    setLocation(value);
  };
  // console.log("location is", location)
  const getChecked = value => {
    setGender(value);
  };
  var options = {
    title: 'UPLOAD PHOTO',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'choose photo from library',
  };

  const openPic = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      setvisible(true);
      if (response.didCancel) {
        setvisible(false);
        console.log('User cancelled image picker');
      } else if (response.error) {
        setvisible(false);
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};

        sourcePath = {uri: response.uri};

        if (Platform.OS === 'ios') {
          sourcePath = {uri: response.uri};
        } else {
          sourcePath = {uri: response.path};
        }

        setImageUrl(source);
        // setImageUri(response.uri)
        user_id=firebase.auth().currentUser.uid
        var firebaseStorageRef = firebase.storage().ref('ProfileImages/');
        const imageRef = firebaseStorageRef.child(
          'user/' + user_id + '/' + '.jpg',
        );
        
        var image_uri = imageRef
          .putFile(sourcePath.uri, {contentType: 'image/jpg'})
          .then(function() {
            return imageRef.getDownloadURL();
            //   console.log("Image Url is: ",image_url)
          })
          .then(url => {
            setvisible(false);
            setImageData(url);
            console.log('urrl is:', url);

            console.log('image data is', imageData);
            // firebase.database().ref("users/"+user_id).update({image_url:url})
            //   this.setState({ avatarSource: { uri: url } }, () => {
            // this.setState({ loading: false })
            // firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({
            //   photoURL: url
            // })
            //   })
          });
      }
    });
  };

  const pushDetails = () => {
    // console.log("notificcation variable",notificationPermissiom)
    console.log('imaggee ', imageData);
    let params = {
      email,
      user_id,
      name,
      lastName,
      // school,
      location,
      // year,
      // major,
      birthdayDate,
      gender,
      pronouns,
      locationPermission,
      notificationPermission,
      Reciever: user_id,
      image_url: imageData,

    };

    console.log('Profile Params are: ', params);
  


  };
  const pressNext=()=>{
     user_id =firebase.auth().currentUser.uid
     firebase.database().ref(`users/${user_id}`).set({
         name:name,
         gender:gender,
         birthdayDate:birthdayDate,
         lastName:lastName,
         user_id:user_id,
         Reciever:user_id,
         email:firebase.auth().currentUser.email,
         imageUrl:imageData,
         skill:Skill,
         city:City
         
     }).then(()=>{
         navigation.navigate("LoginScreen")
     })
    
  }

  const validation = () => {
    setErrorMessage('');
console.log("bidthday is",birthdayDate)
    if (!name ) {
      setErrorMessage('Please enter your name');
    
    } else if(!lastName){
      setErrorMessage('Please enter your last name');
      
    }
    else if (gender === '') {
      setErrorMessage('Fullfill all requirements');
    }else if(month ==='') {
        setErrorMessage('Select your month')
    }else if(date===''){
        setErrorMessage('Select your date')
    }else if(year===''){
        setErrorMessage('Select your year')
    }
    else {
      setErrorMessage('');
      // pushDetails()
      pressNext()
    //   openModal();
     
    }
  };



  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View>
          <StatusBar
            backgroundColor={'#FFF'}
            barStyle="dark-content"
            hidden={false}
            networkActivityIndicatorVisible={false}
          />

          {imageUrl.uri ? (
            <TouchableOpacity onPress={() => openPic()}>
              <View>
                <Image source={imageUrl} style={styles.ProfileImageStyle} />
              </View>
              <View
                style={styles.cameraIconStyle}>
                <Icon
                  type={'Ionicons'}
                  name="camera"
                  style={{color: 'grey', fontSize: 25}}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => openPic()}>
              <Gravatar
                options={{
                  email: 'example@gmail.com',
                  parameters: {size: '200', d: 'mm'},
                  secure: true,
                }}
                style={styles.ProfileImageStyle}
              />
              <View
                style={styles.cameraIconStyle}>
                <Icon
                  type={'Ionicons'}
                  name="camera"
                  style={{color: 'grey', fontSize: 25}}
                />
              </View>
            </TouchableOpacity>
          )

          }
          <Form style={{width: '100%', marginTop: 10}}>
            <View style={{marginLeft: 30, alignSelf: 'flex-start', zIndex: 1}}>
              <Text
                style={{
                  top: 15,
                  backgroundColor: 'white',
                  paddingLeft: 4,
                  color: theme.colors.blue,
                }}>
                First Name{' '}
              </Text>
            </View>
            <Item style={styles.inputStyle} rounded>
              <Input
                placeholderTextColor="grey"
                placeholder="Your name here"
                autoCapitalize="none"
                autoCorrect={false}
                value={name}
                onChangeText={x => setName(x)}
              />
            </Item>
            <View style={{marginLeft: 30, alignSelf: 'flex-start', zIndex: 1}}>
              <Text
                style={{
                  top: 15,
                  backgroundColor: 'white',
                  paddingLeft: 4,
                  color: theme.colors.blue,
                }}>
                Last Name{' '}
              </Text>
            </View>
            <Item style={styles.inputStyle} rounded>
              <Input
                placeholderTextColor="grey"
                placeholder="Your Last name here"
                autoCapitalize="none"
                autoCorrect={false}
                value={lastName}
                onChangeText={x => setLastName(x)}
              />
            </Item>
            <View style={{marginLeft: 30, alignSelf: 'flex-start', zIndex: 1}}>
              <Text
                style={{
                  top: 15,
                  backgroundColor: 'white',
                  paddingLeft: 4,
                  color: theme.colors.blue,
                }}>
                Skills{' '}
              </Text>
            </View>
            <Item style={styles.inputStyle} rounded>
              <Input
                placeholderTextColor="grey"
                placeholder="Only One Top Skill"
                autoCapitalize="none"
                autoCorrect={false}
                value={Skill}
                onChangeText={x => setSkills(x)}
              />
            </Item>
            <View style={{marginLeft: 30, alignSelf: 'flex-start', zIndex: 1}}>
              <Text
                style={{
                  top: 15,
                  backgroundColor: 'white',
                  paddingLeft: 4,
                  color: theme.colors.blue,
                }}>
                City{' '}
              </Text>
            </View>
            <Item style={styles.inputStyle} rounded>
              <Input
                placeholderTextColor="grey"
                placeholder="Only One Top Skill"
                autoCapitalize="none"
                autoCorrect={false}
                value={City}
                onChangeText={x => setCity(x)}
              />
            </Item>
            

            {/* <View style={{ marginLeft: 30, alignSelf: 'flex-start', zIndex: 1, }}>
                            <Text
                                style={{ top: 15, backgroundColor: 'white', paddingLeft: 4, color: theme.colors.purple }}>
                                School </Text>
                        </View>
                        <Item style={styles.inputStyle} rounded>
                            <View style={{ width: "100%" }}>
                                <Picker
                                    style={styles.pickerStyle}
                                    selectedValue={school}
                                    placeholder="Select your school"
                                    mode="dropdown"
                                    iosHeader="Select your school"
                                    iosIcon={<Icon name="arrow-down" style={{ color: th eme.colors.purple }} />}
                                    onValueChange={
                                        showSchool.bind()}
                                    value={"Select School"}
                                >
                                    <Picker.Item value='' label='School/College here' />
                                    {schoolList()}
                                </Picker>
                            </View>
                        </Item>
            <View style={{marginLeft: 30, alignSelf: 'flex-start', zIndex: 1}}>
              
            </View>
             */}
            {/* <View style={{ marginLeft: 30, alignSelf: 'flex-start', zIndex: 1, }}>
                            <Text
                                style={{ top: 15, backgroundColor: 'white', paddingLeft: 4, color: theme.colors.purple }}>
                                Graduation Year </Text>
                        </View>
                        <Item style={styles.inputStyle} rounded>
                            <View style={{ width: "100%" }}>
                                <Picker
                                    style={styles.pickerStyle}
                                    selectedValue={year}
                                 
                                    mode="dropdown"
                                    iosHeader="Select your Graduation Year"
                                    iosIcon={<Icon name="arrow-down" style={{ color: theme.colors.purple }} />}
                                    onValueChange={
                                        showYear.bind()}
                                    value={"Select Year"}
                                >
                                    <Picker.Item value='' label='Select Year' />
                                    {yearList()}
                                </Picker>
                            </View>
                        </Item> */}
            {/* <View style={{ marginLeft: 30, alignSelf: 'flex-start', zIndex: 1, }}>
                            <Text
                                style={{ top: 15, backgroundColor: 'white', paddingLeft: 4, color: theme.colors.purple }}>
                                Major </Text>
                        </View>
                        <Item style={styles.inputStyle} rounded>
                            <Input
                                placeholderTextColor='black'
                                placeholder="Enter your Major"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={major}
                                onChangeText={x => setMajor(x)}
                            />
                        </Item> */}
            <View style={{marginLeft: 30, alignSelf: 'flex-start', zIndex: 1}}>
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
                style={{flexDirection: 'row',}}>
              
                         <Picker
                    style={styles.pickerStyle}
                    selectedValue={month}
                    placeholder="Select month"
                    mode="dropdown"
                    iosHeader="Select month"
                    onValueChange={x => setMonth(x)}
                    value={'Select month'}>
                    <Picker.Item value="" label="Month" />
                    {monthList()}
                  </Picker>
                

                  { Platform.OS === 'ios' ?
                      <View style={{marginHorizontal: '17%'}} >
              <Picker
                    style={styles.pickerStyle}
                    selectedValue={date}
                    placeholder="Select date"
                    mode="dropdown"
                    iosHeader="Date"
                   
                    onValueChange={x => setDate(x)}
                    value={'Date'}>
                    <Picker.Item value="" label="Date"/>
                    {dateList()}
                  </Picker>
                  </View>
                  :
                  <Picker
                  style={styles.pickerStyle}
                  selectedValue={date}
                  placeholder="Select date"
                  mode="dropdown"
                  iosHeader="Date"
                  onValueChange={x => setDate(x)}
                  value={'Date'}>
                  <Picker.Item value="" label="Date"/>
                  {dateList()}
                </Picker>
                  }

                <Picker
                    style={styles.pickerStyle}
                    selectedValue={year}
                    placeholder="Select year"
                    mode="dropdown"
                    iosHeader="Select year"
                    onValueChange={x => setYear(x)}
                    value={'Select year'}>
                    {/* <Picker.Item label="select hours" value="" />; */}
                    <Picker.Item value="" label="Year" />
                    {yearList()}
                  </Picker>

                
                
                {/* </Item> */}
              </View>
                       {/* <DatePicker
                                defaultDate={new Date(2020, 3, 23)}
                                date={birthdayDate}
                             
                                textStyle={'#000'}
                                placeHolderText="Select date"
           
                                />
                            </View> */}
            </Item>
            <View style={{marginLeft: 30, alignSelf: 'flex-start', zIndex: 1}}>
              <Text
                style={{
                  top: 15,
                  backgroundColor: 'white',
                  paddingLeft: 4,
                  color: theme.colors.blue,
                }}>
                Gender{' '}
              </Text>
            </View>
            <Item style={styles.inputStyle} rounded>
              <View style={styles.radioBtnStyle}>
                <RadioGroup
                  coreStyle={{color: theme.colors.blue, fontSize: 16}}
                  RadioGroupStyle={{flexDirection: 'row'}}
                  getChecked={value => getChecked(value)}>
                  <Radio iconName={'lens'} label={'Female'} value={'Female'} />
                  <Radio iconName={'lens'} label={'Male'} value={'Male'} />
                  <Radio
                    iconName={'lens'}
                    label={'Prefer not to say'}
                    value={'Prefer not to say'}
                  />
                </RadioGroup>
              </View>
            </Item>
            {/* <View style={{marginLeft: 30, alignSelf: 'flex-start', zIndex: 1}}>
              <Text
                style={{
                  top: 15,
                  backgroundColor: 'white',
                  paddingLeft: 4,
                  color: theme.colors.blue,
                }}>
                Preferred Pronouns
              </Text>
            </View> */}
            {/* <Item style={styles.inputStyle} rounded>
              <View style={{width: '100%'}}>
                <Picker
                  style={styles.pickerStyle}
                  selectedValue={pronouns}
                  placeholder="Preferred pronouns"
                  mode="dropdown"
                  iosHeader="Select One"
                  iosIcon={
                    <Icon
                      name="arrow-down"
                      style={{color: theme.colors.blue}}
                    />
                  }
                  // selectedValue={school}

                  onValueChange={showPronouns.bind()}
                  value={'Select One'}>
                  <Picker.Item value="" label="Preferred pronouns" />
                  {pronounsList()}
                </Picker>
              </View>
            </Item> */}
          </Form>
          {/* <View style={{width: '100%'}} /> */}
      

          <View>
            <Error error={errorMessage} />
          </View>

          <Button
            style={[styles.buttonStyle, {marginBottom: 10}]}
            onPress={() => {
              // openModal()
            //   registered();
              validation()
              // pushDetails()
            }}>
            <Text style={styles.buttonTextStyle}>NEXT</Text>
          </Button>

          {/* FIRST MODAL */}
          <View>
            <Modal isVisible={modalVisible} style={styles.modalStyle}>
            <View style={{ flex: 1 }}>
                                <View style={{ backgroundColor: theme.colors.blue, height: 50, justifyContent: "center", borderRadius: 7 }}>
                                    {isFirstModal &&
                                        <Text style={{ textAlign: "center", color: 'white', fontSize: 18 }}>
                                            Location Permission
                                        </Text>
                                    }{
                                        isSecondModal &&


                                        <Text style={{ textAlign: "center", color: 'white', fontSize: 18 }}>
                                            Notification
                                        </Text>
                                    }
                                </View>
                                {isFirstModal &&
                                    <Text style={{ fontSize: 16, textAlign: "center", paddingHorizontal: 20, marginTop: 20 }}>
                                        Do you want to share your location with feeling trippy?
                                    </Text>

                                }

                                {isSecondModal && <Text style={{ fontSize: 16, textAlign: "center", paddingHorizontal: 20, marginTop: 20 }}>
                                    Do you want to receive notifications?
                                    </Text>

                                }

                                <View style={{ marginTop: '5%' }}>
                                    {isFirstModal &&
                                        <View>
                                            <Button
                                                style={styles.modalButtonStyle}
                                                onPress={() => {
                                                    modalUpdate()
                                                    setLocationPermission(1);
        
                                                }}
                                            >
                                                <Text style={styles.buttonTextStyle}>Yes</Text>
                                            </Button>
                                            <Button
                                                style={styles.modalButtonStyle}
                                                onPress={() => {
                                                    modalUpdate()
                                                    setLocationPermission(0);
                                                 

                                                }}
                                            >
                                                <Text style={styles.buttonTextStyle}>No</Text>
                                            </Button>
                                        </View>
                                    }
                                    {isSecondModal &&
                                        <View style={{ marginTop: '5%' }}>
                                            <Button
                                                style={styles.modalButtonStyle}
                                                onPress={() => {
                                                    // openSecondModal()
                                                    notificationPermission = '1'
                                                    // setNotifications(1)
                                                    closeModal()
                                                    // setTimeout(() => {
                                                    //     closeModal()
                                                    //   }, 3000);
                                                   
                                                   
                                                    
                                                    
                                                }}
                                            >
                                                <Text style={styles.buttonTextStyle}>Yes</Text>
                                            </Button>
                                            <Button
                                                style={styles.modalButtonStyle}
                                                onPress={() => {
                                                    // openSecondModal()
                                                    notificationPermission = '0'
                                                    // setNotifications(0)
                                                    closeModal()
                                                   
                                                   
                                                }}
                                            >
                                                <Text style={styles.buttonTextStyle}>No</Text>
                                            </Button>
                                        </View>
                                    }
                                </View>
                            </View>
              {/* <View 
              style={{flex: 1}}
              >
                <View
                  style={{
                    backgroundColor: theme.colors.purple,
                    height: 50,
                    justifyContent: 'center',
                    borderRadius: 7,
                  }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 18,
                      }}>
                      Location Permission
                    </Text>
               
                  {isSecondModal && (
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 18,
                      }}>
                      Notification
                    </Text>
                  )}
                </View>
                {isFirstModal && (
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      paddingHorizontal: 20,
                      marginTop: 20,
                    }}>
                    Do you want to share your location with Feeling Trippy?
                  </Text>
                )}
                {isSecondModal && (
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      paddingHorizontal: 20,
                      marginTop: 20,
                    }}>
                    Do you want to receive notifications?
                  </Text>
                )}
                <View style={{marginTop: '5%'}}>
                  {isFirstModal && (
                    <View>
                      <Button
                        style={styles.modalButtonStyle}
                        onPress={() => {
                          modalUpdate();
                          setLocationPermission(1);
                        }}>
                        <Text style={styles.buttonTextStyle}>Yes</Text>
                      </Button>
                      <Button
                        style={styles.modalButtonStyle}
                        onPress={() => {
                          modalUpdate();
                          setLocationPermission(0);
                        }}>
                        <Text style={styles.buttonTextStyle}>No</Text>
                      </Button>
                    </View>
                  )}
                  {isSecondModal && (
                    <View style={{marginTop: '5%'}}>
                      <Button
                        style={styles.modalButtonStyle}
                        onPress={() => {
                          // openSecondModal()
                          notificationPermission = '1';
                          // setNotifications(1)
                          closeModal();
                        }}>
                        <Text style={styles.buttonTextStyle}>Yes</Text>
                      </Button>
                      <Button
                        style={styles.modalButtonStyle}
                        onPress={() => {
                          // openSecondModal()
                          notificationPermission = '0';
                          // setNotifications(0)
                          closeModal();
                        }}>
                        <Text style={styles.buttonTextStyle}>No</Text>
                      </Button>
                    </View>
                  )}
                </View>
              </View> */}
            </Modal>
          </View>

          <Spinner visible={visible} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterTwo
const styles = StyleSheet.create({
  inputStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '87%',
    margin: 5,
    borderRadius: 5,
    alignSelf: 'center',
    borderWidth: 2,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '87%',
    borderRadius: 5,
    backgroundColor: theme.colors.blue,
    alignSelf: 'center',
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  pickerStyle: {

  },
  radioBtnStyle: {
    margin: 15,
  },
  modalButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: '#A040A0',
    alignSelf: 'center',
    height: 40,
  },
  modalStyle: {
    marginTop: 200,
    textAlign: 'center',
    backgroundColor: 'white',
    maxHeight: Dimensions.get('window').height / 2.7,
    borderRadius: 10,
  },


  ProfileImageStyle: {
    width: 150,
    height: 150,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 100,
    borderWidth: 4,
    borderColor: theme.colors.blue,
  
  },
  moreExtraStyle: {
    top: Platform.OS === 'ios' ? 13 : 0,
    paddingHorizontal: Platform.OS === 'ios' ? '7%' : 0,
  },
  cameraIconStyle:{
    alignSelf: 'center',
    backgroundColor: 'lightgrey',
    padding: 6,
    borderRadius: 20,
    justifyContent: 'center',
    top: 120,
    right: 120,
    position: 'absolute',
  }
});


