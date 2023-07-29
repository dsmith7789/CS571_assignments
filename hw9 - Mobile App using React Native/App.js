import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import BadgerPreferencesContext from './contexts/BadgerPreferencesContext';
import BadgerTabs from './components/navigation/BadgerTabs';

export default function App() {

  const [prefs, setPrefs] = useState({});

  // get tags to initialize preferences
  useEffect(() => {
    fetch("https://www.cs571.org/s23/hw9/api/news/articles", {
        headers: {
            "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
        }
    })
    .then(res => res.json())
    .then(data => {
        for (const article of data) {
          console.log("current article: ", article)
          for (const tag of article.tags) {
            console.log("current tag: ", tag)
            setPrefs(oldPrefs => {
              return {
                  ...oldPrefs,
                  [tag]: true
              }
            })
          }
        }
    })
}, []);


  console.log("Prefs in current state: ", prefs)

  return (
    <>
      <BadgerPreferencesContext.Provider value={[prefs, setPrefs]}>
        <NavigationContainer>
          <BadgerTabs />
        </NavigationContainer>
      </BadgerPreferencesContext.Provider>
      <StatusBar style="auto" />
    </>
  );
}