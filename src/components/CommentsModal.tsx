import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import Snackbar from 'react-native-snackbar';

import {getCommentsByPost} from '../api/posts';

import {PostItem} from './PostItem';
import {Comment} from '../types/Comment';

type Props = {
  id: number;
};

export const CommentsModal: React.FC<Props> = ({id}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getCommentsFromServer = useCallback(async () => {
    try {
      setIsLoading(true);
      const commentsFromServer = await getCommentsByPost(id);

      setComments(commentsFromServer);
    } catch (err) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getCommentsFromServer();
  }, [getCommentsFromServer]);

  const renderComments = useCallback(({item}: {item: Comment}) => {
    return <PostItem title={item.name} body={item.body} />;
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={'large'} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (hasError) {
    Snackbar.show({
      text: 'An error occurred while loading comments',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: '#E25544',
    });
  }

  return (
    <View style={styles.comments}>
      <Text style={styles.title}>Comments</Text>
      <FlatList data={comments} renderItem={renderComments} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  comments: {
    borderWidth: 1,
    height: '50%',
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 17,
    padding: 10,
    fontWeight: '700',
    textAlign: 'center',
    borderBottomWidth: 1,
  },
});
