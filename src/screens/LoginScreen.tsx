import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import {emailValidation, passwordValidation} from '../utils/regex';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid =
    emailValidation.test(email) && passwordValidation.test(password);

  return (
    <View style={styles.mainView}>
      <Image style={styles.image} source={require('../assets/dreamext.png')} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(inputEmail: string) => setEmail(inputEmail)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(inputPass: string) => setPassword(inputPass)}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, isValid && styles.button_visible]}
        disabled={!isValid}>
        <Text style={styles.buttonText}>Login.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
  },

  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  image: {
    resizeMode: 'contain',
    height: 100,
    width: 200,
    marginBottom: 40,
  },

  button: {
    padding: 12,
    backgroundColor: '#f00',
    width: '50%',
    textAlign: 'center',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 40,
    opacity: 0,
  },

  button_visible: {
    opacity: 1,
  },

  buttonText: {
    color: '#fff',
  },
});
