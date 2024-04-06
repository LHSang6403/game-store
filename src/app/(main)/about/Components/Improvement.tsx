"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import fadeIn from "@utils/animations/fadeIn";

export default function Improvement() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="mx-20 flex flex-row gap-6 text-justify xl:mx-6 lg:flex-col sm:mx-2"
    >
      <p className="w-1/2 lg:w-full">
        Tại Game Store, chúng tôi cam kết liên tục đổi mới và cải tiến. Chúng
        tôi tin rằng việc luôn đi đầu trong thế giới game đang thay đổi không
        ngừng này là điều cần thiết. Đó là lý do tại sao chúng tôi luôn tìm kiếm
        các xu hướng, công nghệ và đổi mới mới nhất để nâng cao trải nghiệm game
        của bạn. Từ việc cập nhật lựa chọn sản phẩm của chúng tôi với các phiên
        bản mới nhất đến việc triển khai các tính năng tiên tiến trong cửa hàng
        của chúng tôi, chúng tôi tận tụy đem đến cho bạn môi trường chơi game
        tốt nhất có thể. Đội ngũ của chúng tôi luôn nỗ lực học hỏi và phát
        triển, tham dự các sự kiện ngành và tìm kiếm phản hồi từ khách hàng để
        đảm bảo rằng chúng tôi đang đáp ứng nhu cầu và mong đợi của bạn. Mỗi
        ngày, chúng tôi đều đẩy mạnh giới hạn và đặt ra các tiêu chuẩn mới cho
        sự xuất sắc trong bán lẻ game. Hãy cùng tham gia vào hành trình cải tiến
        liên tục này, và hãy cùng nhau nâng cao thế giới game!
      </p>
      <div className="w-1/2 lg:w-full">
        <Image
          alt="Category"
          src="/assets/images/gameSetup/g5.jpg"
          className="rounded-lg"
          width={1080}
          height={720}
        />
      </div>
    </motion.div>
  );
}
