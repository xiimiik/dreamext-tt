import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  RefreshControl,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Snackbar from 'react-native-snackbar';

import {getPosts} from '../api/posts';
import {Post} from '../types/Post';
import {PostItem} from './PostItem';

import {CommentsModal} from './CommentsModal';

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(0);

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

  const keyExtractor = useCallback((item: Post) => {
    return `${item.id}`;
  }, []);

  const renderPost = useCallback(({item}: {item: Post}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsActive(true);
          setSelectedPostId(item.id);
        }}>
        <PostItem title={item.title} body={item.body} />
      </TouchableOpacity>
    );
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
    Snackbar.show({
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
        initialNumToRender={10}
        renderItem={renderPost}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={getPostsFromServer}
          />
        }
      />

      <Modal
        visible={isActive}
        transparent={true}
        onRequestClose={() => setIsActive(false)}
        animationType={'slide'}>
        <TouchableWithoutFeedback onPress={() => setIsActive(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          <CommentsModal id={selectedPostId} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    flex: 1,
    justifyContent: 'center',
    margin: '5%',
  },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
