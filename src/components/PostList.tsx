import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {getPosts} from '../api/posts';
import {Post} from '../types/Post';
import {PostItem} from './PostItem';

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getPostsFromServer = useCallback(async () => {
    try {
      const postsFromServer = await getPosts();

      setPosts(postsFromServer);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getPostsFromServer();
  });

  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <PostItem title={item.title} body={item.body} />
        )}
      />
    </View>
  );
};
