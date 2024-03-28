"use client";

import CreateForm from "./Components/CreateForm";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect } from "react";

export default function page() {
  const [content, setContent] = useLocalStorage("content", "");

  useEffect(() => {
    setContent(defaultTemplate);
  }, []);

  return (
    <div className="flex min-h-[calc(100vh_-_6rem)] flex-col gap-2 pb-6">
      <h1 className="my-2 text-2xl font-medium">Write blog</h1>
      <div className="h-fit w-full">
        <CreateForm />
      </div>
    </div>
  );
}

const defaultTemplate = `
Chào mừng bạn đến với bài viết hôm nay! Trong thế giới của game, việc có một cửa hàng sản phẩm chất lượng là một yếu tố không thể thiếu. Game store product không chỉ là nơi để người chơi tìm kiếm và mua các tựa game yêu thích mà còn là nơi để họ khám phá những trải nghiệm mới mẻ.

Một game store product hiệu quả không chỉ cung cấp cho người chơi danh sách các game mới nhất và phổ biến nhất mà còn cung cấp thông tin chi tiết về từng tựa game, bao gồm đánh giá, đánh giá của người dùng, yêu cầu hệ thống, và nhiều hơn nữa. Điều này giúp người chơi có cái nhìn tổng quan và quyết định tốt hơn về việc mua game.

Ngoài ra, game store product cũng là nơi để các nhà phát triển game trình làng sản phẩm của họ và tương tác trực tiếp với cộng đồng game thủ. Điều này giúp họ nhận được phản hồi từ người chơi, từ đó cải thiện và phát triển sản phẩm của mình một cách liên tục.

Không chỉ đơn thuần là nơi mua bán game, mà game store product còn là một cộng đồng, nơi mà những người đam mê game có thể gặp gỡ, trao đổi và chia sẻ thông tin với nhau. Điều này tạo ra một môi trường sôi động và hứng khởi cho cả những người chơi mới và cũ.

Với sự phát triển không ngừng của ngành công nghiệp game, game store product đóng vai trò quan trọng trong việc kết nối và phục vụ cộng đồng game thủ. Chúng không chỉ là nơi mua sắm, mà còn là nơi giao lưu, học hỏi và thư giãn cho những người yêu thích game trên khắp thế giới.
`;
