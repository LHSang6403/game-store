import { useQuery } from "@tanstack/react-query";

export default function useProductQuery(id: string) {
  const queryKey = ["product", id];

  const queryFn = async () => {
    // return callServerAction()
    //   .then((result) => result.data);
  };

  return useQuery({ queryKey, queryFn });
}
