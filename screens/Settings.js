import { useLayoutEffect, useState } from 'react';
import React from 'react';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';
import AppButton from '../components/AppButton';
import { auth } from '../firebase';
import {signOut} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

export default function Settings({navigation}){
  

    
    const handleSignOut =async () =>{
        await signOut(auth).then(() => {
          navigation.replace('Login')
      })
    
      }
      async function scheduleNotification() {
        await Notifications.requestPermissionsAsync().then((permission) => {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "💧 Water Reminder",
              subtitle: "Your body needs water!",
            },
            trigger: {
              repeats: true,
              seconds: 5,
            },
          });
        });
      }  
    return (
        <View style={styles.container}>
          <Text>Email: {auth.currentUser?.email}</Text>
          <AppButton title='SignOut' textStyle={{borderRadius:10,width:'60%',padding:15,fontSize:15,color:'black',backgroundColor:'#74ccf4',marginTop:10,fontSize:22}} onPress={handleSignOut} />
        
          <TouchableOpacity
          style={[
            styles.notificationButton,
            {
              backgroundColor: "#74ccf4",
            },
          ]}
          onPress={() => scheduleNotification()}
        >
          <Text style={styles.notificationText}>Schedule Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.notificationButton,
            {
              backgroundColor: "red",
            },
          ]}
          onPress={() => Notifications.cancelAllScheduledNotificationsAsync()}
        >
          <Text style={styles.notificationText}>Cancel Notifications</Text>
        </TouchableOpacity>
        </View>
        
      );

}

const styles = StyleSheet.create({container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  notificationButton: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    padding: 5,
    marginTop:20,
  },
  notificationText: { color: "black", fontWeight: "500", fontSize: 25 },
});


