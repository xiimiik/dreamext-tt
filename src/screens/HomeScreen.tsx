import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header';
import {PostList} from '../components/PostList';
import {NavProp} from '../types/NavProps';

export const HomeScreen: React.FC<NavProp> = ({navigation}) => {
  return (
    <View>
      <Header navigation={navigation} />
      <PostList />
    </View>
  );
};
