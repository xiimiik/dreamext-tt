import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import Snackbar from 'react-native-snackbar';

import {NavProp} from '../types/NavProps';
import {User} from '../types/User';

const users: User[] = [
  {id: 1, email: '123@gmail.com', password: '123123'},
  {id: 2, email: '123456@gmail.com', password: '123123'},
  {id: 3, email: 'takaagmail@gmail.com', password: '123123'},
  {id: 4, email: 'gmailfor25@gmail.com', password: '123123'},
  {id: 5, email: 'wantagmail12@gmail.com', password: '123123'},
];

export const LoginScreen: React.FC<NavProp> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  const isEmpty = email.length === 0 || password.length === 0;

  const hasUser = users.find(
    user => user.email === email && user.password === password,
  );

  if (hasError) {
    Snackbar.show({
      text: 'User not found',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#E25544',
    });

    setHasError(false);
  }

  return (
    <View style={styles.mainView}>
      <Image style={styles.image} source={require('../assets/dreamext.png')} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Email."
          onChangeText={(inputEmail: string) => setEmail(inputEmail)}
          value={email}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password."
          placeholderTextColor="#fff"
          secureTextEntry={true}
          onChangeText={(inputPass: string) => setPassword(inputPass)}
          value={password}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, !isEmpty && styles.button_visible]}
        disabled={isEmpty}
        onPress={() => {
          if (hasUser) {
            navigation.navigate('Posts');
            setEmail('');
            setPassword('');
          } else {
            setHasError(true);
            setPassword('');
          }
        }}>
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
    backgroundColor: '#C0C0C0',
    borderRadius: 12,
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
    backgroundColor: '#E25544',
    width: '50%',
    textAlign: 'center',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    opacity: 0,
  },

  button_visible: {
    opacity: 1,
  },

  buttonText: {
    color: '#fff',
  },
});
