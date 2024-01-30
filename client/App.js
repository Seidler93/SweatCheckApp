import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import apolloClient from './apollo';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage/LoginPage'

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={LoginPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
