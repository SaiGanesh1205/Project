import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,Image } from 'react-native'
import React, { useState,useEffect } from 'react'
import AppButton from '../components/AppButton';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithCredential, GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const Login = ({navigation}) => {
    const[email,setEmail]= useState('')
    const[password,setPassword]= useState('')
    const[error,setError]= useState('')


    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth,user=>{
            if (user){
                navigation.replace("Home")
            }
        })
        return unsubscribe
    })
    useEffect(() => {
      
        setEmail("");
        setPassword("");
    }, [error]);
    
    const errorMessage = (error) => {
        console.log(error.message)

        let errorMessage;

        switch (error.code) {
            case "auth/user-not-found":
                errorMessage = 'Account not found, Create a new account to continue'
                setError(errorMessage)
                alert(errorMessage)
                break;
            case 'auth/email-already-in-use':
                errorMessage = 'Email associated with a account'
                setError(errorMessage)
                alert(errorMessage)
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid Email'
                setError(errorMessage)
                alert(errorMessage)
                break;
            case 'auth/wrong-password':
                errorMessage = 'Wrong Password'
                setError(errorMessage)
                alert(errorMessage)
                break;
            case "auth/user-disabled":
                errorMessage = 'Account is disabled'
                setError(errorMessage)
                alert(errorMessage)
                break;
            default:
                errorMessage = 'password should be atleast 6 characters!!'
                setError(errorMessage)
                alert(errorMessage)
                break;
        }
    }

    const handleSignup = () => {
        if (!email || !password) {
            return alert('Fill all the details')
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Registered with", user.email)
               
            })
            .catch((err) => {
                errorMessage(err)
            });
    }
    const handlelogin = ()=>{
        
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log("logged in  with:", user.email)
           
        })
        .catch((err) => {
            errorMessage(err)
        });
    }
    return (
        
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
            <View style={styles.inputContainer}>
            <Image source={require('../assets/HydrOMI.png')} 
              style={{width: '90%', height: '20%',marginTop:50}}
            />
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                
            </View>
            <View>
                
                    <AppButton title='Login' textStyle={{borderRadius:10,width:'80%',padding:15,fontSize:25,color:'white',backgroundColor:'#2E8BC0'}} onPress={handlelogin} />
                

              
                    <AppButton title='Register'textStyle={{borderRadius:10,width:'100%',padding:15,fontSize:25,color:'white',backgroundColor:'#2E8BC0'}} onPress={handleSignup} />
               
            </View>

        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3EB6D8',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width:'80%'
    
},
    input:{
        backgroundColor:'white',
        paddingHorizontal: 15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
    },
})