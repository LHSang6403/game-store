import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DataCard({
  title,
  data,
  previousData,
  icon,
}: {
  title: string;
  data: string;
  previousData: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="line-clamp-1 overflow-ellipsis text-xl font-bold">
          {data}
        </div>
        <p className="text-muted-foreground line-clamp-2 overflow-ellipsis text-xs">
          {previousData}
        </p>
      </CardContent>
    </Card>
  );
}
