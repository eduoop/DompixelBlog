import { Post } from '@/app/_services/http/posts';
import React from 'react';
import PostCard from '../PostCard';

interface ListPostsProps {
    posts: Post[];
}

function ListPosts({ posts }: ListPostsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 overflow-y-scroll py-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default ListPosts;
