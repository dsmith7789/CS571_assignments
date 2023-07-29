import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

function BadgerRegisterScreen(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("")

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
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
        <Text style={{ fontSize: 14, margin: 5}}>Confirm Password</Text>
        <TextInput
            style={styles.textInput}
            placeholder='Confirm Password'
            clearTextOnFocus
            secureTextEntry={true}
            onChangeText={text => setRepeatPassword(text)}
            value={repeatPassword}
        />
        <Button color="crimson" title="Signup" onPress={() => {
            if (password !== repeatPassword) {
                Alert.alert("Passwords do not match!", "Please make sure your passwords match.")
            } else {
                props.handleSignup(username, password)
            }
        }} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
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

export default BadgerRegisterScreen;