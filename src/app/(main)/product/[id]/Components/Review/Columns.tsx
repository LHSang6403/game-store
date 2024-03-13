"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Review = {
  id: string;
  name: string;
  review: string;
  created_at: string;
};

export const columns: ColumnDef<Review>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-3 w-20 overflow-ellipsis sm:w-16">
          {data.name}
        </div>
      );
    },
  },
  {
    accessorKey: "review",
    header: "Review",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="line-clamp-4 overflow-ellipsis">{data.review}</div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const formatted = date.toLocaleDateString();

      return <div className="line-clamp-3 overflow-ellipsis">{formatted}</div>;
    },
  },
];
