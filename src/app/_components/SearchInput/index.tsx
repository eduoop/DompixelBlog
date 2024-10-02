"use client";

import { Post } from "@/app/_services/http/posts";
import { Input, Popover, ScrollArea } from "@mantine/core";
import React, { useCallback, useState } from "react";
import { getPosts } from "@/app/_services/http/posts";
import Image from "next/image";
import Link from "next/link";
import { BiSearch, BiHistory } from "react-icons/bi";
import { usePostHistoryStore } from "@/app/_stores/postHistorycStore";

const debounce = <T extends (...args: any[]) => void>(
  cb: T,
  delay: number = 1000
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      cb(...args);
    }, delay);
  };
};

interface SearchInputProps {
  onClickResult?: () => void;
}

function SearchInput({ onClickResult }: SearchInputProps) {
  const [results, setResults] = useState<Post[]>([]);
  const [opened, setOpened] = useState(false);

  const { addPost, posts } = usePostHistoryStore();

  const onInput = async (value: string): Promise<void> => {
    if (value) {
      try {
        const fetchedResults =
          value.trim().length > 0 ? await getPosts(value.trim()) : [];
        setResults(fetchedResults);
        setOpened(fetchedResults.length > 0 || posts.length > 0);
      } catch (error) {
        setResults([]);
      }
    } else {
      setResults([]);
      setOpened(posts.length > 0);
    }
  };

  const onInputWithDebouncing = useCallback(debounce(onInput, 300), []);

  const handleFocus = () => {
    if (posts.length > 0) {
      setOpened(true);
    }
  };

  return (
    <div className="relative w-full">
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom"
        withArrow
        classNames={{
          dropdown: "pr-0 bg-gray-200",
        }}
      >
        <Popover.Target>
          <Input
            type="text"
            onChange={(e) => onInputWithDebouncing(e.target.value)}
            onFocus={handleFocus}
            className="w-full"
            placeholder="Busque por títulos ou conteúdos"
            leftSection={<BiSearch />}
            classNames={{
              input:
                "bg-[#374151] text-white border border-solid border-[#4B5563]",
            }}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <ScrollArea style={{ height: 200, paddingRight: "1.3em" }}>
            {results.length > 0 ? (
              results.map((result) => (
                <Link
                  href={`/blog/${result.id}`}
                  key={result.id}
                  className="flex items-center p-2 hover:bg-gray-200/50 cursor-pointer overflow-hidden rounded-md"
                  onClick={() => {
                    setOpened(false);
                    onClickResult && onClickResult();
                    addPost(result);
                  }}
                >
                  <div className="relative w-12 h-12 mr-2">
                    <Image
                      src={result.image}
                      alt={result.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                  <div
                    className="overflow-hidden 
                    text-nowrap 
                    text-ellipsis 
                    whitespace-nowrap 
                    text-gray-800 
                    font-semibold max-w-[200px]"
                  >
                    {result.title}
                  </div>
                </Link>
              ))
            ) : (
              <>
                {posts.length > 0 && (
                  <div className="p-2 text-gray-800 font-semibold">
                    Pesquisados recentemente
                  </div>
                )}
                {posts.map((post) => (
                  <Link
                    href={`/blog/${post.id}`}
                    key={post.id}
                    className="flex items-center p-2 hover:bg-gray-200/50 cursor-pointer overflow-hidden rounded-md gap-2"
                    onClick={() => {
                      setOpened(false);
                      onClickResult && onClickResult();
                      addPost(post);
                    }}
                  >
                    <div className="relative w-12 h-12">
                      <Image
                        src={post.image}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                    <div
                      className="overflow-hidden 
                      text-nowrap 
                      text-ellipsis 
                      whitespace-nowrap 
                      text-gray-800 
                      font-semibold max-w-[200px]"
                    >
                      {post.title}
                    </div>
                    <BiHistory className="ml-auto text-gray-500" />
                  </Link>
                ))}
              </>
            )}
          </ScrollArea>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

export default SearchInput;
