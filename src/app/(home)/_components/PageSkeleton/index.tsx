import { Skeleton } from "@mantine/core";
import React from "react";

function PageSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 overflow-y-scroll py-6">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="rounded-lg shadow-lg">
          <div className="relative w-full h-[200px]">
            <Skeleton height="100%" className="rounded-lg" />
          </div>
          <Skeleton height={20} mt="lg" />
          <Skeleton height={15} mt="xs" />
        </div>
      ))}
    </div>
  );
}

export default PageSkeleton;
