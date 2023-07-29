
// Keep this here!
import 'react-native-gesture-handler';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BadgerLoginScreen from './components/BadgerLoginScreen';

import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import BadgerLandingScreen from './components/BadgerLandingScreen';
import BadgerChatroomScreen from './components/BadgerChatroomScreen';
import BadgerRegisterScreen from './components/BadgerRegisterScreen';
import { Alert, StyleSheet} from 'react-native';
import BadgerLogoutScreen from './components/BadgerLogoutScreen';
import BadgerConversionScreen from './components/BadgerConversionScreen';


const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    // hmm... maybe I should load the chatroom names here
    fetch("https://cs571.org/s23/hw10/api/chatroom", {
      headers: {
        "X-CS571-ID": "bid_81b3bf23169ffb1c0d94",
      }
    }).then(res => res.json()).then(json => {
      setChatrooms(json)
    })
  }, []);

  function handleLogout() {
    console.log("Did this happen??")
    SecureStore.deleteItemAsync("jwt")
    Alert.alert("Logout Successful!", "You have been logged out.")
    setIsLoggedIn(false)
    setIsRegistering(false)
  }

  function handleConversion() {
    setIsGuest(false)
    setIsRegistering(true)
  }

  function handleLogin(username, password) {
    // hmm... maybe this is helpful!
    fetch("https://cs571.org/s23/hw10/api/login", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_81b3bf23169ffb1c0d94",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
    })
    }).then(res => {
      if (res.status === 400) {
          Alert.alert("Please enter both a username and password!");
          return null;
      } else if (res.status === 401) {
          Alert.alert("Incorrect password!");
          return null;
      } else if (res.status === 404) {
          Alert.alert("That user does not exist!")
          return null;
      } else if (res.status === 200) {
          Alert.alert("Successfully logged in!");   
          return res.json();
      }
    }).then(data => {
        if (data) {
          console.log("Received back...")
          console.log(data)
          SecureStore.setItemAsync("jwt", data.token)
          setIsLoggedIn(true);
        }
    }).catch(e => {
      Alert.alert("An error occurred while making the request.")
    })
  }

  function handleSignup(username, password) {
    // hmm... maybe this is helpful!
    fetch("https://cs571.org/s23/hw10/api/register", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_81b3bf23169ffb1c0d94",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => {
      if (res.status === 400) {
          Alert.alert("Please enter both a username and password!");
          return null;
      } else if (res.status === 409) {
          Alert.alert("That user already exists!");
          return null;
      } else if (res.status === 413) {
          Alert.alert("Your username or password is too long!")
          return null;
      } else if (res.status === 200) {
        Alert.alert("Successfully registered!");   
        return res.json();
      }
    }).then(data => {
      if (data) {
        console.log("Received back...")
        console.log(data)
        SecureStore.setItemAsync("jwt", data.token)
        // begin for quiz
        const result = SecureStore.getItemAsync("jwt");
        console.log("Result is a: ", typeof(result))
        console.log(result);
        // end for quiz
        setIsLoggedIn(true);
      }
    }).catch(e => {
      Alert.alert("An error occurred while making the request.")
    })
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom}/>}
              </ChatDrawer.Screen>
            })
          }
          <ChatDrawer.Screen name="Logout" options={{drawerItemStyle: styles.logoutLabel}}>
            {(props) => <BadgerLogoutScreen handleLogout={handleLogout}/>}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isGuest) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} isGuest={isGuest}/>}
              </ChatDrawer.Screen>
            })
          }
          <ChatDrawer.Screen name="Signup" options={{drawerItemStyle: styles.logoutLabel}}>
            {(props) => <BadgerConversionScreen handleConversion={handleConversion}/>}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  }
  else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} setIsGuest={setIsGuest}/>
  }
}

const styles = StyleSheet.create({
  logoutLabel: {
    backgroundColor: '#c6cbef'
  },
});


