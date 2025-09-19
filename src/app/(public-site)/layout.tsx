import "./frontendcss.css"; 
import { DM_Sans } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/header/footer";


const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});


export default function PublicSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // We apply the DM Sans font here to a wrapper div.
    // This will override the default 'Outfit' font from the root layout.
    <div
      className={`${dmSans.variable} font-dm-sans font-normal text-black text-[16px] leading-[1.7]`}
    >
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}