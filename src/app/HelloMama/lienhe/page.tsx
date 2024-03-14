import ContactForm from "./Components/ContactForm";
import { Button } from "../Shadcn/Button";

export default function page() {
  return (
    <div className="h-autop flex w-[1440px] flex-col items-center gap-10 pb-20 pt-10 xl:w-screen sm:gap-6">
      <h1 className="my-4 bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-3xl text-transparent sm:my-0">
        LIÊN HỆ
      </h1>
      <div className="flex flex-row gap-6 xl:flex-col">
        <ContactForm />
        <div className="w-[600px] pt-20 font-light text-[#1c1c1c] xl:pt-0 sm:w-full sm:px-6">
          Mọi thắc mắc và yêu cầu cần được hỗ trợ từ Hello Mama, hãy để lại
          thông tin liên hệ tại đây. Hello Mama sẽ xem xét và gửi phản hồi sớm
          nhất.
        </div>
      </div>
      <div className="relative sm:mx-3">
        <div className="absolute top-1/2 h-fit w-48 -translate-y-1/2 transform rounded-md bg-gradient-to-r from-[#CD9F2D] via-[#F7EF8A] to-[#EDC967] px-3 py-7 sm:hidden">
          <h3 className="bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-transparent">
            Địa chỉ
          </h3>
          <p className="line-clamp-4 overflow-ellipsis text-sm font-light text-[#1c1c1c]">
            Nguyễn Tất Thành, Phường Khai Quang, TP. Vĩnh Yên, Tỉnh Vĩnh Phúc
          </p>
          <h3 className="bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-transparent">
            Liên hệ
          </h3>
          <div className="text-sm font-light text-[#]">
            <p className="line-clamp-1 overflow-ellipsis">1900 066 878</p>
            <p className="line-clamp-1 overflow-ellipsis">024 777 66878</p>
            <p className="line-clamp-2 overflow-ellipsis">
              hellomama379@gmail.com
            </p>
          </div>
        </div>
        <div className="mb-3 hidden rounded-md bg-gradient-to-r from-[#CD9F2D] via-[#F7EF8A] to-[#EDC967] px-3 py-7 sm:block">
          <h3 className="bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-transparent">
            Địa chỉ
          </h3>
          <p className="line-clamp-4 overflow-ellipsis text-sm font-light text-[#1c1c1c]">
            Nguyễn Tất Thành, Phường Khai Quang, TP. Vĩnh Yên, Tỉnh Vĩnh Phúc
          </p>
          <h3 className="bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-transparent">
            Liên hệ
          </h3>
          <div className="text-sm font-light text-[#]">
            <p className="line-clamp-1 overflow-ellipsis">1900 066 878</p>
            <p className="line-clamp-1 overflow-ellipsis">024 777 66878</p>
            <p className="line-clamp-2 overflow-ellipsis">
              hellomama379@gmail.com
            </p>
          </div>
        </div>
        <div className="ml-36 overflow-hidden rounded-md sm:ml-0">
          <iframe
            title="Google Map"
            loading="lazy"
            className="h-[450px] w-[700px] xl:w-80 sm:w-full"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25450.220074060264!2d-73.99394831787105!3d40.74881787052166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259fd52b71453%3A0x6060c40f6d16208!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1638518228201!5m2!1sen!2sus"
          ></iframe>
        </div>
      </div>
      <hr className="w-[80vw] border-[0.8px] border-black sm:hidden"></hr>
      <div className="flex h-fit w-full flex-row items-center justify-center gap-6 xl:flex-col xl:px-16 sm:px-6">
        <h2 className="w-44 bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-3xl text-transparent">
          Câu hỏi thường gặp
        </h2>
        <div className="flex h-fit w-[700px] flex-col xl:w-full">
          <div className="h-fit font-light">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
            commodi sint, similique cupiditate possimus suscipit delectus illum
            eos iure magnam!
          </div>
          <div className="my-2 flex h-fit flex-row items-center gap-1 font-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
            <span>Làm thế nào để phân biệt sữa chính hãng và sữa giả?</span>
          </div>
          <div className="mb-2 flex h-fit flex-row items-center gap-1 font-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
            <span> Tôi cần chờ bao lâu mới nhận được đơn hàng?</span>
          </div>
          <p className="h-fit font-extralight">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
            commodi sint, similique cupiditate possimus suscipit delectus illum
            eos iure magnam!Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Minus commodi sint, similique cupiditate possimus suscipit
            delectus illum eos iure magnam!
          </p>
          <Button
            className="ml-auto mt-4 flex w-fit flex-row gap-1 px-8 sm:ml-0 sm:w-full"
            type="submit"
          >
            <span className="bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-transparent">
              FAQ's
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="url(#gradient)"
              className="h-4 w-4"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#1E588F" />
                  <stop offset="50%" stop-color="#0E7BB8" />
                  <stop offset="100%" stop-color="#0E7BB8" />
                </linearGradient>
              </defs>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
