import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export const Header = () => {
  return (
    <View style={styles.header}>
      <Image style={styles.image} source={require('../assets/dreamext.png')} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f00',
  },

  image: {
    resizeMode: 'contain',
    height: 60,
    width: 100,
  },

  button: {
    padding: 12,
    backgroundColor: '#f00',
    textAlign: 'center',
    borderRadius: 12,
  },

  buttonText: {
    color: '#fff',
  },
});
