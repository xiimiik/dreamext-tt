import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {getPosts} from '../api/posts';
import {Post} from '../types/Post';
import {PostItem} from './PostItem';

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const renderItem = useCallback(
    ({item}: {item: Post}) => <PostItem title={item.title} body={item.body} />,
    [],
  );

  const getPostsFromServer = useCallback(async () => {
    try {
      setIsLoading(true);
      const postsFromServer = await getPosts();

      setPosts(postsFromServer);
    } catch (err) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPostsFromServer();
  }, [getPostsFromServer]);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={'large'} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (hasError) {
    return Snackbar.show({
      text: 'An error occurred',
      duration: Snackbar.LENGTH_INDEFINITE,
      backgroundColor: '#E25544',
      action: {
        text: 'Repeat the request',
        onPress: () => {
          getPostsFromServer();
        },
      },
    });
  }

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={getPostsFromServer}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
