import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import apolloClient from './apollo';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import pages and components
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage/LoginPage'
import NewWorkoutPage from './components/pages/WorkoutPages/NewWorkoutPage';

const Stack = createStackNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const checkLoginStatus = () => {
      const token = AsyncStorage.getItem('id_token');
      setLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginPage}/>
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="NewWorkout" component={NewWorkoutPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
