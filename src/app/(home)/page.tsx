import { Suspense } from "react";
import { getPosts } from "../_services/http/posts";
import ListPosts from "./_components/ListPosts";
import PageSkeleton from "./_components/PageSkeleton";

export default async function Home() {
  const posts = await getPosts();

  return (
    <Suspense fallback={<PageSkeleton />}>
      <ListPosts posts={posts} />
    </Suspense>
  );
}
