import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ArchiQuest!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => router.push('/login')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={() => router.push('/register')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});
