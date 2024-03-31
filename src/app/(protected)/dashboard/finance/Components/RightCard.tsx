import { Button } from "@/components/ui/button";
import { CreditCard, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export default function RightCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 flex flex-row items-start">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Báo cáo
          </CardTitle>
          <div className="mt-1 flex w-full flex-row items-center gap-3">
            <Button variant="outline" className="h-8 w-full">
              Làm mới
            </Button>
            <Button variant="outline" className="h-8 w-full">
              In báo cáo
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="grid gap-3">
          <ul className="grid gap-3">
            <div className="font-semibold">Đơn hàng</div>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Khu vực HCM</span>
              <span>100</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Khu vực HN</span>
              <span>77</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <div className="font-semibold">Kho bãi</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Nhập kho <span>HCM</span>
              </span>
              <span>250</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Xuất kho <span>HN</span>
              </span>
              <span>49</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Đang giao <span>HCM</span>
              </span>
              <span>45</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Đang giao <span>HN</span>
              </span>
              <span>25</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <div className="font-semibold">Sản phẩm</div>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Bán chạy</span>
              <span>Play Station 5</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Thiếu hàng</span>
              <span>Play Station 4</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tồn nhiều</span>
              <span>Nitendo Switch</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
