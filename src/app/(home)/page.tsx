import { Suspense } from "react";
import { getPosts } from "../_services/http/posts";
import ListPosts from "./_components/ListPosts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <Suspense fallback={<h1 className="text-3xl font-bold">Carregando...</h1>}>
      <ListPosts posts={posts} />
    </Suspense>
  );
}
