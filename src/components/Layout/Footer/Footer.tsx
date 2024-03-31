import SecondaryLogo from "@/components/SecondaryLogo";

export default function Footer() {
  return (
    <footer className="flex h-72 w-full flex-col justify-center gap-6 border-t border-t-foreground/10 p-10 text-center text-xs xl:mb-8 xl:h-fit sm:px-4">
      <div className="flex items-center justify-center">
        <SecondaryLogo />
      </div>
      <p>
        Powered by{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>
      </p>
      <p className="mx-auto line-clamp-4 w-full overflow-ellipsis text-justify sm:max-w-full">
        Introducing our versatile Next.js web project template! Our Next.js web
        project template is designed to streamline the development process for
        your web projects. Built on top of Next.js, a powerful React framework,
        our template provides a solid foundation for creating modern and
        scalable web applications. Here are some key features of our template:
        1. Next.js Framework: Benefit from the capabilities of Next.js,
        including server-side rendering, automatic code splitting, and easy
        routing, to build fast and SEO-friendly web applications. 2. React
        Components: Leverage the power of React to create reusable UI
        components, making your codebase more modular and maintainable.
      </p>
      <nav className="mx-auto flex w-full flex-row justify-around sm:grid sm:grid-cols-2 sm:gap-3">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="rounded-md border border-foreground/5 px-2 py-2 hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="rounded-md border border-foreground/5 px-2 py-2 hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="rounded-md border border-foreground/5 px-2 py-2 hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="rounded-md border border-foreground/5 px-2 py-2 hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="rounded-md border border-foreground/5 px-2 py-2 hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>
      </nav>
    </footer>
  );
}
