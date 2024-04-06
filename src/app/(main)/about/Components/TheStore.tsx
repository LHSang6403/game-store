"use client";

import { motion } from "framer-motion";
import fadeIn from "@utils/animations/fadeIn";

export default function TheStore() {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      <section className="mx-20 text-justify xl:mx-6 sm:mx-2">
        Tại Game Store, chúng tôi cam kết mang đến cho bạn những trải nghiệm
        giải trí game mới nhất và tuyệt vời nhất. Cho dù bạn là một game thủ
        bình thường tìm kiếm sự vui vẻ vào cuối tuần hay một người yêu thích
        game nghiêm túc tìm kiếm tựa game lớn tiếp theo, chúng tôi có điều gì đó
        phù hợp cho mọi người. Bộ sưu tập đa dạng của chúng tôi bao gồm nhiều
        thể loại game trên tất cả các nền tảng, bao gồm PC, console và di động.
        Từ cuộc phiêu lưu đầy hấp dẫn và RPG lôi cuốn đến trải nghiệm
        multiplayer hồi hộp và những tựa game gia đình thân thiện, ở đây không
        thiếu sự hứng thú. Nhưng chúng tôi không chỉ là một cửa hàng - chúng tôi
        là một cộng đồng. Đội ngũ nhiệt tình của chúng tôi, những chuyên gia về
        game, sẵn lòng giúp bạn tìm kiếm tựa game hoàn hảo, trả lời các câu hỏi
        của bạn và cung cấp mẹo và thủ thuật để tăng cường trải nghiệm game của
        bạn.
      </section>
    </motion.div>
  );
}
