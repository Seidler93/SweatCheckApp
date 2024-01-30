import { View, Text, Button } from 'react-native';

const NewWorkoutPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, paddingTop: 100 }}>
      <Text>NewWorkoutPage</Text>
      <Button
        title="Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default NewWorkoutPage;