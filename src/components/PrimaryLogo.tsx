import Image from "next/image";
import Link from "next/link";

export default function PrimaryLogo() {
  return (
    <Link href="/" className="">
      <Image
        alt="2Win Shop"
        src="/assets/images/2win.png"
        width={90}
        height={90}
      />
    </Link>
  );
}
