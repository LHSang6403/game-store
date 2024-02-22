import type { ProductDescriptionType } from "@/utils/types";

export default function ProductDescription({
  description,
}: {
  description: ProductDescriptionType;
}) {
  const content = `
  //   <div class="">
  //     <h1 class="text-3xl text-center font-bold">Next-Gen Gaming Console</h1>
  //     <img src="/assets/images/gameSetup/g2.png" alt="Next-Gen Gaming Console" class="mx-auto my-8 rounded-lg shadow-lg" />
  //     <p class="text-lg leading-relaxed">
  //       Experience the future of gaming with our latest Next-Gen Gaming Console.
  //       With cutting-edge technology and unparalleled performance, immerse yourself
  //       in stunning graphics and seamless gameplay like never before.
  //     </p>
  //     <h2 class="text-2xl font-bold mt-6 mb-2">Main Features:</h2>
  //     <ul class="list-disc list-inside">
  //       <li>Powerful processor for lightning-fast performance</li>
  //       <li>High-definition graphics for lifelike visuals</li>
  //       <li>Immersive audio technology for a truly captivating experience</li>
  //       <li>Extensive library of games to choose from</li>
  //       <li>Streamlined user interface for effortless navigation</li>
  //     </ul>
  //     <h2 class="text-2xl font-bold mt-6 mb-2">Specifications:</h2>
  //     <table class="w-full mb-4">
  //       <tr>
  //         <td class="font-semibold">Processor:</td>
  //         <td>Next-Gen Processor X</td>
  //       </tr>
  //       <tr>
  //         <td class="font-semibold">Graphics:</td>
  //         <td>Advanced Graphics Engine Y</td>
  //       </tr>
  //       <tr>
  //         <td class="font-semibold">Memory:</td>
  //         <td>16GB RAM</td>
  //       </tr>
  //       <tr>
  //         <td class="font-semibold">Storage:</td>
  //         <td>1TB SSD</td>
  //       </tr>
  //       <tr>
  //         <td class="font-semibold">Connectivity:</td>
  //         <td>Wi-Fi 6, Bluetooth 5.2</td>
  //       </tr>
  //     </table>
  //     <p class="text-lg">Get ready to elevate your gaming experience to the next level!</p>
  //   </div>
  // `;

  return (
    <div className="h-fit min-h-screen w-full rounded-3xl bg-gradient-to-t from-accent px-16 py-10 !pt-0 xl:p-8 sm:p-4">
      <div
        dangerouslySetInnerHTML={{ __html: description.content || content }}
        className="mx-auto w-full px-6 sm:px-0"
      />
    </div>
  );
}
