"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		if (menuOpen) {
			document.body.classList.add("overflow-hidden");
			document.documentElement.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
			document.documentElement.classList.remove("overflow-hidden");
		}
	}, [menuOpen]);
	return (
		<>
			<div className="bg-secondary text-white py-2 md:block hidden">
				<div className="container">
					<ul className="flex flex-wrap justify-center font-interstate text-[16px] font-normal">
						<li className="after:content-['|'] after:mx-2 last:after:content-none">
							<Link href="/why-nakuru" className="text-white hover:underline">Why Nakuru</Link>
						</li>
						<li className="after:content-['|'] after:mx-2 last:after:content-none">
							<Link href="/about-us" className="text-white hover:underline">About Us</Link>
						</li>
						<li className="after:content-['|'] after:mx-2 last:after:content-none">
							<Link href="/incentives-support" className="text-white hover:underline">Incentives & Support</Link>
						</li>
						<li className="after:content-['|'] after:mx-2 last:after:content-none">
							<Link href="#" className="text-white hover:underline">Success Stories</Link>
						</li>
						<li className="after:content-['|'] after:mx-2 last:after:content-none">
							<Link href="#" className="text-white hover:underline">News & Events</Link>
						</li>
					</ul>
				</div>
			</div>
			<header className="py-4 relative">
				<div className="container">
					<div className="flex flex-nowrap items-center justify-between">
						<div className="flex-shrink">
							<Link href="/">
								<Image src="/frontend/images/logo.png" alt="Nakuru" width={127} height={70} className="md:max-w-[100%] max-w-[110px]"/>
							</Link>
						</div>

						<div className="flex flex-nowrap items-center justify-end gap-8">
							<ul className="hidden lg:flex flex-wrap justify-end items-center font-interstate font-bold p-0 m-0 list-none gap-8">
								<li>
									<Link href="/investment-opportunities">Investment Opportunities</Link>
								</li>
								<li>
									<Link href="/diaspora-engagement">Diaspora Engagement</Link>
								</li>
								<li>
									<Link href="/key-sectors">Key Sectors</Link>
								</li>
							</ul>

							<div className="hidden lg:flex gap-2.5">
								<Link href="/contact" className="btn">
									Contact Us
								</Link>
							</div>

							<div className="menu-bar-wpr lg:hidden">
								<button type="button" className={`menu-bar mr-3 ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}
								>
									<span className="bars bar1"></span>
									<span className="bars bar2"></span>
									<span className="bars bar3"></span>
								</button>
							</div>

						</div>
					</div>
				</div>
				<div className={`mobile-menu transition-opacity duration-300 ${ menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
					<div className="flex items-center h-full justify-center">
					<ul className="flex flex-col max-h-full overflow-auto gap-6 font-bold text-lg text-center w-full">
						<li>
							<Link href="/investment-opportunities">Investment Opportunities</Link>
						</li>
						<li>
							<Link href="/diaspora-engagement">Diaspora Engagement</Link>
						</li>
						<li>
							<Link href="/key-sectors">Key Sectors</Link>
						</li>
						<li>
							<Link href="/contact">Contact Us</Link>
						</li>
						<li>
							<Link href="/why-nakuru">Why Nakuru</Link>
						</li>
						<li>
							<Link href="/about-us">About Us</Link>
						</li>
						<li>
							<Link href="/incentives-support">Incentives & Support</Link>
						</li>
						<li>
							<Link href="#">Success Stories</Link>
						</li>
						<li>
							<Link href="#">News & Events</Link>
						</li>
					</ul>
					</div>
				</div>
			</header>
			
			
		</>
	)
}


