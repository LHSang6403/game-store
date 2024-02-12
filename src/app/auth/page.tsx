import Link from "next/link";
import AuthCardTabs from "@app/auth/components/AuthCardTabs";
import Template from "@app/(main)/template";

export default function Login() {
  return (
    <Template>
      <div className="w-screen min-h-screen sm:pt-10 sm:pb-16 overflow-auto flex flex-col justify-center items-center gap-2">
        <h1 className="text-lg font-semibold">App Authentication</h1>
        <div className="w-fit sm:w-full h-fit bg-background sm:px-2 flex flex-col gap-2">
          <span className="w-auto">
            <Link
              href="/"
              className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </Link>
          </span>
          <AuthCardTabs />
        </div>
      </div>
    </Template>
  );
}
