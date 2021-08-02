import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, Text, Button } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import PredictScreen from './screens/PredictScreen';
import Tabs from './navigation/Tabs';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions ={{
            headerShown: false
        }}
        initialRouteName={"Home"}
      >
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Details" component={DetailsScreen} option={{ headerShown: false}} />
        <Stack.Screen name="Predict" component={PredictScreen} option={{ headerShown: false}} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
