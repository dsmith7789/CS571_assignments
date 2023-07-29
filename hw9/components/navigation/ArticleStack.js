import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BadgerNewsScreen from '../screens/BadgerNewsScreen.js';
import BadgerNewsItemDetail from '../screens/BadgerNewsItemDetail.js';

const BadgerArticleStack = createNativeStackNavigator();

function ArticleStack() {
  return (
      <BadgerArticleStack.Navigator initialRouteName="AllArticles">
        <BadgerArticleStack.Screen name="AllArticles" component={BadgerNewsScreen} options={{headerShown: false}}/>
        <BadgerArticleStack.Screen name="Article" component={BadgerNewsItemDetail} options={{headerBackTitle: "Back"}}/>
      </BadgerArticleStack.Navigator>
  );
}

export default ArticleStack;