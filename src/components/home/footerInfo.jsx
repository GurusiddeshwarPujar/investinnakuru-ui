import Image from "next/image";
import Link from "next/link";

export default function FooterInfo(){
    return (
        <div className="py-15 bg-secondary text-white">
            <div className="container">
                <div className="max-w-[970px] mx-auto text-center mb-8">
                    <h2>Connecting Diaspora investors with Nakuru’s opportunities, fully supported by the County Government.</h2>
                </div>
                <div className="text-center">
                    <Link href="/diaspora-engagement" className="btn px-8 font-dm-sans">Read More</Link>
                </div>
            </div>
        </div>
    )
}
