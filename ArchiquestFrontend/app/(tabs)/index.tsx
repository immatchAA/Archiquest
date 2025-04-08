import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.subText}>logo here</Text>
      <Text style={styles.helloText}>Hello,</Text>
      <Text style={styles.userText}>User</Text>
      <Text style={styles.subText}>— LET’S GET STARTED —</Text>

      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => router.push('/login')}
      >
        <Text style={styles.signInText}>SIGN IN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => router.push('/register')}
      >
        <Text style={styles.signUpText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 30,
  },
  helloText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#176BB7',
  },
  userText: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#176BB7',
    marginBottom: 30,
  },
  subText: {
    fontSize: 12,
    color: '#176BB7',
    marginBottom: 20,
    letterSpacing: 1,
  },
  signInButton: {
    borderWidth: 2,
    borderColor: '#176BB7',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginBottom: 15,
    width: '70%',
    alignItems: 'center',
  },
  signInText: {
    color: '#176BB7',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: '#86B6F6',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 50,
    width: '70%',
    alignItems: 'center',
  },
  signUpText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});