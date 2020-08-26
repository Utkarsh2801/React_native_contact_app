import React from 'react';
//import screens
import HomeScreen from './screens/HomeScreen';
import AddNewContactScreen from './screens/AddNewContactScreen';
import EditContactScreen from './screens/EditContactScreen';
import ViewContactScreen from './screens/ViewContactScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'All Contacts'}}
        />
        <stack.Screen
          name="Add"
          component={AddNewContactScreen}
          options={{title: ''}}
        />
        <stack.Screen
          name="Edit"
          component={EditContactScreen}
          options={{title: 'Edit Contact'}}
        />
        <stack.Screen
          name="View"
          component={ViewContactScreen}
          options={{title: 'View Contact'}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}
