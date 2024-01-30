import { View, Text, Button } from 'react-native';
import Auth from '../../utils/auth';
const HomePage = ({ navigation }) => {

  const handleLogout = async () => {
    try {
      await Auth.logout();
      // If the logout is successful, navigate to the login page
      navigation.navigate('Login');
    } catch (error) {
      // Handle the error, e.g., show an error message or log it
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 100 }}>
      <Text>Welcome to the Home Page!</Text>
      <Button
        title="Workout"
        onPress={() => navigation.navigate('NewWorkout')}
      />
      <Button
        title="Logout"
        onPress={() => handleLogout()}
      />
    </View>
  );
};

export default HomePage;
