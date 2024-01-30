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
      console.error('Error getting token:', error);
      return null;
    }
  }

  async login(idToken) {
    try {
      await AsyncStorage.setItem('id_token', idToken);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  async logout() {
    try {
      await AsyncStorage.removeItem('id_token');
      console.log(AsyncStorage.getItem('id_token'));

    } catch (error) {
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


