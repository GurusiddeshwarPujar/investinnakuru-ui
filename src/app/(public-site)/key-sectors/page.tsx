import FooterInfo from "@/components/home/footerInfo";
import KeySector from "@/components/home/keySector";

export const metadata = {
  title: "Key Sectors | Invest In Nakuru",
  description:
    "Discover the key investment sectors in Nakuru County, Kenya. Explore high-potential opportunities in agribusiness, real estate, tourism, manufacturing, infrastructure, ICT, and renewable energy that drive sustainable growth and profitability.",
  keywords:
    "key investment sectors Nakuru, agribusiness investment Kenya, tourism opportunities Nakuru, real estate development Kenya, manufacturing investment Nakuru, ICT investment Kenya, renewable energy projects Nakuru, infrastructure investment Kenya, profitable sectors Kenya, Nakuru County growth industries",
};


export default function KeySectorsPage() {
  return (
    <>
      <section className="bg-gray-100 text-gray-800 py-11">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">
            Key Investment Sectors
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Explore the priority sectors where your investment can thrive and make a significant impact in Nakuru County.
          </p>
        </div>
      </section>
      <KeySector />
      <FooterInfo />
    </>
  );
}