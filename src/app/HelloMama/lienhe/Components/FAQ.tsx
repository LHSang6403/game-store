import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import Image from "next/image";
import { Button } from "../../Shadcn/Button";

export default function FAQ() {
  const questions = [
    {
      question: "Làm thế nào để phân biệt sữa chính hãng và sữa giả?",
      answer:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus commodi sint, similique cupiditate possimus suscipit delectus illum eos iure magnam!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus commodi sint, similique cupiditate possimus suscipit delectus illum eos iure magnam!",
    },
    {
      question: "Tôi cần chờ bao lâu mới nhận được đơn hàng?",
      answer:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus commodi sint, similique cupiditate possimus suscipit delectus illum eos iure magnam!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus commodi sint, similique cupiditate possimus suscipit delectus illum eos iure magnam!",
    },
  ];

  return (
    <div className="flex h-fit w-full flex-row items-center justify-between gap-6 xl:flex-col xl:px-16 sm:px-6">
      <h2 className="mb-auto w-48 bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-3xl text-transparent xl:text-center">
        Câu hỏi thường gặp
      </h2>
      <div className="flex h-fit w-[900px] flex-col xl:w-full sm:gap-2">
        <div className="mb-4 h-fit font-light xl:text-center">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
          commodi sint, similique cupiditate possimus suscipit delectus illum
          eos iure magnam!
        </div>
        <Accordion type="single" collapsible>
          {questions.map((question, index) => (
            <AccordionItem
              value={index.toString()}
              key={index}
              className="-mt-4 border-none"
            >
              <AccordionTrigger className="justify-start gap-2 font-light hover:no-underline sm:gap-0">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
                <span>{question.question}</span>
              </AccordionTrigger>
              <AccordionContent className="font-extralight">
                {question.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Button
          className="group ml-auto mr-4 mt-4 flex w-fit flex-row gap-1 px-8 xl:hidden"
          type="submit"
        >
          <span className="bg-gradient-to-b from-[#1E588F] via-[#0E7BB8] to-[#0E7BB8] bg-clip-text text-lg font-light text-transparent group-hover:text-white">
            FAQ's
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="url(#gradient)"
            className="h-5 w-5 group-hover:hidden"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            className="hidden h-5 w-5 group-hover:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
