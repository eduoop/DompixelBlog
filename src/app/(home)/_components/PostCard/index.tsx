"use client";

import { Post } from "@/app/_services/http/posts";
import React from "react";
import { Card, Image, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

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
      className="cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <Image src={post.image} alt={post.title} className="rounded-lg" />
      <Text size="lg" mt="md" className="text-gray-800">
        {post.title}
      </Text>
      <Text size="sm" color="dimmed" className="text-gray-600">
        {new Date(post.date).toLocaleDateString()}
      </Text>
    </Card>
  );
}

export default PostCard;
