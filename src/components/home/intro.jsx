import Image from "next/image";
import Link from "next/link";

export default function Intro(){
    return (
        <div className="relative bg-cover bg-center bg-no-repeat md:min-h-[600px] min-h-[500px] flex items-center justify-center py-10 before:content-[''] before:absolute before:top-0 before:left-0 before:w-[100%] before:h-[100%] before:bg-black before:opacity-25" style={{ "backgroundImage" : "url(/frontend/images/intro-section-bg.png)" }}>
            <div className="container relative z-10">
                <div className="text-center text-white max-w-[770px] mx-auto">
                    <h2 className="mb-7">Young innovative educated workforce</h2>
                    <Link href="#" className="btn">Read More</Link>
                </div>
            </div>
        </div>
    )
}