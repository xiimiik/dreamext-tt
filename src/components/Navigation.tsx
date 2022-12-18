import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {LoginScreen} from '../screens/LoginScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {useNetInfo} from '@react-native-community/netinfo';
import {View, Text, StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const netInfo = useNetInfo();

  return (
    <NavigationContainer>
      {!netInfo.isInternetReachable && (
        <View style={styles.modal}>
          <Text style={styles.text}>No internet connection</Text>
        </View>
      )}

      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Posts"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: 30,
    justifyContent: 'center',
    backgroundColor: '#E25544',
  },
  text: {
    textAlign: 'center',
  },
});
