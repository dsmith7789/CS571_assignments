import { Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const BadgerNewsTabs = createBottomTabNavigator();

//import TEST from 'hw9-dsmith7789/components/navigation/BadgerTabs.js'

//import BadgerNewsScreen from 'hw9-dsmith7789/components/screens/BadgerNewsScreen.js'
//import BadgerPreferencesScreen from '../components/screens/BadgerPreferencesScreen'

// import BadgerNewsScreen from '../screens/BadgerNewsScreen.js' // this worked before
import BadgerPreferencesScreen from '../screens/BadgerPreferencesScreen.js'
import ArticleStack from "./ArticleStack.js";
import { Ionicons } from '@expo/vector-icons';;

function BadgerTabs(props) {
    return (
        <BadgerNewsTabs.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'News') {
                iconName = focused ? 'newspaper' : 'newspaper-outline';
              } else {
                iconName = focused ? 'settings' : 'settings-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
            <BadgerNewsTabs.Screen name="News" component={ArticleStack}/>
            <BadgerNewsTabs.Screen name="Preferences" component={BadgerPreferencesScreen}/>
        </BadgerNewsTabs.Navigator>
      );
}

export default BadgerTabs;