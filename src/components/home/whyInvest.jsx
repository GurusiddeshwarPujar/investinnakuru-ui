import Image from "next/image";
import Link from "next/link";

export default function WhyInvest(){
    return (
        <div className="md:py-[90px] py-[60px] bg-gray text-center">
            <div className="container">
                <h2 className="mb-8">Why Nakuru? </h2>
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
                    <p>Because when you invest in Nakuru, you're not just growing a business—you're building the future of Kenya.</p>
                </div>
                <div className="text-center">
                    <Link href="/contact" className="btn">Invest Now</Link>
                </div>
            </div>
        </div>
    )
}