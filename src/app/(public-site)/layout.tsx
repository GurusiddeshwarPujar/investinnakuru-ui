// import "./frontendcss.css"; 
// import { DM_Sans } from "next/font/google";
// import Header from "@/components/header/Header";
// import Footer from "@/components/header/footer";


// const dmSans = DM_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-dm-sans",
// });


// export default function PublicSiteLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//      <div
//       className={`${dmSans.variable} font-dm-sans font-normal text-black text-[16px] leading-[1.7]`}
//     >
//       <Header />
//       <main>{children}</main>
//       <Footer />
//     </div>
//   );
// }

// layout.tsx


"use client"; 

import "./frontendcss.css"; 
import { DM_Sans } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/header/footer";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";


const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});


const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function PublicSiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!siteKey) {
    console.error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set. reCAPTCHA will not function.");
    return (
      <div
        className={`${dmSans.variable} font-dm-sans font-normal text-black text-[16px] leading-[1.7]`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    // OPTIMIZATION: This loads the script ONCE globally and provides the context hook
    <GoogleReCaptchaProvider 
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true, 
        defer: true,
        appendTo: "body",
      }}
    >
      <div
        className={`${dmSans.variable} font-dm-sans font-normal text-black text-[16px] leading-[1.7]`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </GoogleReCaptchaProvider>
  );
}