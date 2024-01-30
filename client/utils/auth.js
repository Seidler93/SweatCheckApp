import AsyncStorage from '@react-native-async-storage/async-storage';
import decode from 'jwt-decode';

class AuthService {
  async getProfile() {
    const token = await AsyncStorage.getItem('id_token');
    return decode(token);
  }

  async loggedIn() {
    const token = await AsyncStorage.getItem('id_token');
    return token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    return decoded.exp < Date.now() / 1000;
  }

  async getToken() {
    try {
      const token = await AsyncStorage.getItem('id_token');
      return token;
    } catch (error) {
      // Handle errors, e.g., logging or returning a default value
      console.error('Error getting token:', error);
      return null;
    }
  }

  async login(idToken) {
    try {
      await AsyncStorage.setItem('id_token', idToken);
      // Navigate to the desired screen in your React Native app
      // For example, you might use a navigation library like React Navigation
      // navigation.navigate('Home'); // Replace 'Home' with your desired screen name
    } catch (error) {
      // Handle errors, e.g., logging or showing an alert
      console.error('Error saving token:', error);
    }
  }

  async logout() {
    try {
      await AsyncStorage.removeItem('id_token');
      // Reload the app or navigate to the login screen
      // For example, you might use a navigation library like React Navigation
      // navigation.navigate('Login'); // Replace 'Login' with your login screen name
    } catch (error) {
      // Handle errors, e.g., logging or showing an alert
      console.error('Error removing token:', error);
    }
  }

  getDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${month}/${day}/${year}`;
  }
}

export default new AuthService();
