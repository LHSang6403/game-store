import Image from "next/image";

const Header = () => {
  return (
    <nav className="w-full h-12 flex flex-row justify-between px-10">
      <span className="flex flex-row gap-2">
        <Image
          src="/assets/logo/app.png"
          alt="Search"
          layout="fix"
          width={100}
          height={40}
        />
        <h1 className="h-full flex justify-center items-center text-yellow-500 font-bold text-xl">
          Hobby Store
        </h1>
        <span>
          <h1 className="h-full w-fit ml-16 flex justify-center items-center font-bold text-xl text-white">
            Good day, Sang!
          </h1>
        </span>
      </span>

      <span className="flex flex-row justify-center items-center gap-4">
        <Image
          src="/assets/icons/search.png"
          alt="Notification"
          layout="fix"
          width={22}
          height={22}
        />
        <Image
          src="/assets/icons/notification.png"
          alt="Personal account"
          layout="fix"
          width={22}
          height={22}
        />
        <Image
          className="border-2 border-foreground rounded-full"
          src="/assets/icons/person.png"
          alt="Person logo"
          layout="fix"
          width={40}
          height={40}
        />
      </span>
    </nav>
  );
};

export default Header;
