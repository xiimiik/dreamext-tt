import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type Props = {
  title: string;
  body: string;
};

export const PostItem: React.FC<Props> = ({title, body}) => {
  return (
    <View style={styles.post}>
      <TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <Text>{body}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
  },
});
