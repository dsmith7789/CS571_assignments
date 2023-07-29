import BadgerPreferenceSwitch from "../BadgerPreferenceSwitch";
import BadgerPreferencesContext from "../../contexts/BadgerPreferencesContext";
import { useContext } from "react";
import { ScrollView, View } from 'react-native'

function BadgerPreferencesScreen(props) {

    const [prefs, setPrefs] = useContext(BadgerPreferencesContext);

    function toggleSwitch(preference, toVal) {
        setPrefs(oldPrefs => {
            return {
                ...oldPrefs,
                [preference]: toVal
            }
        })
    }

    return (
        <View>
            <ScrollView>
                {
                    Object.keys(prefs).map(pref => <BadgerPreferenceSwitch 
                        key = {pref}
                        prefName = {pref}
                        initVal = {prefs[pref]}
                        handleToggle = {toggleSwitch}
                        />)
                }
            </ScrollView>
        </View>
    )
}

export default BadgerPreferencesScreen;