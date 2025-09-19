import Image from "next/image";
import Link from "next/link";

export default function KeySector(){
    return (
        <div className="md:py-[90px] pt-[60px] pb-[80px] ">
            <div className="container">
                <h2 className="text-center mb-8">Key Sector to Invest</h2>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 text-center">
                    <Link href="#" className="relative bg-no-repeat bg-center bg-cover p-7 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-[100%] before:h-[40%] before:bg-linear-to-b before:from-trans before:to-black aspect-square hover:before:h-[100%] before:transition-[height] flex items-end justify-center text-white" style={{ "backgroundImage" : "url(/frontend/images/categories/agri.png)"}}>
                        <div className="relative z-10">
                            <h5 className="mb-0">Agribusiness</h5>
                        </div>
                    </Link>
                    <Link href="#" className="relative bg-no-repeat bg-center bg-cover p-7 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-[100%] before:h-[40%] before:bg-linear-to-b before:from-trans before:to-black aspect-square hover:before:h-[100%] before:transition-[height] flex items-end justify-center text-white" style={{ "backgroundImage" : "url(/frontend/images/categories/manufacturing.jpg)"}}>
                        <div className="relative z-10">
                            <h5 className="mb-0">Manufacturing</h5>
                        </div>
                    </Link>
                    <Link href="#" className="relative bg-no-repeat bg-center bg-cover p-7 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-[100%] before:h-[40%] before:bg-linear-to-b before:from-trans before:to-black aspect-square hover:before:h-[100%] before:transition-[height] flex items-end justify-center text-white" style={{ "backgroundImage" : "url(/frontend/images/categories/real-estate.jpg)"}}>
                        <div className="relative z-10">
                            <h5 className="mb-0">Real Estate</h5>
                        </div>
                    </Link>
                    <Link href="#" className="relative bg-no-repeat bg-center bg-cover p-7 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-[100%] before:h-[40%] before:bg-linear-to-b before:from-trans before:to-black aspect-square hover:before:h-[100%] before:transition-[height] flex items-end justify-center text-white" style={{ "backgroundImage" : "url(/frontend/images/categories/tour.jpg)"}}>
                        <div className="relative z-10">
                            <h5 className="mb-0">Tourism & Hospitality</h5>
                        </div>
                    </Link>
                    <Link href="#" className="relative bg-no-repeat bg-center bg-cover p-7 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-[100%] before:h-[40%] before:bg-linear-to-b before:from-trans before:to-black aspect-square hover:before:h-[100%] before:transition-[height] flex items-end justify-center text-white" style={{ "backgroundImage" : "url(/frontend/images/categories/renewable.jpg)"}}>
                        <div className="relative z-10">
                            <h5 className="mb-0">Renewable Energy</h5>
                        </div>
                    </Link>
                    <Link href="#" className="relative bg-no-repeat bg-center bg-cover p-7 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-[100%] before:h-[40%] before:bg-linear-to-b before:from-trans before:to-black aspect-square hover:before:h-[100%] before:transition-[height] flex items-end justify-center text-white" style={{ "backgroundImage" : "url(/frontend/images/categories/ict.jpg)"}}>
                        <div className="relative z-10">
                            <h5 className="mb-0">ICT & Innovation</h5>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}