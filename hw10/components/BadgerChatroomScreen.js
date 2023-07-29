import { useEffect, useState } from "react";
import { Alert, Button, Keyboard, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import BadgerChatMessage from "./BadgerChatMessage";
import * as SecureStore from 'expo-secure-store';

function BadgerChatroomScreen(props) {

    console.log(props)

    const [messages, setMessages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [myPostTitle, setMyPostTitle] = useState("");
    const [myPostContent, setMyPostContent] = useState("");

    function getMessages() {
        fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
            }
        }).then(res => res.json()).then(data => {
            setMessages(data.messages)
        })
    }

    function createPost() {
        SecureStore.getItemAsync("jwt").then(jwt => {
            console.log("the jwt is: ", jwt)
            const authString = "Bearer " + jwt
            console.log("the auth string is: ", authString)
            fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
                method: "POST",
                headers: {
                    "X-CS571-ID": "bid_81b3bf23169ffb1c0d94",
                    "Authorization": "Bearer " + jwt,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: myPostTitle,
                    content: myPostContent
                })
            }).then(res => {
                if (res.status === 400) {
                    Alert.alert("Message not posted!", "Please enter both post title and content!");
                    return null;
                } else if (res.status === 401) {
                    Alert.alert("Message not posted!", "You must be logged in to make a post!");
                    return null;
                } else if (res.status === 404) {
                    Alert.alert("Message not posted!", "Invalid Chatroom!")
                    return null;
                } else if (res.status === 413) {
                    Alert.alert("Message not posted!", "Your title or content is too long!")
                } else if (res.status === 200) {
                    Alert.alert("Message posted!","Your message was successfully posted!");   
                    return res.json();
                }
            }).then(data => {
                getMessages()
                console.log(data)
            })
        });
        
    }

    useEffect(() => {
        getMessages();
    }, [])

    console.log("Am I a Guest? ", props.isGuest)

    return <View style={{ flex: 1 }}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.sectionTitleStyle}>Title</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Post Title'
                        clearTextOnFocus
                        onChangeText={text => setMyPostTitle(text)}
                        value={myPostTitle}
                        onSubmitEditing={Keyboard.dismiss}
                    />
                    <Text style={styles.sectionTitleStyle}>Content</Text>
                    <TextInput
                        style={styles.contentInput}
                        placeholder='Post Content'
                        clearTextOnFocus
                        onChangeText={text => setMyPostContent(text)}
                        value={myPostContent}
                        onSubmitEditing={Keyboard.dismiss}
                    />
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => {
                            createPost() 
                            setModalVisible(false)
                        }}
                    >
                        <Text style={styles.textStyle}>Create Post</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setMyPostContent("")
                            setMyPostTitle("")
                            setModalVisible(false)
                        }}
                    >
                        <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
        <ScrollView>
            {
                messages.map(message => {
                    return <BadgerChatMessage key={message.id} {...message}></BadgerChatMessage>
                })
            }
        </ScrollView>
        {
            props.isGuest === true ?
            <></>
            :
            <Button color="crimson" title="Create Post" onPress={() => {
                setModalVisible(true)
                getMessages()
            }}/>
              
        }
        <Button color="grey" title="Refresh" onPress={() => {
            Alert.alert("Posts Refreshed!")
            getMessages()
        }} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        margin: 5,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: 'deepskyblue',
    },
    buttonClose: {
        backgroundColor: 'red',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    textInput: {
        height: 35,
        width: 200,
        borderColor: 'gray',
        borderWidth: 0.5,
        padding: 4,
    },
    contentInput: {
        height: 100,
        width: 200,
        borderColor: 'gray',
        borderWidth: 0.5,
        padding: 4,
        margin: 5
    },
    sectionTitleStyle : {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 10,
    }
});

export default BadgerChatroomScreen;