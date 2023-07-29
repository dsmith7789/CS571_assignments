import { Text, View, Button, Alert } from "react-native";
import BadgerBakedGood from "./BadgerBakedGood";
import { useEffect, useState } from "react";
import BakeryOrderContext from "../contexts/BakeryOrderContext";

export default function BadgerBakery() {

    const [bakedGoods, setBakedGoods] = useState([]);
    const [index, setIndex] = useState(0);
    const [cart, setCart] = useState({})
    const [orderTotal, setOrderTotal] = useState(0);

    // set up cart
    function initializeCart() {
        fetch("https://www.cs571.org/s23/hw8/api/bakery/items", {
            headers: {
                "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
            }
        })
        .then(res => res.json())
        .then(data => {
            for (const k of Object.keys(data)) {
                console.log("object", k)
                setCart(oldCart => {
                    return {
                        ...oldCart,
                        [k]: 0
                    }
                })
                console.log(cart)
            }
        })
    }

    // set up display of baked goods
    useEffect(() => {
        initializeCart()
        fetch("https://www.cs571.org/s23/hw8/api/bakery/items", {
            headers: {
                "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
            }
        })
        .then(res => res.json())
        .then(data => {
            collection = []           
            for (const [k, v] of Object.entries(data)) {
                console.log(k)
                const good = [k]
                for (const val of Object.values(v)) {
                    console.log(val)
                    good.push(val)
                }
                collection.push(good)
            }
            setBakedGoods(collection)
        })
    }, []);

    // handle totaling the order
    useEffect(() => {
        setOrderTotal(bakedGoods.reduce((total, bakeryItemInfo) => {
            item = bakeryItemInfo[0]
            count = cart[item]
            price = bakeryItemInfo[1]
            console.log("item = ", item, "; count = ", count, "; price = ", price)
            return total + (count * price)
        }, 0))
    }, [cart])

    const advancePage = () => {
        setIndex((oldIndex) => ((oldIndex + 1) % bakedGoods.length) )
    }

    const backPage = () => {
        setIndex((oldIndex) => (((oldIndex - 1) % bakedGoods.length) + bakedGoods.length) % bakedGoods.length )
    }

    const placeOrder = () => {
        totalItems = Object.values(cart).reduce((count, current) => count + current)
        if (totalItems === 0) {
            Alert.alert("You don't have any items in your cart!", "You need to select some items before you can place an order!")
        } else {
            // POST the order 
            fetch("https://www.cs571.org/s23/hw8/api/bakery/order", {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_81b3bf23169ffb1c0d94",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cart)
            }).then(res => {
                if (res.status === 200) {
                    Alert.alert("Success!", "Successfully placed order.");
                    initializeCart();
                } else if (res.status === 400) {
                    Alert.alert("Error!", "You tried to place an invalid order.");
                } else if (res.status === 413) {
                    Alert.alert("Error!", "You tried to order an invalid number of items.");
                }
                return res.json();
            }).then(json => {
                console.log("Received back...");
                console.log(json);
            }).catch(e => {
                Alert.alert("Something went wrong!", "An error occurred while making the request.")
            })
        }
    }

    console.log("cart", cart)
    console.log("order total", orderTotal)
    console.log("baked goods = ", bakedGoods)

    return (
    <View style={{ flex: 1 }}>

        <View style={{ paddingTop: 100 }}>
            <Text>Welcome to Badger Bakery!</Text>
            <Button 
                onPress={backPage} 
                disabled={index === 0}
                title="Previous" 
            />
            <Button 
                onPress={advancePage} 
                disabled ={index === (bakedGoods.length - 1)}
                title="Next" 
            />
        </View>

        <View>
            {
                bakedGoods.length === 0 ? 
                <Text>Loading...</Text> : 
                <BakeryOrderContext.Provider value={[cart, setCart]}>
                    <BadgerBakedGood 
                        key={bakedGoods[index][0]} 
                        {...bakedGoods[index]}
                    />  
                </BakeryOrderContext.Provider>
                       
            }
            <Text>Order Total: ${orderTotal.toFixed(2)}</Text>
            <Button onPress={placeOrder} title="Place Order" />
        </View>
        
    </View>
    )
}
