export default function KeyCards() {
  const keyValues = [
    {
      title: "Đa dạng",
      description:
        "Tại cửa hàng, chúng tôi cam kết cung cấp một loạt các sản phẩm từ các thương hiệu uy tín với giá cả cạnh tranh.",
    },
    {
      title: "Chuyên nghiệp",
      description:
        "Với đội ngũ nhân viên giàu kinh nghiệm và am hiểu, cửa hàng luôn ưu tiên dịch vụ chất lượng cao.",
    },
    {
      title: "Cạnh tranh",
      description:
        "Cửa hàng đang cung cấp chất lượng với mức giá cạnh tranh nhất trên thị trường.",
    },
    {
      title: "Chất lượng",
      description:
        "Chúng tôi ưu tiên chất lượng sản phẩm và dịch vụ, đảm bảo các mặt hàng là hàng chính hãng và mới 100%.",
    },
  ];

  return (
    <div className="grid h-auto w-full grid-cols-4 gap-4 xl:grid-cols-2 sm:grid-cols-1">
      {keyValues.map((key, index: number) => (
        <KeyCard key={index} data={key} />
      ))}
    </div>
  );
}

function KeyCard({ data }: { data: { title: string; description: string } }) {
  return (
    <div className="mxauto group col-span-1 rounded-lg border border-background/10 p-2 transition duration-300 ease-in-out hover:scale-[1.02] hover:cursor-pointer hover:bg-background/10 sm:w-full">
      <hr className="w-[36%] rounded border-accent/30"></hr>
      <div className="flex h-fit w-full flex-row gap-1.5">
        <h2 className="w-fit text-6xl text-accent transition duration-300 ease-in-out group-hover:text-background">
          {data.title.charAt(0)}
        </h2>
        <div className="h-fit w-full">
          <h2 className="text-2xl font-semibold text-accent/70 transition duration-300 ease-in-out group-hover:text-background">
            {data.title.slice(1)}
          </h2>
          <p className="line-clamp-3 h-fit w-full overflow-ellipsis text-sm text-accent/50 transition duration-300 ease-in-out group-hover:text-background">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
}
