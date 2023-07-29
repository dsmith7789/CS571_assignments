import { Button, Image, Text, View, StyleSheet } from "react-native";
import BakeryOrderContext from "../contexts/BakeryOrderContext";
import { useContext } from "react";

export default function BadgerBakedGood(props) {

    const [cart, setCart] = useContext(BakeryOrderContext)

    const addItem = (item) => {
        if (cart[item] < props[3]) {
            setCart(oldCart => {
                return {
                    ...oldCart,
                    [item]: oldCart[item] + 1
                }
            })
        }
    }

    const removeItem = (item) => {
        if (cart[item] > 0) {
            setCart(oldCart => {
                return {
                    ...oldCart,
                    [item]: oldCart[item] - 1
                }
            })
        }
    }
    
    return <View>
        <Image
            style = {styles.pic} 
            source = {{uri: props[2]}}
        />
        <Text>{props[0]}</Text>
        <Text>${props[1].toFixed(2)}</Text>
        <Text>You can order up to {props[3]} units!</Text>
        <Button 
            disabled={cart[props[0]] === props[3]}
            onPress={() => addItem(props[0])} 
            title="+" 
        />
        <Text>{cart[props[0]]}</Text>
        <Button 
            disabled={cart[props[0]] === 0}
            onPress={() => removeItem(props[0])} 
            title="-" 
        />
    </View>

}

const styles = StyleSheet.create({
    pic: {
      width: 244,
      height: 244,
    },
});
