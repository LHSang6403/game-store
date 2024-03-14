import Link from "next/link";
import News from "./Components/News";
import EventSection from "./Components/EventSection";

export default function page() {
  const productsInfo = [
    {
      image: "/assets/images/HelloMama/tintuc/img1.png",
      title: "Sữa NanoSure Gold – Món quà dinh dưỡng trao tặng mẹ cha",
      description:
        "Tuổi tác càng cao, cha mẹ càng phải đối mặt ngày càng nhiều vấn đề về sức khỏe. Những dấu hiệu suy giảm sức khỏe sẽ âm thầm diễn ra theo thời gian....",
    },
    {
      image: "/assets/images/HelloMama/tintuc/img2.png",
      title: "Tuyệt chiêu để bé hết biếng ăn cùng sữa Monicare Pedia Plus",
      description:
        "Tuyệt chiêu để bé hết biếng ăn cùng sữa Monicare Pedia Plus sẽ được bật mí trong bài viết sau đây. Bố mẹ đang có bé biếng ăn thì đừng bỏ qua những thông tin hữu ích này của HelloMama nhé!...",
    },
    {
      image: "/assets/images/HelloMama/tintuc/img3.png",
      title: "Khám phá chất xơ thế hệ mới NEOGOS P70 trong sữa NanoSure Gold",
      description:
        "Chất xơ thế hệ mới NEOGOS P70 là một thành phần nổi bật có trong sữa NanoSure Gold. Lợi ích của dưỡng chất này như thế nào? HelloMama sẽ giới thiệu đến các bạn trong bài viết sau đây!",
    },
  ];

  const helloMamaInfo = [
    {
      image: "/assets/images/HelloMama/tintuc/img4.png",
      title: "Lễ ký kết hợp tác chiến lược giữa HelloMama và NPP TDS Ninh Bình",
      description:
        "Ngày 07/04/2023 vừa qua, tại Thành phố Ninh Bình, tỉnh Ninh Bình, công ty TNHH HelloMama và Nhà phân phối TDS Ninh Bình đã ký kết hợp tác chiến lược. Đây là sự kiện quan trọng đánh dấu cho sự mở rộng thị trường của các sản phẩm do Helllo Mama cung cấp...",
    },
    {
      image: "/assets/images/HelloMama/tintuc/img5.png",
      title:
        "HelloMama triển khai chương trình tri ân khách hàng tại các hệ thống đại lý",
      description:
        "Hello Mama đang triển khai chương trình tri ân khách hàng tại các hệ thống đại lý phân phối các sản phẩm sữa Monicare, G-Power, Nanosure, Gocare, Mailta,…",
    },
    {
      image: "/assets/images/HelloMama/tintuc/img6.png",
      title:
        "Tuyển nhà phân phối sữa Monicare trên toàn quốc với chính sách hấp dẫn",
      description:
        "Công ty TNHH Hello Mama tuyển Nhà phân phối – Đại lý sữa phân phối sản phẩm Monicare trên toàn quốc với chính sách vô cùng hấp dẫn. Gần 200 cửa hàng đã có mặt sản phẩm sữa...",
    },
  ];

  return (
    <div className="xl:max-w-screen flex h-auto max-w-[1440px] flex-col items-center gap-8 pb-20 pt-10 xl:w-screen xl:px-6 sm:w-screen sm:gap-3 sm:px-4">
      <EventSection />
      <section className="flex w-full flex-col items-center">
        <h1 className="mb-8 mt-4 bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-center text-3xl text-transparent sm:mb-4">
          THÔNG TIN VỀ SẢN PHẨM VÀ DỊCH VỤ
        </h1>
        <div className="flex w-full flex-row items-center justify-center gap-4 xl:flex-col xl:gap-6">
          {productsInfo.map((product, index) => (
            <News key={index} each={product} />
          ))}
        </div>
        <Link
          className="mt-3 border-b border-b-black font-light leading-none xl:mt-6"
          href="#"
        >
          Xem tất cả
        </Link>
      </section>
      <section className="flex flex-col items-center">
        <h1 className="mb-8 mt-2 bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-center text-3xl text-transparent sm:mb-4">
          THÔNG TIN VỀ HELLO MAMA
        </h1>
        <div className="flex w-full flex-row items-center justify-center gap-4 xl:flex-col">
          {helloMamaInfo.map((info, index) => (
            <News key={index} each={info} />
          ))}
        </div>
        <Link
          className="mt-3 border-b border-b-black font-light leading-none xl:mt-6"
          href="#"
        >
          Xem tất cả
        </Link>
      </section>
    </div>
  );
}
