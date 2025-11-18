import Image from "next/image";
import Link from "next/link";

export default function About(){
    return (
        <div className="md:pt-[70px] md:pb-[100px] pt-[50px] pb-[70px] bg-white">
            <div className="container">
                <div className="md:mb-[60px] mb-[50px] text-center">
                    <p className="text-[1.2rem]"><strong>InvestInNakuru.com</strong> is designed to make your investor journey simple, transparent, and rewarding. From discovering viable projects to accessing permits, tax incentives, and diaspora bonds, this platform is your direct connection to county-backed opportunities.</p>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-7 items-center">
                    <div className="p-0 m-0">
                        <Image src="/frontend/images/nakuru-team.png" alt="Nakuru team" width={570} height={700} />
                    </div>
                    <div className="p-0">
                        <h2 className="mb-6">Welcome to Nakuru: Kenya&nbsp;s Thriving Economic Powerhouse</h2>
                        <div className="description mb-6">
                            <p>Nestled in the heart of the majestic Great Rift Valley, Nakuru County is more than just a beautiful destination; it’s fast becoming a key economic hub in Kenya. Its wealth of natural resources, a young, innovative and educated workforce, and supportive leadership make it attractive for investors and new businesses.</p>
                            <p>With a vibrant entrepreneurial spirit, local businesses are flourishing and positioning Nakuru as a leading investment hub in East Africa. Key sectors, including geothermal energy, agro-processing, healthcare, tourism, real estate, and infrastructure, offer strong prospects for sustainable development and meaningful community advancement.</p>
                        </div>
                        <Link href="/about-us" className="btn">Read More</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}