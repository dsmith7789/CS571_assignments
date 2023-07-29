    import { Image, StyleSheet, View, Text} from 'react-native'

    import { useNavigation } from "@react-navigation/native";

    import BadgerCard from "./BadgerCard.js";

    function BadgerNewsItemCard(props) {

        const navigation = useNavigation();

        function handlePress() {
            console.log("Pushing props: ", props)
            navigation.push('Article', props);
        }

        return (
            <BadgerCard onPress={handlePress} style={{ marginTop: 8, marginLeft: 8, marginRight: 8 }}>
                <View style={[styles.card, props.style]}>
                    {props.children}
                    <Image
                        style = {styles.pic} 
                        source = {{uri: props.img}}
                    />
                    <Text style={{ fontSize: 24}}>{props.title}</Text>
                </View>
            </BadgerCard>
        );
    }

    export default BadgerNewsItemCard;

    const styles = StyleSheet.create({
        pic: {
            width: 244,
            height: 244,
        },
        card: {
            padding: 16,
            elevation: 5,
            borderRadius: 10,
            backgroundColor: 'white'
        }
    })
