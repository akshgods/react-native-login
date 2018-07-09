//import liraries
import React, { Component } from 'react';
import { StackNavigator } from "react-navigation";
import LoginScreen from "./LoginScreen";

//make this component available to the app
export default StackNavigator({
    Login: LoginScreen,
});
