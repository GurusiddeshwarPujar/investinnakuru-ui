import Image from "next/image";
import Link from "next/link";
import FooterInfo from "@/components/home/footerInfo";
import { redirect } from "next/navigation"; 

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Why Nakuru | Invest In Nakuru",
  description:
    "Discover why Nakuru County is one of Kenya’s fastest-growing investment destinations. With strategic location, skilled workforce, infrastructure growth, tax incentives, and government support, Nakuru offers unmatched opportunities for investors and the diaspora.",
  keywords:
    "why invest in Nakuru, Nakuru County investment opportunities, Kenya fastest growing cities, business environment Nakuru, tax incentives Kenya, strategic investment location Kenya, infrastructure development Nakuru, diaspora investment Kenya, ease of doing business Nakuru, top investment destinations Kenya",
};


type CmsEntry={
     CmsText: string;
}

async function getwhynakuruContent(pageName:string):Promise<CmsEntry>{
    const baseUrl=process.env.NEXT_PUBLIC_BACKEND_API_URL;

    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_BACKEND_API_URL is not defined in .env.local");
    }

    const url = `${baseUrl}/api/cms/${pageName}`;

    try{
        const res=await fetch(url,{
            cache :"no-store",
        });

        if (res.status === 404) redirect("/error-404"); 
        if (res.status >= 500) redirect("/error-505");

        if(!res.ok){
             throw new Error(`Failed to fetch CMS content. Status: ${res.status}`);
        }

         return res.json();
    }
    catch (error) {
    console.error("CMS Fetch Error:", error);
    redirect("/error-505");
    return {
      CmsText: "<p>Content could not be loaded. Please try again later.</p>",
    };
  }
}

export default async function WhyNakuruPage() {

    const whynakuruEntry = await getwhynakuruContent("WhyNakuru");
  return (
    <>
  
      <section className="bg-gray-100 text-gray-800 py-11">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Why Invest in Nakuru?</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover the strategic advantages, thriving economy, and supportive ecosystem that make Nakuru County the premier investment destination in the heart of Kenya&apos;s Great Rift Valley.
          </p>
        </div>
      </section>
      <div className="md:py-[90px] py-[60px] bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto"> 
            <div className="md:w-1/2 md:float-right md:ml-8 mb-4">
              <Image 
                src="/frontend/images/why-nakuru-collage.jpg" 
                alt="Scenic view of Nakuru" 
                width={570} 
                height={500} 
                className="rounded-lg shadow-xl object-cover"
              />
            </div>
            <h2 className="mb-6">Why Invest in Nakuru County?</h2>
            <div className="description"
                 dangerouslySetInnerHTML={{ __html: whynakuruEntry.CmsText }}
            />
          </div>
        </div>
      </div>
      <div className="md:py-[90px] py-[60px] bg-gray text-center">
            <div className="container">
                <h2 className="mb-8">Why Invest In Nakuru.com?</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-7">
                           <div className="bg-white border-border border-1 border-solid p-7 h-[100%]">
                               <Image src="/frontend/images/icons/investment-support.svg" alt="Curated investment-ready projects with government support" width={80} height={80} className="mb-5 mx-auto" />
                               <div className="m-0">
                                   <p className="mb-0">Curated investment-ready projects with government support</p>
                               </div>
                          </div>
                          <div className="bg-white border-border border-1 border-solid p-7 h-[100%]">
                              <Image src="/frontend/images/icons/business-setup.svg" alt="One-stop access to licensing, permits, and business setup tools" width={80} height={80} className="mb-5 mx-auto" />
                               <div className="m-0">
                                 <p className="mb-0">One-stop access to licensing, permits, and business setup tools</p>
                              </div>
                           </div>
                          <div className="bg-white border-border border-1 border-solid p-7 h-[100%]">
                              <Image src="/frontend/images/icons/bonds.svg" alt="Diaspora and international investor programs, including the Nakuru Diaspora Bond" width={80} height={80} className="mb-5 mx-auto" />
                              <div className="m-0">
                                  <p className="mb-0">Diaspora and international investor programs, including the Nakuru Diaspora Bond</p>
                              </div>
                          </div>
                          <div className="bg-white border-border border-1 border-solid p-7 h-[100%]">
                              <Image src="/frontend/images/icons/guidance.svg" alt="Personalized guidance from the Nakuru County Investment Office" width={80} height={80} className="mb-5 mx-auto" />
                              <div className="m-0">
                                   <p className="mb-0">Personalized guidance from the Nakuru County Investment Office</p>
                              </div>
                           </div>
                    </div>
                    <div className="my-8 max-w-[770px] mx-auto">
                         <p>Whether you’re a start-up innovator, a global investor, a Kenyan in the diaspora, or a development partner—Nakuru warmly invites you to be part of its inclusive growth story.</p>
                        <p>Because when you invest in Nakuru, you&apos;re not just growing a business—you&apos;re building the future of Kenya.</p>
                    </div>
                    <div className="text-center">
                        <Link href="/contact" className="btn">Invest Now</Link>
                    </div>
            </div>
        </div>
    
      <div className="py-15 bg-secondary text-white text-center">
        <div className="container">
          <h2 className="mb-8">Nakuru by the Numbers</h2>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            <div>
              <h3 className="h1 font-bold">4th</h3>
              <p className="text-lg font-semibold uppercase">Largest County by GDP</p>
            </div>
            <div>
              <h3 className="h1 font-bold">2.1M+</h3>
              <p className="text-lg font-semibold uppercase">Educated & Young Population</p>
            </div>
            <div>
              <h3 className="h1 font-bold">Top 3</h3>
              <p className="text-lg font-semibold uppercase">Preferred Investment Hub</p>
            </div>
          </div>
        </div>
      </div>
      
     
      <FooterInfo />
    </>
  );
}