//import liraries
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ImageBackground,
    TextInput, TouchableOpacity, Image, Animated,
    Dimensions, Keyboard, Platform
} from 'react-native';
import { Icon } from "native-base";
import * as Animatable from "react-native-animatable";
// create a component
const SCREEN_HEIGHT = Dimensions.get('window').height;
class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(){
        super()

        this.state={
            placeholder: 'Enter your mobile number'
        }
    }
    componentWillMount() {
        this.loginHeight = new Animated.Value(150);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);

        this.keyboardHeight = new Animated.Value(0);
        this.forwordArrowOpacity = new Animated.Value(0);
        this.borderBottomWidth = new Animated.Value(0);
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow = (event) => {
        console.log('Keyboard Shown');
        // alert('Shown');
        if (Platform.OS == 'android') {
            duration = 100;
        } else {
            duration = event.duration;
        }
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                toValue: 10,
                duration: duration + 100
            }),
            Animated.timing(this.forwordArrowOpacity, {
                duration: duration+500,
                toValue: 1
            }),
            Animated.timing(this.borderBottomWidth, {
                duration: duration,
                toValue: 1
            })
        ]).start();
    }

    _keyboardDidHide=(event)=> {
        if (Platform.OS == 'android') {
            duration = 200;
        } else {
            duration = event.duration;
        }
        this.setState({
            placeholder: 'Enter your mobile number'
        })
        // Animated.timing(this.loginHeight, {
        //     toValue: 150,
        //     duration: duration
        // }).start();
        Animated.parallel([
            Animated.timing(this.loginHeight, {
                toValue: 150,
                duration: duration
            }),
            Animated.timing(this.keyboardHeight, {
                toValue: 0,
                duration: duration
            }),
            Animated.timing(this.forwordArrowOpacity, {
                duration: duration,
                toValue: 0
            }),
            Animated.timing(this.borderBottomWidth, {
                duration: duration,
                toValue: 0
            })
        ]).start(()=>{
            this.refs.textInputMobile.blur(); 
        });
           
        // alert(duration);
    }
    decreaseHeightOfLogin = () => {
        Keyboard.dismiss();
    }
    increaseHeightOfLogin = () => {
        // alert('hi');
        this.setState({
            placeholder:'9860345633'
        })
        Animated.timing(this.loginHeight, {
            toValue: SCREEN_HEIGHT,
            duration: 500
        }).start(() => {
            this.refs.textInputMobile.focus();
        });
    }
    render() {
        const headerTextOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [1, 0]
        });
        const marginTop = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [25, 50]
        });
        const marginTopTouchable = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [25, 80]
        });
        const headerBackArrowOpacity = this.loginHeight.interpolate({
            inputRange: [SCREEN_HEIGHT - 100, SCREEN_HEIGHT],
            outputRange: [0, 1]
        });
        const titleTextBottom = this.loginHeight.interpolate({
            inputRange: [150, 400,SCREEN_HEIGHT],
            outputRange: [0,0, 100]
        });
        const titleTextLeft = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [100, 25]
        });
        const titleTextOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [0, 1]
        });
        // console.log('headerTextOpacity: ', headerBackArrowOpacity);
        // console.log('titleTextLeft: ', titleTextLeft);
        return (
            <View style={styles.container}>
                {/* back arrow button start */}
                <Animated.View style={{
                    position: 'absolute',
                    height: 60, width: 60,
                    top: 20, left: 20,
                    zIndex: 100,
                    opacity: headerBackArrowOpacity
                }}>
                    <TouchableOpacity
                        onPress={() => this.decreaseHeightOfLogin()}>
                        <Icon name="md-arrow-back" style={{ color: 'black' }} />
                    </TouchableOpacity>
                </Animated.View>
                {/* back arrow button end */}

                {/* forword arrow button start */}
                <Animated.View style={{
                    position: 'absolute',
                    bottom: this.keyboardHeight, right: 10,
                    height: 60, width: 60,
                    zIndex: 100, borderRadius: 30,
                    backgroundColor: '#54575e',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: this.forwordArrowOpacity,
                }}>
                    <TouchableOpacity>
                        <Icon name="md-arrow-forward" style={{ color: 'white' }} />
                    </TouchableOpacity>
                </Animated.View>
                {/* forword arrow button end */}

                <ImageBackground
                    source={require('../assets/images/bg.jpg')}
                    style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Animatable.View
                            animation="zoomIn"
                            iterationCount={1}
                            style={{ backgroundColor: 'white', width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Easyway</Text>
                        </Animatable.View>
                    </View>

                    {/* Bottom Half */}
                    <Animatable.View
                        animation="slideInUp"
                        iterationCount={1}>
                        <Animated.View style={{
                            height: this.loginHeight,
                            backgroundColor: 'white'
                        }}>
                            <Animated.View style={{
                                opacity: headerTextOpacity,//animate later
                                marginTop: marginTop,//animate later
                                alignItems: 'flex-start', paddingHorizontal: 25,
                            }}>
                                <Text style={{
                                    fontSize: 22
                                }}>Get Moving With Easyway</Text>
                            </Animated.View>
                            <TouchableOpacity
                                onPress={() => this.increaseHeightOfLogin()}>
                                <Animated.View
                                    style={{
                                        marginTop: marginTopTouchable,//animate later
                                        paddingHorizontal: 25,
                                        flexDirection: 'row'
                                    }}>
                                    <Animated.Text style={{
                                        fontSize:20,
                                        opacity:titleTextOpacity,
                                        position:'absolute',
                                        bottom:titleTextBottom,
                                        left:titleTextLeft,

                                    }}>
                                        Enter your mobile number
                                    </Animated.Text>
                                    <Image source={require('../assets/images/flag.png')}
                                        style={{ width: 24, height: 24, resizeMode: 'contain' }} />
                                    <Animated.View
                                        pointerEvents="none"
                                        style={{ flexDirection: 'row', flex: 1, borderBottomWidth: this.borderBottomWidth }}
                                    >
                                        <Text style={{ fontSize: 20, paddingLeft: 10 }}>+91
                    </Text>
                                        <TextInput
                                            ref="textInputMobile"
                                            style={{ flex: 1, fontSize: 20, paddingTop: 0 }}
                                            placeholder={this.state.placeholder}
                                            underlineColorAndroid="transparent" 
                                            keyboardType='numeric' />
                                    </Animated.View>
                                </Animated.View>
                            </TouchableOpacity>
                        </Animated.View>

                        {/* connect with social view */}
                        <View style={{ height: 70, backgroundColor: 'white', justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 25, borderTopColor: '#e8e8ec', borderTopWidth: 1 }}>
                            <Text style={{ color: '#5a7fdf', fontWeight: 'bold' }}>
                                or connect using a social account
              </Text>
                        </View>
                    </Animatable.View>
                </ImageBackground>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default LoginScreen;
