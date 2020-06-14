import React, { Component } from 'react';
import { Text, View, TouchableOpacity, CameraRoll, TextInput, StyleSheet, PermissionsAndroid, ToastAndroid, ProgressBarAndroid, FlatList, Dimensions, KeyboardAvoidingView, SafeAreaView, Platform, TouchableHighlightBase } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RNFetchBlob from 'rn-fetch-blob';
import Image from 'react-native-image-progress';
//  import ProgressBar from 'react-native-progress/Bar';
import theme from '../../src/utils/theme';




export default class MessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            loading: false
        }
    }
    actualDownload2(item) {
        this.setState({ loading: false })
        var date = new Date();
        const { dirs: { MainBundleDir, PictureDir } } = RNFetchBlob.fs;
        const { config } = RNFetchBlob;
        const isIOS = Platform.OS === 'ios';
        const aPath = Platform.select({ ios: MainBundleDir, android: PictureDir })
        var image_URl = item;
        var ext = 'png'
        var file_ex = '.jpeg'
        const fPath = `${aPath}/${file_ex}`;
        console.log('fPath', fPath)
        const configOptions = Platform.select({
            ios: {
                fileCache: true,
                path: aPath + Math.floor(date.getTime()
                    + date.getSeconds() / 2) + file_ex,
                appendExt: ext,

            },
            android: {

                fileCache: false,
                appendExt: ext,
                addAndroidDownloads: {
                    notification: true,
                    useDownloadManager: true,
                    path: aPath + Math.floor(date.getTime()
                        + date.getSeconds() / 2) + file_ex,
                    description: 'image'
                }
            },
        });
        if (isIOS) {
            this.setState({ loading: true, progress: 0 })
            RNFetchBlob.config(configOptions)
                .fetch('GET', image_URl)
                .then((res) => {
                    console.log("file", res.path())

                    RNFetchBlob.ios.previewDocument("file://" + res.path())
                });
            return;

        } else {
            this.setState({ loading: true })
            config((configOptions)).
                fetch("GET", image_URl)
                .progress((received, total) => {
                    console.log("progress ", received / total);
                    this.setState({ progress: received / total });

                })
                .then((res) => {
                    console.log('file download ', res)
                    this.setState({ loading: false, progress: 100, })
                    RNFetchBlob.android.actionViewIntent(res.path())
                })
                .catch((errorMessage, statusCode) => {
                    this.setState({
                        loading: false
                    })
                    console.log(errorMessage)
                })
        }


    }
    actualDownload = (item) => {
        this.setState({
            progress: 0,
            loading: true
        });
        var date = new Date();


        let PictureDir = RNFetchBlob.fs.dirs.PictureDir
        RNFetchBlob.config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            path: PictureDir + "/image_" + Math.floor(date.getTime()
                + date.getSeconds() / 2) + ".jpeg",
            fileCache: true
        })
            .fetch(
                "GET",
                item,
                {
                    //some headers ..
                }
            )
            .progress((received, total) => {
                console.log("progress", received / total);
                this.setState({ progress: received / total });
            })
            .then(res => {
                this.setState({
                    progress: 100,
                    loading: false
                });

            });
    };
    async downloadFile(item) {
        console.log('item', item)
        try {

            const granted = await PermissionsAndroid.request(

                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Storage Permission",
                    message: "App needs access to memory to download the file "
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.actualDownload(item);
            } else {
                Alert.alert(
                    "Permission Denied!",
                    "You need to give storage permission to download the file"
                );
            }
        } catch (err) {
            console.warn(err);
        }
    }
    renderSeen(item) {

        if (item.read === true) {
            return (


                <Text style={{ fontSize: 10, alignSelf: "flex-end", color: '#FFF' }}>Seen</Text>
            );
        }
    }
    render() {
        if (this.props.uid === this.props.item.senderuid) {
            if (this.props.item.text !== 'image') {
                return (
                    <View >
                        <Text style={styles.timeViewEnd}> {this.props.item.time}</Text>
                        <LinearGradient colors={['#FFF', '#FFF']} style={styles.msgViewSender}>
                            <Text style={{ color: 'white', fontSize: 16 }} >{this.props.item.text}</Text>
                            {this.renderSeen(this.props.item)}
                        </LinearGradient>

                    </View>
                );
            }
            else {


                return (

                    <View>
                        <Text style={styles.timeViewEnd}>{this.props.item.time}</Text>
                        <View style={styles.imgViewSender}>
                            <View >
                                <TouchableOpacity style={{ borderRadius: 8, height: 300 }} onLongPress={() => this.actualDownload2(this.props.item.url)}>

                                    <Image
                                        resizeMode={"cover"}
                                        source={{
                                            uri: this.props.item.url !== '' || this.props.item.url !== undefined || this.props.item.url !== null ? this.props.item.url : ''
                                        }}
                                        imageStyle={{
                                            borderRadius: 8,
                                            height: "100%", width: 200,
                                        }}
                                        style={{ height: "100%", borderRadius: 20, width: 200 }}
                                        indicator={this.state.loading}
                                        indicatorProps={{

                                            size: 80,
                                            borderWidth: 0,
                                            color: theme.colors.blue,
                                            unfilledColor: 'rgba(200, 200, 200, 0.2)'
                                        }}


                                    />

                                </TouchableOpacity>
                                {this.state.loading ? (
                                    <ProgressBarAndroid
                                        styleAttr="Small"
                                        indeterminate={false}
                                        progress={this.state.progress}
                                    />
                                ) : null}
                                {this.renderSeen(this.props.item)}
                            </View>





                        </View>

                    </View>
                );

            }


        }
        if (uid === this.props.item.Reciever) {
            if (this.props.item.text !== 'image') {
                return (

                    <View>
                        <Text style={styles.timeViewStart}>{this.props.item.time}</Text>
                        <View style={styles.msgViewRec}>

                            <Text style={{ fontSize: 16, color: '#63697B' }}>{this.props.item.text}</Text>


                        </View>

                    </View>
                );
            }
            else {
                return (

                    <View >
                        <Text style={styles.timeViewStart}>{this.props.item.time}</Text>
                        <View style={styles.imgViewRec}>

                            <TouchableOpacity style={{ borderRadius: 8, height: 300, width: 200 }} onLongPress={() => this.actualDownload2(this.props.item.url)}>
                                <Image
                                    resizeMode={"cover"}
                                    imageStyle={{
                                        borderRadius: 8,
                                        height: "100%", width: 200,
                                    }}
                                    style={{ height: "100%", borderRadius: 20, width: 200 }}
                                    source={{
                                        uri: this.props.item.url,
                                    }}
                                    indicator={this.state.loading}
                                    indicatorProps={{
                                        size: 60,
                                        borderWidth: 0,
                                        color: theme.colors.blue,
                                        unfilledColor: 'rgba(200, 200, 200, 0.2)'
                                    }}
                                />

                                {() => { this.props.renderSeen(this.props.item) }}
                            </TouchableOpacity>



                        </View>

                    </View>

                );
            }
        }

    }

};
const styles = StyleSheet.create({
    timeViewEnd: {
        marginTop: 4,
        fontSize: 12,
        alignSelf: "flex-end",
        color: 'black',
        transform: [{ scaleY: -1 }],
    },
    timeViewStart: {
        marginTop: 4,
        fontSize: 12,
        alignSelf: "flex-start",
        color: 'black',
        transform: [{ scaleY: -1 }],
    },
    imgViewRec: {
        transform: [{ scaleY: -1 }],
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        padding: 10,
        marginTop: 10,
        borderRadius: 12,
        borderBottomEndRadius: -0,
        borderTopRightRadius: 12
    },
    msgViewRec: {
        transform: [{ scaleY: -1 }],
        borderWidth: 1,
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        backgroundColor: '#EAECF2',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        borderColor: 'black',
        borderBottomLeftRadius: -0,
        borderTopLeftRadius: 12

    },
    msgViewSender: {
        transform: [{ scaleY: -1 }],
        alignItems: 'flex-start'
        , alignSelf: 'flex-end',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
       borderBottomRightRadius:-0,
       
        borderTopRightRadius: 12
    },
    imgViewSender: {
        transform: [{ scaleY: -1 }],
        alignItems: 'flex-start'
        , alignSelf: 'flex-end',
        padding: 10,
        marginTop: 10,
        borderRadius: 12,
        borderBottomEndRadius: -0,
        borderTopRightRadius: 12
    }


})