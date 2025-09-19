import Image from "next/image";
import Link from "next/link";

export default function NewsEvent(){
    return (
        <div className="md:py-[90px] py-[60px]">
            <div className="container">
                <h2 className="text-center mb-7">News & Events</h2>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-7">
                    <div className="h-[100%]">
                        <div className="relative pb-[68%] overflow-hidden mb-5">
                            <Link href="#">
                                <Image src="/frontend/images/news/news-1.jpg" alt="News Title" className="absolute top-0 left-0 w-[100%] h-[100%] object-cover" width={375} height={250} />
                            </Link>
                        </div>
                        <p className="text-primary mb-3">Aug 14, 2025</p>
                        <h5 className="mb-3"><Link href="#" className="text-inherit">It is a long established fact that a reader will be readable content.</Link></h5>
                        <div className="description">
                            <p className="last:mb-0">The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
                        </div>
                    </div>
                    <div className="h-[100%]">
                        <div className="relative pb-[68%] overflow-hidden mb-5">
                            <Link href="#">
                                <Image src="/frontend/images/news/news-2.jpg" alt="News Title" className="absolute top-0 left-0 w-[100%] h-[100%] object-cover" width={375} height={250} />
                            </Link>
                        </div>
                        <p className="text-primary mb-3">Aug 14, 2025</p>
                        <h5 className="mb-3"><Link href="#" className="text-inherit">It is a long established fact that a reader will be readable content.</Link></h5>
                        <div className="description">
                            <p className="last:mb-0">The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
                        </div>
                    </div>
                    <div className="h-[100%]">
                        <div className="relative pb-[68%] overflow-hidden mb-5">
                            <Link href="#">
                                <Image src="/frontend/images/news/news-3.jpg" alt="News Title" className="absolute top-0 left-0 w-[100%] h-[100%] object-cover" width={375} height={250} />
                            </Link>
                        </div>
                        <p className="text-primary mb-3">Aug 14, 2025</p>
                        <h5 className="mb-3"><Link href="#" className="text-inherit">It is a long established fact that a reader will be readable content.</Link></h5>
                        <div className="description">
                            <p className="last:mb-0">The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here.</p>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <Link href="#" className="btn">View All News</Link>
                </div>   
            </div>
        </div>
    )
}