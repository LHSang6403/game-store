import Image from "next/image";

const NavItem = ({
  name,
  image,
  isTrigger,
}: {
  name: string;
  image: string;
  isTrigger: boolean;
}) => {
  return (
    <div
      className={`px-2 py-0.5 flex flex-row justify-start items-center text-[whitesmoke] text-sm font-extralight rounded-lg hover:text-[whitesmoke] ${
        isTrigger ? "w-28" : "w-32"
      }`}
    >
      <Image
        className="mr-2"
        src={image}
        alt="Navigation"
        layout="fix"
        width={26}
        height={26}
      />
      {name}
    </div>
  );
};

export default NavItem;
