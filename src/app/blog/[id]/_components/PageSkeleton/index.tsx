import React from "react";
import { Card, Text, Skeleton } from "@mantine/core";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

function PageSkeleton() {
  return (
    <div className="container mx-auto p-4 py-6">
      <Link
        href="/"
        className="flex items-center mb-4 text-gray-800 hover:text-gray-600 transition-colors duration-200"
      >
        <IoArrowBack className="text-white" size={30} />
      </Link>
      <Card className="mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full h-[300px]">
          <Skeleton height="100%" className="rounded-lg" />
        </div>
        <Text size="xl" mt="md">
          <Skeleton height={30} />
        </Text>
        <Text size="sm">
          <Skeleton height={20} />
        </Text>
        <Text mt="md">
          <Skeleton height={50} />
        </Text>
      </Card>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="relative w-full h-60 overflow-hidden rounded-lg shadow-md"
          >
            <Skeleton height="100%" className="rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageSkeleton;
