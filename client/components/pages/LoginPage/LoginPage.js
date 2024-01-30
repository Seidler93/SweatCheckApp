import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import LoginStyles from './LoginStyles';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../../utils/mutations'
import Auth from '../../../utils/auth';

const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [login, { loginError, loginData }] = useMutation(LOGIN_USER);

  // useEffect(() => {
  //   console.log(Auth.loggedIn());
  //   Auth.loggedIn()
  // }, []);

  const handleLogin = async () => {
    try {
      const { data } = await login({
        variables: { email, password },
      });
  
      // Check for errors
      if (loginError) {
        setMessage('Login failed. Please check your credentials.');
        return;
      }
  
      // Check for successful login
      if (data && data.login && data.login.token) {
        Auth.login(data.login.token);
        console.log('Login successful!');
        navigation.navigate('Home')
      } else {
        setMessage('Login failed. Please try again.');
      }
    } catch (e) {
      console.error(e);
      setMessage('An unexpected error occurred.');
    }
  };
  
  return (
    <View style={LoginStyles.container}>
      <TextInput
        style={LoginStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={LoginStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={LoginStyles.button} onPress={handleLogin}>
        <Text style={LoginStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={LoginStyles.message}>{message}</Text>
    </View>
  );
};

export default LoginForm;
