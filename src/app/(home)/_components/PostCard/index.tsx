"use client";

import { Post } from "@/app/_services/http/posts";
import React from "react";
import { Card, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PostCardProps {
  post: Post;
}

function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${post.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-102 group"
    >
      <div className="relative w-full h-[200px] overflow-hidden rounded-lg">
        <Image
          src={post.image}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <Text 
        size="lg" 
        mt="md" 
        className="text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis group-hover:block"
        style={{ display: 'block' }}
      >
        {post.title}
      </Text>
      <Text size="sm" color="dimmed" className="text-gray-600">
        {new Date(post.date).toLocaleDateString()}
      </Text>
    </Card>
  );
}

export default PostCard;
