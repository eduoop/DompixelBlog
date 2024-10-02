'use server'

import { revalidatePath } from "next/cache";

export interface Post {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string
  slug: string;
  contentImages?: string[];
}

type PostsResponse = Post[];

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getPosts(search?: string): Promise<PostsResponse> {
  let url = `${apiUrl}/posts`;

  if (!search) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao buscar as postagens");
    }
    revalidatePath('/');
    const data = await response.json();
    return data;
  }

  const uniqueIds = new Set<Post["id"]>();
  let results: Post[] = [];

  const addResults = (posts: Post[]) => {
    for (const post of posts) {
      if (!uniqueIds.has(post.id)) {
        uniqueIds.add(post.id);
        results.push(post);
      }
    }
  };

  const titleResponse = await fetch(`${url}?title_like=${search}`);
  if (titleResponse.ok) {
    const titleResults = await titleResponse.json();
    addResults(titleResults);
  }

  const descriptionResponse = await fetch(`${url}?description_like=${search}`);
  if (descriptionResponse.ok) {
    const descriptionResults = await descriptionResponse.json();
    addResults(descriptionResults);
  }

  revalidatePath('/');
  return results;
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

export async function getPost(postId: string): Promise<Post> {
  const response = await fetch(`${apiUrl}/posts/${postId}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar a postagem");
  }

  const data = await response.json();
  return data;
}