"use client";

import { motion } from "framer-motion";
import fadeIn from "@utils/animations/fadeIn";

interface Event {
  time: string;
  title: string;
  description: string;
}

export default function Timeline(): JSX.Element {
  const events: Event[] = [
    {
      time: "Tháng 5 năm 2022",
      title: "Mở cửa hàng chính thức",
      description:
        "Cuối cùng, vào tháng 5, chúng tôi chính thức mở cửa hàng và chào đón khách hàng đầu tiên. Sự kiện này đánh dấu bước khởi đầu mới cho chúng tôi trong thế giới kinh doanh game.",
    },
    {
      time: "Tháng 4 năm 2022",
      title: "Chạy thử và kiểm tra",
      description:
        "Trước khi mở cửa hàng chính thức, chúng tôi tiến hành các buổi chạy thử và kiểm tra kỹ lưỡng để đảm bảo mọi thứ hoạt động suôn sẻ.",
    },
    {
      time: "Tháng 3 năm 2022",
      title: "Tối ưu giá và sản phẩm",
      description:
        "Sau khi thu thập thông tin từ các khảo sát, chúng tôi tối ưu hóa giá cả và chọn lựa sản phẩm phù hợp để đáp ứng nhu cầu của khách hàng.",
    },
    {
      time: "Tháng 2 năm 2022",
      title: "Khảo sát thị trường",
      description:
        "Chúng tôi bắt đầu bằng việc tiến hành các cuộc khảo sát thị trường để hiểu rõ nhu cầu của khách hàng và định hình chiến lược kinh doanh.",
    },
  ];

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="mx-[12%] mt-10 h-fit w-auto"
    >
      <ul className="relative border-s border-background/75">
        {events.map((event, index) => (
          <li key={index} className="mb-10 ms-4">
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-primary"></div>
            <time className="mb-1 text-sm font-normal leading-none text-background/75">
              {event.time}
            </time>
            <h3 className="text-lg font-semibold text-background">
              {event.title}
            </h3>
            <p className="mb-4 text-base font-light text-background/60">
              {event.description}
            </p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
