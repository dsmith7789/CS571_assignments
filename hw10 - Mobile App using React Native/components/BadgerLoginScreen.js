import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

function BadgerLoginScreen(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <Text style={{ fontSize: 14, margin: 5}}>Username</Text>
        <TextInput
            style={styles.textInput}
            placeholder='Username'
            clearTextOnFocus
            onChangeText={text => setUsername(text)}
            value={username}
        />
        <Text style={{ fontSize: 14, margin: 5}}>Password</Text>
        <TextInput
            style={styles.textInput}
            placeholder='Password'
            clearTextOnFocus
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
        />
        <Button color="crimson" title="Login" onPress={() => {
            props.handleLogin(username, password)
        }} />
        <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
        <Button color="grey" title="Continue as Guest" onPress={() => {
            props.setIsGuest(true)
            console.log("Setting as Guest")
        }}/>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        height: 35,
        width: 150,
        borderColor: 'gray',
        borderWidth: 0.5,
        padding: 4,
    },
});

export default BadgerLoginScreen;