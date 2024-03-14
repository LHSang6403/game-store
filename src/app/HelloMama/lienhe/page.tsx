import ContactForm from "./Components/ContactForm";
import FAQ from "./Components/FAQ";
import MapSection from "./Components/MapSection";

export default function page() {
  return (
    <div className="xl:max-w-screen flex h-auto max-w-[1440px] flex-col items-center gap-10 pb-20 pt-10 sm:w-screen sm:gap-6">
      <h1 className="bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-3xl text-transparent">
        LIÊN HỆ
      </h1>
      <div className="flex w-full flex-row gap-6 xl:flex-col xl:items-center">
        <ContactForm />
        <div className="w-[600px] pt-20 font-light text-[#1c1c1c] xl:pt-0 xl:text-center sm:w-full sm:px-4">
          Mọi thắc mắc và yêu cầu cần được hỗ trợ từ Hello Mama, hãy để lại
          thông tin liên hệ tại đây. Hello Mama sẽ xem xét và gửi phản hồi sớm
          nhất.
        </div>
      </div>
      <MapSection />
      <hr className="w-full border-[0.8px] border-black xl:hidden"></hr>
      <FAQ />
    </div>
  );
}
