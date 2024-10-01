'use server'

import { revalidatePath } from "next/cache";

export interface Post {
  id: number;
  title: string;
  date: string;
  image: string;
  slug: string;
  contentImages?: string[];
}

type PostsResponse = Post[];

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getPosts(): Promise<PostsResponse> {
  const response = await fetch(`${apiUrl}/posts`);

  if (!response.ok) {
    throw new Error("Erro ao buscar as postagens");
  }

  revalidatePath('/')
  const data = await response.json();
  return data;
}

export async function createPost(postData: Post): Promise<Post> {
  const response = await fetch(`${apiUrl}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar a postagem");
  }

  revalidatePath('/');

  const data = await response.json();
  return data;
}
