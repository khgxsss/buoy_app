import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ImageBackground } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import Theme from '../constants/Theme';
import { handleSignIn } from '../firebase/functions';
import { RootState } from '../redux/store';

const LoginComponent = () => {

    const user = useSelector((state:RootState) => state.auth.user);

    const dispatch = useDispatch();
    
    if (!user.uid) {
        return (
        <View style={styles.container}>
            <ImageBackground
            source={ require('../assets/images/startpage.png') }
            style={{height:'100%'}}>
            <View style={{ padding: 50,height:'100%', justifyContent:'center', marginTop:'40%'}}>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                handleSignIn(dispatch);
                }}
            >
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
        );
    } else{
        return (
        <></>
        );
    }
};

const styles = StyleSheet.create({
  container: {
  },
  buttonContainer: {
    backgroundColor: Theme.COLORS.SUCCESS,
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: Theme.COLORS.WHITE,
    fontSize: 20,
  },
});

export default LoginComponent;