import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  title: string;
  body: string;
};

export const PostItem: React.FC<Props> = ({title, body}) => {
  return (
    <View style={styles.post}>
      <Text style={styles.title}>{title}</Text>
      <Text>{body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    width: '100%',
    padding: 20,
    borderBottomWidth: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
  },
});
