import Link from "next/link";
import Template from "@app/(main)/template";
import AuthCardTabs from "@app/auth/Components/AuthCardTabs";
import PrimaryLogo from "@components/PrimaryLogo";

export default function Login() {
  return (
    <Template>
      <div className="flex min-h-screen w-screen flex-col items-center justify-center overflow-auto py-6 sm:h-auto sm:min-h-0 sm:pb-16">
        <PrimaryLogo />
        <h1 className="bg-gradient-to-r from-cblue to-cpurple bg-clip-text text-lg font-semibold text-transparent">
          Xác thực tài khoản
        </h1>
        <div className="flex h-fit w-fit flex-col gap-2 bg-background sm:w-full sm:px-2">
          <span className="w-auto">
            <Link
              href="/"
              className="group flex items-center rounded-md bg-btn-background px-4 py-2 text-sm text-foreground no-underline hover:bg-btn-background-hover"
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
              Trở về
            </Link>
          </span>
          <AuthCardTabs />
        </div>
      </div>
    </Template>
  );
}
