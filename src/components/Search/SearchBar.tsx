"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { readAllProductsWithNameAndId } from "@/app/_actions/product";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["search", "product"],
    queryFn: async () => await readAllProductsWithNameAndId(),
    staleTime: 1000 * 60 * 60,
  });

  const { register, setValue } = useForm({
    defaultValues: { search: "" },
  });

  const [searchText, setSearchText] = useState<string>("");
  const [matchingKeywords, setMatchingKeywords] = useState<string[]>([]);

  const keywords: { name: string; id: string }[] = data?.data || [];
  const keywordNames = keywords.map((keyword) => keyword.name);

  useEffect(() => {
    setMatchingKeywords(findMatchingKeywords(searchText, keywordNames));
  }, [searchText]);

  const handleKeywordClick = (keyword: string) => {
    setValue("search", keyword);
    setMatchingKeywords([]);

    const selectedKeyword = keywords.find((kw) => kw.name === keyword);
    if (selectedKeyword) {
      router.push(`/product/${selectedKeyword.id}`);
    }
  };

  return (
    <div className="relative h-fit w-full">
      <form>
        <Input
          className="h-8"
          type="text"
          autoComplete="off"
          placeholder="Searching..."
          {...register("search")}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
      <div className="absolute top-10 z-30">
        {matchingKeywords?.length > 0 && (
          <SelectOptions
            options={matchingKeywords}
            onClickHandler={handleKeywordClick}
          />
        )}
      </div>
    </div>
  );
}

function findMatchingKeywords(input: string, keywords: string[]) {
  if (!input.trim()) {
    return [];
  }

  const inputLowerCase = input.toLowerCase();
  const matchingKeywords = keywords.filter((keyword) =>
    keyword.toLowerCase().includes(inputLowerCase)
  );

  return matchingKeywords;
}

function SelectOptions({
  options,
  onClickHandler,
}: {
  options: string[];
  onClickHandler: Function;
}) {
  return (
    <div className="h-fit w-52 rounded-md border border-foreground/10 bg-background p-1">
      {options.map((each: string, index: number) => (
        <div
          onClick={() => {
            onClickHandler(each);
          }}
          className="hover:text-accent-foreground flex h-10 w-full cursor-pointer items-center rounded-sm px-3 hover:bg-accent"
          key={index}
        >
          {each}
        </div>
      ))}
    </div>
  );
}
