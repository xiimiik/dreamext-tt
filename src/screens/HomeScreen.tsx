import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header';
import {PostList} from '../components/PostList';

export const HomeScreen = () => {
  return (
    <View>
      <Header />
      <PostList />
    </View>
  );
};
