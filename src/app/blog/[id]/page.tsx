import { getPost } from "@/app/_services/http/posts";
import React, { Suspense } from "react";
import { Card, Text, Loader } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import PageSkeleton from "./_components/PageSkeleton";

interface BlogProps {
  params: {
    id: string;
  };
}

async function Blog({ params }: BlogProps) {
  const blog = await getPost(params.id);

  return (
    <Suspense fallback={<PageSkeleton />}>
      <div className="container mx-auto md:p-4 py-6">
        <Link
          href="/"
          className="flex items-center mb-4 text-gray-800 hover:text-gray-600 transition-colors duration-200 w-fit"
        >
          <IoArrowBack className="text-white" size={30} />
        </Link>
        <Card className="mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90">
          <div className="relative w-full h-[300px]">
            <Image
              src={blog.image}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <Text size="xl" mt="md" className="text-gray-800 font-bold">
            {blog.title}
          </Text>
          <Text size="sm" className="text-gray-600">
            {new Date(blog.date).toLocaleDateString()}
          </Text>
          <Text mt="md" size="lg" className="text-gray-700 whitespace-pre-line">
            {blog.description}
          </Text>
        </Card>

        {blog.contentImages && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blog.contentImages.map((image: string, index: number) => (
              <div
                key={index}
                className="relative w-full h-60 overflow-hidden rounded-lg shadow-md"
              >
                <Image
                  src={image}
                  alt={`Content image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Suspense>
  );
}

export default Blog;
