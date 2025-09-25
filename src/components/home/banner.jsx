'use client'; 

import { useState, useEffect } from 'react';
import SwiperInit from '@/components/header/SwiperInit';

export default function Banner() {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
    
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/admin/banners/listbanner`);
                if (!response.ok) {
                    throw new Error('Unable to fetch banner. Please try again later.');
                }
                const data = await response.json();
                setBanners(data); 
            } catch (err) {
                setError(err.message); 
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []); 

   
    if (loading) {
        return <div className="text-center p-10">Loading Banners...</div>;
    }

    
    if (error) {
        return <div className="text-center p-10 text-red-500">Error: {error}</div>;
    }
    
    
    if (banners.length === 0) {
        // return <div className="text-center p-10">No banners found.</div>;
         return null; 
    }

    return (
        <div className="hero-banner">
            <div className="hero-banner-slider swiper">
                <div className="swiper-wrapper">
                    {banners.map((banner) => (
                        <div className="swiper-slide" key={banner.BannerID}>
                            <div 
                                className="bg-cover bg-no-repeat bg-center md:min-h-[600px] min-h-[500px] flex items-center justify-center py-7 px-10 before:content-[''] before:absolute before:top-0 before:left-0 before:w-[100%] before:h-[100%] before:bg-black before:opacity-25 text-white text-center" 
                                
                                style={{ "backgroundImage" : `url(${process.env.NEXT_PUBLIC_BACKEND_API_URL}/images/banners/${banner.BannerImage})` }}
                            >
                                <div className="container relative z-10">
                                    <div className="max-w-[970px] mx-auto">
                                       
                                        {banner.BannerTitle && (
                                            <h2 className="h1 m-0">{banner.BannerTitle}</h2>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
              
                {banners.length > 1 && (
                    <>
                        <div className="swiper-button-prev">
                            <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.97776 14L2 7.55372M2 7.55372L7.97776 1M2 7.55372H18" stroke="currentcolor" strokeWidth="2"/></svg>
                        </div>
                        <div className="swiper-button-next">
                            <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0222 14L16 7.55372M16 7.55372L10.0222 1M16 7.55372H0" stroke="currentcolor" strokeWidth="2"/></svg>
                        </div>
                        <div className="swiper-pagination" />
                    </>
                )}
            </div>
            <SwiperInit />
        </div>
    )
}