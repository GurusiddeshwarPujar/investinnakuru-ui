import Image from "next/image";
import Link from "next/link";

import SwiperInit from "../header/SwiperInit";

export default function SuccessStories(){
    return (
        <div className="md:py-[90px] py-[60px] bg-gray">
            <div className="container">
                <h2 className="mb-7 text-center">Success Stories</h2>
                <div className="success-stories-slider swiper">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <div className="flex gap-6 md:flex-nowrap flex-wrap justify-center md:text-left text-center">
                                <div className="flex-auto shrink-0 grow-0 w-[30%]">
                                    <div className="relative pb-[100%] overflow-hidden rounded-[50%]">
                                        <Image src="/frontend/images/clients/client-1.png" alt="Rothar James" width={170} height={170} className="w-[100%] h-[100%] object-cover absolute top-0 left-0" />
                                    </div>
                                </div>
                                <div className="flex-auto grow">
                                    <div className="description">
                                        <p>“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s”</p>
                                    </div>
                                    <p className="font-bold text-[20px] mb-1">Rothar James</p>
                                    <p className="mb-0">Business Owner</p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="flex gap-6 md:flex-nowrap flex-wrap justify-center md:text-left text-center">
                                <div className="flex-auto shrink-0 grow-0 w-[30%]">
                                    <div className="relative pb-[100%] overflow-hidden rounded-[50%]">
                                        <Image src="/frontend/images/clients/client-2.png" alt="Rothar James" width={170} height={170} className="w-[100%] h-[100%] object-cover absolute top-0 left-0" />
                                    </div>
                                </div>
                                <div className="flex-auto grow">
                                    <div className="description">
                                        <p>“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s”</p>
                                    </div>
                                    <p className="font-bold text-[20px] mb-1">Rothar James</p>
                                    <p className="mb-0">Business Owner</p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="flex gap-6 md:flex-nowrap flex-wrap justify-center md:text-left text-center">
                                <div className="flex-auto shrink-0 grow-0 w-[30%]">
                                    <div className="relative pb-[100%] overflow-hidden rounded-[50%]">
                                        <Image src="/frontend/images/clients/client-2.png" alt="Rothar James" width={170} height={170} className="w-[100%] h-[100%] object-cover absolute top-0 left-0" />
                                    </div>
                                </div>
                                <div className="flex-auto grow">
                                    <div className="description">
                                        <p>“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s”</p>
                                    </div>
                                    <p className="font-bold text-[20px] mb-1">Rothar James</p>
                                    <p className="mb-0">Business Owner</p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="flex gap-6 md:flex-nowrap flex-wrap justify-center md:text-left text-center">
                                <div className="flex-auto shrink-0 grow-0 w-[30%]">
                                    <div className="relative pb-[100%] overflow-hidden rounded-[50%]">
                                        <Image src="/frontend/images/clients/client-1.png" alt="Rothar James" width={170} height={170} className="w-[100%] h-[100%] object-cover absolute top-0 left-0" />
                                    </div>
                                </div>
                                <div className="flex-auto grow">
                                    <div className="description">
                                        <p>“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s”</p>
                                    </div>
                                    <p className="font-bold text-[20px] mb-1">Rothar James</p>
                                    <p className="mb-0">Business Owner</p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="flex gap-6 md:flex-nowrap flex-wrap justify-center md:text-left text-center">
                                <div className="flex-auto shrink-0 grow-0 w-[30%]">
                                    <div className="relative pb-[100%] overflow-hidden rounded-[50%]">
                                        <Image src="/frontend/images/clients/client-1.png" alt="Rothar James" width={170} height={170} className="w-[100%] h-[100%] object-cover absolute top-0 left-0" />
                                    </div>
                                </div>
                                <div className="flex-auto grow">
                                    <div className="description">
                                        <p>“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s”</p>
                                    </div>
                                    <p className="font-bold text-[20px] mb-1">Rothar James</p>
                                    <p className="mb-0">Business Owner</p>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="flex gap-6 md:flex-nowrap flex-wrap justify-center md:text-left text-center">
                                <div className="flex-auto shrink-0 grow-0 w-[30%]">
                                    <div className="relative pb-[100%] overflow-hidden rounded-[50%]">
                                        <Image src="/frontend/images/clients/client-2.png" alt="Rothar James" width={170} height={170} className="w-[100%] h-[100%] object-cover absolute top-0 left-0" />
                                    </div>
                                </div>
                                <div className="flex-auto grow">
                                    <div className="description">
                                        <p>“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s”</p>
                                    </div>
                                    <p className="font-bold text-[20px] mb-1">Rothar James</p>
                                    <p className="mb-0">Business Owner</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-pagination" />
                </div>
            </div>
            <SwiperInit />
        </div>
    )
}