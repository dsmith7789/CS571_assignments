import { useEffect, useState, useContext } from "react";

import { Text, View, ScrollView } from "react-native";
import BadgerPreferencesContext from "../../contexts/BadgerPreferencesContext.js";
import BadgerNewsItemCard from "../BadgerNewsItemCard.js";

function BadgerNewsScreen(props) {

    const [articles, setArticles] = useState([]);
    const [prefs, setPrefs] = useContext(BadgerPreferencesContext)
    const [tagsToHide, setTagsToHide] = useState([])

    useEffect(() => {
        setTagsToHide(Object.keys(prefs).reduce((accumulator, currentValue) => {
            if (prefs[currentValue] === false) {
                return [...accumulator, currentValue]
            }
            return accumulator
        }, []))
    }, [prefs])

    console.log("Hiding articles with tags: ", tagsToHide)

    // get the article data
    useEffect(() => {
        fetch("https://www.cs571.org/s23/hw9/api/news/articles", {
            headers: {
                "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setArticles(data)
        })
    }, []);

    return (
    <View>
        <ScrollView>
            {
                articles.filter(article => article.tags.some(element => tagsToHide.includes(element)) === false).length > 0 ?
                articles
                .filter(article => article.tags.some(element => tagsToHide.includes(element)) === false)
                .map(article => <BadgerNewsItemCard key = {article.id} {...article}/>)

                :

                <Text style={{ fontSize: 36, textAlign: 'center' }}>Your preferences are filtering out all articles!</Text>

            }
        </ScrollView>
    </View>
    )
}

export default BadgerNewsScreen;