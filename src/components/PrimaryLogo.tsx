import Image from "next/image";

export default function PrimaryLogo() {
  return (
    <div className="">
      <Image
        alt="2Win Shop"
        src="/assets/images/2win.png"
        width={90}
        height={90}
      />
    </div>
  );
}
