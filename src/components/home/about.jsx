import Image from "next/image";
import Link from "next/link";

export default function About(){
    return (
        <div className="md:pt-[70px] md:pb-[100px] pt-[50px] pb-[70px] bg-white">
            <div className="container">
                <div className="md:mb-[60px] mb-[50px] text-center">
                    <p>As the <strong>official investment platform of Nakuru County</strong>, InvestInNakuru.com is designed to make your investor journey simple, transparent, and rewarding. From discovering viable projects to accessing permits, tax incentives, and diaspora bonds, this platform is your direct connection to county-backed opportunities.</p>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-7 items-center">
                    <div className="p-0 m-0">
                        <Image src="/frontend/images/nakuru-team.png" alt="Nakuru team" width={570} height={700} />
                    </div>
                    <div className="p-0">
                        <h2 className="mb-6">Welcome to Nakuru — The Heartbeat of Opportunity</h2>
                        <div className="description mb-6">
                            <p>Nestled in the heart of the majestic Great Rift Valley, Nakuru County is more than just a beautiful destination—it's Kenya’s rising economic powerhouse. With its rich natural resources, investor-friendly leadership, and vibrant entrepreneurial spirit, Nakuru is fast becoming one of East Africa’s most dynamic hubs for sustainable and profitable investment.<br/>
                            Whether your interests lie in geothermal </p>
                            <p>energy, agroprocessing, healthcare, tourism, real estate, or infrastructure, Nakuru offers a unique blend of opportunity and impact—where your capital doesn’t just grow, it transforms communities.</p>
                        </div>
                        <Link href="#" className="btn">Read More About us</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}