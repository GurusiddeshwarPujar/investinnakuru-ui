import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container">
        <div className="py-16 overflow-hidden">
          <div className="flex flex-wrap -m-7">
            {/* Useful Links */}
            <div className="md:w-[26%] w-[50%] p-7">
              <h6 className="text-[16px] font-bold uppercase mb-2">Useful Links</h6>
              <ul className="p-0 m-0 list-none">
                <li className="not-last:mb-2">
                  <Link href="/investment-opportunities" className="text-inherit underline-offset-3 hover:underline">Investment Opportunities</Link>
                </li>
                <li className="not-last:mb-2">
                  <Link href="/diaspora-engagement" className="text-inherit underline-offset-3 hover:underline">Diaspora Engagement</Link>
                </li>
                <li className="not-last:mb-2">
                  <Link href="#" className="text-inherit underline-offset-3 hover:underline">Key Sectors</Link>
                </li>
                <li className="not-last:mb-2">
                  <Link href="#" className="text-inherit underline-offset-3 hover:underline">Incentives & Support</Link>
                </li>
                <li className="not-last:mb-2">
                  <Link href="#" className="text-inherit underline-offset-3 hover:underline">Success Stories</Link>
                </li>
              </ul>
            </div>

            {/* About Us */}
            <div className="md:w-[26%] w-[50%] p-7">
              <h6 className="text-[16px] font-bold uppercase mb-2">About us</h6>
              <ul className="p-0 m-0 list-none">
                <li className="not-last:mb-2">
                  <Link href="/" className="text-inherit underline-offset-3 hover:underline">Home</Link>
                </li>
                <li className="not-last:mb-2">
                  <Link href="/why-nakuru" className="text-inherit underline-offset-3 hover:underline">Why Nakuru</Link>
                </li>
                <li className="not-last:mb-2">
                  <Link href="/about-us" className="text-inherit underline-offset-3 hover:underline">About Us</Link>
                </li>
                <li className="not-last:mb-2">
                  <Link href="#" className="text-inherit underline-offset-3 hover:underline">News & Events</Link>
                </li>
                <li className="not-last:mb-2">
                  <Link href="/contact" className="text-inherit underline-offset-3 hover:underline">Contact Us</Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="md:w-[38%] w-full p-7">
              <Link href="mailto:diaspora@investinnakuru.com" className="flex flex-nowrap not-last:mb-15 leading-[1]">
                <div className="md:w-[60px] md:h-[60px] w-[50px] h-[50px] flex items-center justify-center border-[#ffffff4d] border border-solid rounded-full md:mr-5 mr-3 flex-shrink-0">
                  <Image src="/frontend/images/icons/mail.svg" alt="Email Us" width={24} height={20} />
                </div>
                <div className="flex-grow">
                  <p className="uppercase mb-1 font-bold">Email us at:</p>
                  <p className="mb-0 md:text-[28px] text-[24px] font-bold">diaspora@invest innakuru.com</p>
                </div>
              </Link>

              <Link href="https://wa.me/+254712000000" className="flex flex-nowrap not-last:mb-15 leading-[1] mt-5">
                <div className="md:w-[60px] md:h-[60px] w-[50px] h-[50px] flex items-center justify-center border-[#ffffff4d] border border-solid rounded-full md:mr-5 mr-3 flex-shrink-0">
                  <Image src="/frontend/images/icons/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
                </div>
                <div className="flex-grow">
                  <p className="uppercase mb-1 font-bold">WhatsApp:</p>
                  <p className="mb-0 md:text-[28px] text-[24px] font-bold">+254 712 000 000</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="py-4 grid md:grid-cols-3 grid-cols-1 border-t border-[#ffffff4d] gap-2">
          <p className="mb-0 md:order-first order-last">© 2025 Invest In Nakuru. All Rights Reserved</p>
          <p className="mb-0 text-center">
            <Link href="#" className="underline-offset-3 hover:underline">Terms & Conditions</Link> |{" "}
            <Link href="#" className="underline-offset-3 hover:underline">Privacy Policy</Link>
          </p>
          <div className="social-links md:order-last order-first">
            <ul className="flex md:justify-end justify-center mb-0 p-0 m-0 list-none gap-2">
                <li>
                  <Link href="#">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.38323 0 0 5.38323 0 12C0 18.6163 5.38323 24 12 24C18.6163 24 24 18.6163 24 12C24 5.38323 18.6173 0 12 0ZM14.9843 12.4225H13.032V19.381H10.139V12.4225H8.76388V9.9631H10.139V8.37235C10.139 7.23306 10.6804 5.45283 13.0586 5.45283L15.2023 5.46105V7.84838H13.6463C13.3931 7.84838 13.0329 7.97503 13.0329 8.51833V9.96359H15.2371L14.9843 12.4225Z" fill="white"/>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C18.6272 0 24 5.37281 24 12C24 18.6272 18.6272 24 12 24C5.37281 24 0 18.6272 0 12C5.15461e-07 5.37281 5.37281 5.15446e-07 12 0ZM10.4873 12.7832L5.10059 19.0449H6.31738L11.0283 13.5693L14.791 19.0449H18.8994L13.3125 10.9141L18.4502 4.94238H17.2324L12.7725 10.1279L9.20898 4.94238H5.10059L10.4873 12.7832ZM17.2334 18.1699H15.3633L6.75684 5.85938H8.62598L17.2334 18.1699Z" fill="white"/>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.37361 0 0 5.37361 0 12C0 18.6264 5.37361 24 12 24C18.6264 24 24 18.6264 24 12C24 5.37361 18.6264 0 12 0ZM8.51297 18.1406H5.59041V9.34809H8.51292L8.51297 18.1406ZM7.05173 8.14744H7.0327C6.05198 8.14744 5.41772 7.47234 5.41772 6.62859C5.41772 5.76581 6.07139 5.10938 7.07119 5.10938C8.07094 5.10938 8.68617 5.76581 8.7052 6.62859C8.7052 7.47234 8.07094 8.14748 7.05173 8.14748V8.14744ZM19.0511 18.1406H16.1289V13.4368C16.1289 12.2547 15.7058 11.4485 14.6483 11.4485C13.841 11.4485 13.3602 11.9923 13.1489 12.5173C13.0716 12.7051 13.0527 12.9677 13.0527 13.2305V18.1406H10.1303C10.1303 18.1406 10.1686 10.173 10.1303 9.34809H13.0527V10.593C13.4411 9.99394 14.136 9.14175 15.6865 9.14175C17.6093 9.14175 19.0511 10.3984 19.0511 13.099V18.1406Z" fill="white"/>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.3358 13.9358L13.6642 12.0047L10.3358 10.0642V13.9358Z" fill="white"/>
                      <path d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21508 0.913451 7.4078C0.00519946 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.807 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0865C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6934 24 14.3734 24 12C24 8.8174 22.7357 5.76515 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0ZM18.3158 14.1237C18.316 14.4375 18.2544 14.7484 18.1344 15.0384C18.0144 15.3284 17.8385 15.5919 17.6166 15.8139C17.3948 16.0359 17.1314 16.2121 16.8414 16.3322C16.5515 16.4524 16.2407 16.5142 15.9268 16.5142H8.07316C7.75931 16.5142 7.44853 16.4524 7.15859 16.3322C6.86864 16.2121 6.60522 16.0359 6.38336 15.8139C6.16151 15.5919 5.98557 15.3284 5.86561 15.0384C5.74565 14.7484 5.68401 14.4375 5.68421 14.1237V9.87631C5.68401 9.56246 5.74565 9.25164 5.86561 8.96162C5.98557 8.6716 6.16151 8.40805 6.38336 8.18605C6.60522 7.96405 6.86864 7.78794 7.15859 7.66779C7.44853 7.54763 7.75931 7.48579 8.07316 7.48579H15.9268C16.2407 7.48579 16.5515 7.54763 16.8414 7.66779C17.1314 7.78794 17.3948 7.96405 17.6166 8.18605C17.8385 8.40805 18.0144 8.6716 18.1344 8.96162C18.2544 9.25164 18.316 9.56246 18.3158 9.87631V14.1237Z" fill="white"/>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.2969 12C14.2969 13.2686 13.2685 14.2969 12 14.2969C10.7315 14.2969 9.70312 13.2685 9.70312 12C9.70312 10.7315 10.7315 9.70312 12 9.70312C13.2685 9.70312 14.2969 10.7315 14.2969 12Z" fill="white"/>
                      <path d="M17.3716 7.93617C17.2611 7.63687 17.085 7.36612 16.8562 7.14384C16.6339 6.91495 16.3632 6.73882 16.0638 6.62841C15.821 6.53414 15.4563 6.42188 14.7845 6.39131C14.0577 6.35817 13.8398 6.351 12 6.351C10.16 6.351 9.94209 6.35798 9.21553 6.39112C8.54372 6.42187 8.17875 6.53409 7.93617 6.62841C7.63682 6.73877 7.36606 6.91491 7.14384 7.14384C6.91495 7.36613 6.73877 7.63687 6.62822 7.93617C6.53395 8.17898 6.42169 8.54391 6.39113 9.21572C6.35799 9.94228 6.35081 10.1602 6.35081 12.0002C6.35081 13.84 6.35799 14.0579 6.39113 14.7847C6.42169 15.4565 6.53395 15.8212 6.62822 16.064C6.7387 16.3633 6.91482 16.634 7.14366 16.8563C7.3659 17.0852 7.63666 17.2614 7.93598 17.3718C8.1788 17.4662 8.54372 17.5785 9.21553 17.6091C9.94209 17.6422 10.1598 17.6492 11.9998 17.6492C13.84 17.6492 14.0579 17.6422 14.7843 17.6091C15.4561 17.5785 15.8211 17.4662 16.0638 17.3718C16.361 17.2571 16.6309 17.0816 16.8561 16.8563C17.0814 16.6311 17.257 16.3612 17.3716 16.064C17.4659 15.8212 17.5781 15.4565 17.6089 14.7847C17.642 14.0579 17.649 13.84 17.649 12.0002C17.649 10.1602 17.642 9.94228 17.6089 9.21572C17.5783 8.54391 17.466 8.17894 17.3716 7.93617ZM12 15.5384C10.0457 15.5384 8.4615 13.9543 8.4615 12C8.4615 10.0457 10.0457 8.46169 12 8.46169C13.9541 8.46169 15.5383 10.0457 15.5383 12C15.5383 13.9543 13.9541 15.5384 12 15.5384ZM15.6782 9.14869C15.2216 9.14869 14.8514 8.77842 14.8514 8.32181C14.8514 7.8652 15.2216 7.49489 15.6782 7.49489C16.1349 7.49489 16.5051 7.86511 16.5051 8.32177C16.5049 8.77842 16.1349 9.14869 15.6782 9.14869Z" fill="white"/>
                      <path d="M12 0C5.37361 0 0 5.37361 0 12C0 18.6264 5.37361 24 12 24C18.6264 24 24 18.6264 24 12C24 5.37361 18.6264 0 12 0ZM18.849 14.8409C18.8158 15.5744 18.6991 16.0752 18.5288 16.5135C18.3518 16.9713 18.0811 17.387 17.734 17.734C17.387 18.0811 16.9713 18.3518 16.5135 18.5288C16.0754 18.6991 15.5744 18.8155 14.841 18.849C14.1063 18.8826 13.8715 18.8906 12.0002 18.8906C10.1287 18.8906 9.89409 18.8826 9.15909 18.849C8.42578 18.8155 7.92483 18.6991 7.48659 18.5288C7.02676 18.3558 6.61022 18.0845 6.26606 17.7339C5.91557 17.3898 5.64437 16.9733 5.47139 16.5135C5.30109 16.0754 5.18447 15.5744 5.15114 14.841C5.11725 14.106 5.10938 13.8713 5.10938 12C5.10938 10.1287 5.11725 9.89391 5.15095 9.15914C5.18423 8.42559 5.30072 7.92483 5.47102 7.48645C5.64405 7.02665 5.91537 6.61016 6.26602 6.26606C6.61013 5.91545 7.02664 5.64418 7.48645 5.4712C7.92483 5.30091 8.42559 5.18447 9.15914 5.15095C9.89391 5.11744 10.1287 5.10938 12 5.10938C13.8713 5.10938 14.1061 5.11744 14.8409 5.15109C15.5744 5.18447 16.0752 5.30091 16.5135 5.47102C16.9734 5.64409 17.39 5.91539 17.7342 6.26602C18.0847 6.61018 18.3559 7.02668 18.5288 7.48645C18.6993 7.92483 18.8157 8.42559 18.8492 9.15914C18.8827 9.89391 18.8906 10.1287 18.8906 12C18.8906 13.8713 18.8827 14.1061 18.849 14.8409Z" fill="white"/>
                    </svg>
                  </Link>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
