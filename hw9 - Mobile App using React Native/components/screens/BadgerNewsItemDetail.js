import { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, View, Text} from 'react-native'


function BadgerNewsItem(props) {

    const [content, setContent] = useState([])

    // below taken from FindMyBadgers Animated - React Native 2 Lecture
    const op = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.parallel([
        Animated.timing(op, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: false
        })
        ]).start()
    }, [])

    useEffect(() => {
        const url = "https://www.cs571.org/s23/hw9/api/news/articles/" + props.route.params.id
        console.log("fetching url: ", url)
        console.log("props passed: ", props.route.params)
        fetch(url, {
            headers: {
                "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setContent(data.body)
        })
    }, [])

  return (
    <View>
        <ScrollView>
            <Image
                style = {styles.pic} 
                source = {{uri: props.route.params.img}}
            />
            <Text style={{ fontSize: 24}}>{props.route.params.title}</Text>
            {
                content.length === 0 ?
                <Text>Please wait while your article loads...</Text>:
                <Animated.View style={{opacity: op}}>
                    <Text>{content}</Text>
                </Animated.View>
            }
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    pic: {
        width: 244,
        height: 244,
    }
})

export default BadgerNewsItem;