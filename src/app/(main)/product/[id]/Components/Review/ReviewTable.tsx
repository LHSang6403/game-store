import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import Image from "next/image";

export default function ReviewTable() {
  return (
    <div className="w-[700px] xl:w-full h-fit overflow-auto p-2 border border-foreground/20 rounded-lg  bg-background">
      <Table className="w-fit h-fit mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg text-left">Name</TableHead>
            <TableHead className="text-black text-lg">Review</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, index: number) => (
            <TableRow
              key={index}
              className="hover:cursor-pointer hover:bg-accent/50"
            >
              <TableCell>
                <p className="w-20 line-clamp-1 overflow-ellipsis text-left text-base">
                  Sang le
                </p>
                <div className="h-6 w-12 text-right text-base flex flex-row justify-center items-center gap-1">
                  <button className="w-5 h-4 pr-1 border-r-[1px] bg-none border-[##E5E7EB]">
                    <Image
                      src="/assets/icons/like.png"
                      alt="Like Icon"
                      width={18}
                      height={18}
                    />
                  </button>
                  <button className="w-4 h-4">
                    <Image
                      src="/assets/icons/dislike.png"
                      alt="Dislike Icon"
                      width={18}
                      height={18}
                    />
                  </button>
                </div>
              </TableCell>
              <TableCell>
                <p className="w-fit overflow-ellipsis line-clamp-2 text-left text-sm">
                  Exceptional service and quality, highly recommended for anyone
                  seeking a reliable and efficient solution.
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
