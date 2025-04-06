import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';


const SignUpScreen = ({ }) => {
  const [userType, setUserType] = useState('student');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleBackToLogin = () => {
    router.push('/login');
    console.log('Navigate back to login');
  };

  const handleSignUp = () => {
    router.push('/register');
    console.log('Sign up pressed');
  };

  const handleLoginClick = () => {
    router.push('/login');
    console.log('Navigate to login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}></Text>
          </View>
          <Text style={styles.logoText}>ARchiQuest</Text>
        </View>

        {/* Back to Login */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
          <Ionicons name="arrow-back" size={20} color="#000" />
          <Text style={styles.backText}>BACK TO LOGIN</Text>
        </TouchableOpacity>

        {/* Sign Up Header */}
        <Text style={styles.headerText}>SIGN UP</Text>

        {/* User Type Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              styles.toggleButtonLeft,
              userType === 'student' && styles.toggleButtonActive,
            ]}
            onPress={() => setUserType('student')}
          >
            <Text
              style={[
                styles.toggleText,
                userType === 'student' && styles.toggleTextActive,
              ]}
            >
              Student
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              styles.toggleButtonRight,
              userType === 'instructor' && styles.toggleButtonActive,
            ]}
            onPress={() => setUserType('instructor')}
          >
            <Text
              style={[
                styles.toggleText,
                userType === 'instructor' && styles.toggleTextActive,
              ]}
            >
              Instructor
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="FIRST NAME"
            placeholderTextColor="#666"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="LAST NAME"
            placeholderTextColor="#666"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="EMAIL"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="PASSWORD"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="CONFIRM PASSWORD"
            placeholderTextColor="#666"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>

        {/* Already have an account */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLoginClick}>
            <Text style={styles.loginLink}>Click here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  logoCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#80b4ff',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    color: 'white',
    fontSize: 16,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#80b4ff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    letterSpacing: 2,
    alignSelf: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#e6f0ff',
    borderRadius: 25,
    marginBottom: 20,
    width: '100%',
    height: 45,
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  toggleButtonLeft: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  toggleButtonRight: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  toggleButtonActive: {
    backgroundColor: '#80b4ff',
  },
  toggleText: {
    color: '#666',
    fontWeight: '500',
  },
  toggleTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f0ff',
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
  },
  signUpButton: {
    backgroundColor: '#80b4ff',
    borderRadius: 10,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SignUpScreen;