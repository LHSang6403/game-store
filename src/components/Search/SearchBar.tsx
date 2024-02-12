"use client";

import { useState, useEffect } from "react";
import { Input } from "@components/ui/input";
import { useForm } from "react-hook-form";

export default function SearchBar() {
  const { register, setValue } = useForm({
    defaultValues: { search: "" },
  });

  const [searchText, setSearchText] = useState<string>("");
  const [matchingKeywords, setMatchingKeywords] = useState<string[]>([]);

  // replace with your own keywords/ data/ API call
  const keywords = ["apple", "banana", "orange", "grape", "pineapple"];

  useEffect(() => {
    setMatchingKeywords(findMatchingKeywords(searchText, keywords));
  }, [searchText]);

  const handleKeywordClick = (keyword: string) => {
    setValue("search", keyword);
    setMatchingKeywords([]);

    // call functions to handle the keyword click here
  };

  return (
    <div className="w-52 h-fit relative">
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
      <div className="absolute top-10 z-20">
        {matchingKeywords.length > 0 && (
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
    <div className="w-52 h-fit p-1 border border-foreground/10 bg-background rounded-md">
      {options.map((each: string, index: number) => (
        <div
          onClick={() => {
            onClickHandler(each);
          }}
          className="w-full h-10 flex items-center px-3 hover:bg-accent hover:text-accent-foreground rounded-sm cursor-pointer"
          key={index}
        >
          {each}
        </div>
      ))}
    </div>
  );
}
