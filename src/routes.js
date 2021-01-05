import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './views/home' ;
import RTC from './views/video';

const Stack = createStackNavigator();
const Route = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="/">
                <Stack.Screen
                    options={{
                        title: "Tokbox Demo",
                        headerStyle: {
                            backgroundColor: '#2196F3',
                        },
                        headerTintColor: '#fff',
                    }}
                    name="/"
                    component={Home}
                />
                <Stack.Screen
                    options={{
                        title: "RTC Demo",
                        headerStyle: {
                            backgroundColor: '#2196F3',
                        },
                        headerTintColor: '#fff',
                    }}
                    name="/rtc"
                    component={RTC}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Route;