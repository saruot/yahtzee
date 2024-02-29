import Styles from './styles/style.js';
import Home from "./components/Home.js";
import Gameboard from "./components/Gameboard.js";
import Scoreboard from "./components/Scoreboard.js";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons.js';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
const Tab = createBottomTabNavigator();

export default function App() {
  // Font loading to be used anywhere in the app
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'merriweather-regular': require('./assets/fonts/Merriweather-Regular.ttf'),
        'merriweather-bold': require('./assets/fonts/Merriweather-Bold.ttf'),
      });
      setFontLoaded(true);
    }
  
    loadFonts();
  }, []);
  
  if (!fontLoaded) {
    return null;
  }



  return (
    <NavigationContainer>
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: "transparent"}}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'information' : 'information-outline';
          } else if (route.name === 'Gameboard') {
            iconName = focused ? 'dice-multiple' : 'dice-multiple-outline';
          } else if (route.name === 'Scoreboard') {
            iconName = focused ? 'view-list' : 'view-list-outline';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'steelblue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{tabBarStyle: {display: "none"}}}/>
      <Tab.Screen name="Gameboard" component={Gameboard} />
      <Tab.Screen name="Scoreboard" component={Scoreboard} />
    </Tab.Navigator>
  </NavigationContainer>
);   
}