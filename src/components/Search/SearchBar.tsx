"use client";

import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { readProducts } from "@/app/_actions/product";
import { useRouter } from "next/navigation";
import { Gamepad2, Newspaper, ShoppingCart, Search } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ProductType } from "@/utils/types";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [matchingKeywords, setMatchingKeywords] = useState<ProductType[]>([]);

  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["products", "all", "search"],
    queryFn: () => readProducts({ offset: 0, limit: 100 }),
    staleTime: 60 * (60 * 1000),
  });

  const { register, setValue } = useForm({
    defaultValues: { search: "" },
  });

  const products: ProductType[] = data?.data ?? [];

  const latest3Prods = useMemo(() => {
    return products
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 3);
  }, [products]);

  useEffect(() => {
    if (searchText.trim() === "") {
      setMatchingKeywords([]);
      return;
    }

    const newMatchingKeywords = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (
      JSON.stringify(newMatchingKeywords) !== JSON.stringify(matchingKeywords)
    ) {
      setMatchingKeywords(newMatchingKeywords);
    }
  }, [searchText]);

  const handleKeywordClick = (keyword: string) => {
    setValue("search", keyword);
    setMatchingKeywords([]);

    const selectedKeyword = products.find((prod) => prod.name === keyword);
    if (selectedKeyword) {
      router.push(`/product/${selectedKeyword.id}`);
    }
  };

  return (
    <>
      <Input
        className="h-9 border-none hover:cursor-pointer focus:border-none focus:outline-none focus:ring-0"
        type="text"
        autoComplete="off"
        placeholder="Tìm kiếm..."
        onClick={() => setOpen(true)}
      />
      <CommandDialog defaultOpen={false} open={open} onOpenChange={setOpen}>
        <div className="flex flex-row items-center">
          <Search className="ml-4 h-5 w-5" />
          <Input
            {...register("search")}
            autoComplete="off"
            onChange={(e) => setSearchText(e.target.value)}
            className="border-none px-2 focus:outline-none focus:ring-0"
            placeholder="Nhập tên sản phẩm..."
          />
        </div>
        <CommandList>
          <CommandEmpty>Không có kết quả</CommandEmpty>
          <CommandGroup heading="Gợi ý">
            {matchingKeywords.length === 0 &&
              latest3Prods.map((item, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    setOpen(false);
                    handleKeywordClick(item.name);
                  }}
                >
                  <Image
                    className="mr-2"
                    src={
                      process.env.NEXT_PUBLIC_SUPABASE_URL +
                      "/storage/v1/object/public/public_files/" +
                      item.images[0]
                    }
                    alt="Icon"
                    width={40}
                    height={40}
                  />
                  <span>{item.name}</span>
                </CommandItem>
              ))}
            {matchingKeywords.length > 0 &&
              matchingKeywords.map((item, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    setOpen(false);
                    handleKeywordClick(item.name);
                  }}
                >
                  <Image
                    className="mr-2"
                    src={
                      process.env.NEXT_PUBLIC_SUPABASE_URL +
                      "/storage/v1/object/public/public_files/" +
                      item.images[0]
                    }
                    alt="Icon"
                    width={40}
                    height={40}
                  />
                  <span>{item.name}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          {matchingKeywords.length === 0 && (
            <CommandGroup heading="Các trang">
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  router.push("/cart");
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Giỏ hàng</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  router.push("/blog");
                }}
              >
                <Newspaper className="mr-2 h-4 w-4" />
                <span>Tin tức</span>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
