// "use client";

// import { useState, useEffect } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";

// type ContactFormInputs = {
//   ContactName: string;
//   ContactEmail: string;
//   ContactPhoneNumber: string;
//   ContactSubject: string;
//   ContactMessage: string;
// };

// type NewsletterFormInputs = {
//   EmailAddress: string;
// };

// export default function ContactPage() {
//   const [contactStatus, setContactStatus] = useState<string | null>(null);
//   const [contactLoading, setContactLoading] = useState(false);

//   const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);
//   const [newsletterLoading, setNewsletterLoading] = useState(false);

//   const {
//     register: registerContact,
//     handleSubmit: handleSubmitContact,
//     formState: { errors: contactErrors },
//     reset: resetContact,
//   } = useForm<ContactFormInputs>();

//   const {
//     register: registerNewsletter,
//     handleSubmit: handleSubmitNewsletter,
//     formState: { errors: newsletterErrors },
//     reset: resetNewsletter,
//   } = useForm<NewsletterFormInputs>();

//   const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

 
//   useEffect(() => {
//     if (contactStatus) {
//       const timer = setTimeout(() => setContactStatus(null), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [contactStatus]);


//   useEffect(() => {
//     if (newsletterStatus) {
//       const timer = setTimeout(() => setNewsletterStatus(null), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [newsletterStatus]);

//   // Contact form submission
//   const onSubmitContact: SubmitHandler<ContactFormInputs> = async (data) => {
//     setContactLoading(true);
//     setContactStatus(null);

//     try {
//       const contacturl = `${baseUrl}/api/contacts`;
//       const res = await fetch(contacturl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       const text = await res.text();
//       let responseData: any = {};
//       try {
//         responseData = JSON.parse(text);
//       } catch {
//         responseData = { msg: text };
//         console.warn("Response is not JSON:", text);
//       }

//       if (res.ok) {
//         setContactStatus("Message sent successfully!");
//         resetContact();
//       } else {
//         setContactStatus(responseData?.msg || "Failed to send message.");
//       }
//     } catch (err) {
//       console.error(err);
//       setContactStatus("Server error. Please try again.");
//     } finally {
//       setContactLoading(false);
//     }
//   };

//   // Newsletter form submission
//   const onSubmitNewsletter: SubmitHandler<NewsletterFormInputs> = async (
//     data
//   ) => {
//     setNewsletterLoading(true);
//     setNewsletterStatus(null);

//     try {
//       const letterurl = `${baseUrl}/api/newslettersubscriber`;
//       const res = await fetch(letterurl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       const text = await res.text();
//       let responseData: any = {};
//       try {
//         responseData = JSON.parse(text);
//       } catch {
//         responseData = { msg: text };
//         console.warn("Response is not JSON:", text);
//       }

//       if (res.ok) {
//         setNewsletterStatus("Subscribed successfully!");
//         resetNewsletter();
//       } else {
//         setNewsletterStatus(responseData?.msg || "Failed to subscribe.");
//       }
//     } catch (err) {
//       console.error(err);
//       setNewsletterStatus("Server error. Please try again.");
//     } finally {
//       setNewsletterLoading(false);
//     }
//   };

//   return (
//     <>
     
//       <section className="bg-gray-50 py-14 shadow-inner">
//         <div className="container mx-auto text-center px-4">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             We're here to help. Reach out to us with your questions or to start
//             your investment journey.
//           </p>
//         </div>
//       </section>

     
//       <div className="md:py-[90px] py-[60px] bg-white">
//         <div className="container">
//           <div className="max-w-4xl mx-auto">
//             <form
//               className="contact-form grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
//               onSubmit={handleSubmitContact(onSubmitContact)}
//             >
             
//               <div className="form-group">
//                 <label htmlFor="ContactName" className="form-label">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="ContactName"
//                   className="input-field"
//                   placeholder="John Doe"
//                   {...registerContact("ContactName", {
//                     required: "Please enter full name.",
//                   })}
//                 />
//                 {contactErrors.ContactName && (
//                   <p className="text-red-600 mt-1">
//                     {contactErrors.ContactName.message}
//                   </p>
//                 )}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="ContactEmail" className="form-label">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="ContactEmail"
//                   className="input-field"
//                   placeholder="you@example.com"
//                   {...registerContact("ContactEmail", {
//                     required: "Please enter email address.",
//                     pattern: {
//                       value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                       message: "Invalid email address",
//                     },
//                   })}
//                 />
//                 {contactErrors.ContactEmail && (
//                   <p className="text-red-600 mt-1">
//                     {contactErrors.ContactEmail.message}
//                   </p>
//                 )}
//               </div>

         
//               <div className="form-group">
//                 <label htmlFor="ContactPhoneNumber" className="form-label">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   id="ContactPhoneNumber"
//                   className="input-field"
//                   placeholder="0712000000"
//                   {...registerContact("ContactPhoneNumber", {
//                     required: "Please enter phone number",
//                     pattern: {
//                       value: /^[0-9]{10}$/,
//                       message: "Phone number must be exactly 10 digits",
//                     },
//                   })}
//                 />
//                 {contactErrors.ContactPhoneNumber && (
//                   <p className="text-red-600 mt-1">
//                     {contactErrors.ContactPhoneNumber.message}
//                   </p>
//                 )}
//               </div>

             
//               <div className="form-group">
//                 <label htmlFor="ContactSubject" className="form-label">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   id="ContactSubject"
//                   className="input-field"
//                   placeholder="Investment Inquiry"
//                   {...registerContact("ContactSubject", {
//                     required: "Please enter subject.",
//                   })}
//                 />
//                 {contactErrors.ContactSubject && (
//                   <p className="text-red-600 mt-1">
//                     {contactErrors.ContactSubject.message}
//                   </p>
//                 )}
//               </div>

//               {/* Description */}
//               <div className="form-group md:col-span-2">
//                 <label htmlFor="ContactMessage" className="form-label">
//                   Message
//                 </label>
//                 <textarea
//                   id="ContactMessage"
//                   rows={5}
//                   className="input-field"
//                   placeholder="Tell us more about your needs..."
//                   {...registerContact("ContactMessage", {
//                     required: "Please enter message.",
//                   })}
//                 ></textarea>
//                 {contactErrors.ContactMessage && (
//                   <p className="text-red-600 mt-1">
//                     {contactErrors.ContactMessage.message}
//                   </p>
//                 )}
//               </div>

//               {/* Submit */}
//               <div className="text-center md:col-span-2 mt-4">
//                 <button
//                   type="submit"
//                   className="btn px-12 py-4 text-lg"
//                   disabled={contactLoading}
//                 >
//                   {contactLoading ? "Sending..." : "Submit Message"}
//                 </button>
//                 {contactStatus && (
//                   <p className="mt-2 text-green-600">{contactStatus}</p>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Newsletter Section */}
//       <div className="py-16 bg-secondary text-white">
//         <div className="container">
//           <div className="max-w-3xl mx-auto text-center">
//             <h2 className="mb-4 text-2xl font-bold">Stay Updated</h2>
//             <p className="mb-8">
//               Subscribe to our newsletter for the latest investment news,
//               project updates, and events in Nakuru County.
//             </p>
//             <form
//               className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
//               onSubmit={handleSubmitNewsletter(onSubmitNewsletter)}
//             >
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="input-field flex-grow"
//                 {...registerNewsletter("EmailAddress", {
//                   required: "Please enter email address.",
//                   pattern: {
//                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                     message: "Invalid email address",
//                   },
//                 })}
//               />
//               <button
//                 type="submit"
//                 className="btn px-8"
//                 disabled={newsletterLoading}
//               >
//                 {newsletterLoading ? "Subscribing..." : "Subscribe"}
//               </button>
//             </form>
//             {newsletterErrors.EmailAddress && (
//               <p className="text-red-200 mt-2">
//                 {newsletterErrors.EmailAddress.message}
//               </p>
//             )}
//             {newsletterStatus && (
//               <p className="mt-2 text-green-200">{newsletterStatus}</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type ContactFormInputs = {
  ContactName: string;
  ContactEmail: string;
  ContactPhoneNumber: string;
  ContactSubject: string;
  ContactMessage: string;
};

type NewsletterFormInputs = {
  EmailAddress: string;
};

type ApiResponse = {
  msg?: string;
  [key: string]: unknown;
};

export default function ContactPage() {
  const [contactStatus, setContactStatus] = useState<string | null>(null);
  const [contactLoading, setContactLoading] = useState(false);

  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    formState: { errors: contactErrors },
    reset: resetContact,
  } = useForm<ContactFormInputs>();

  const {
    register: registerNewsletter,
    handleSubmit: handleSubmitNewsletter,
    formState: { errors: newsletterErrors },
    reset: resetNewsletter,
  } = useForm<NewsletterFormInputs>();

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  // Fade out contact status after 5s
  useEffect(() => {
    if (contactStatus) {
      const timer = setTimeout(() => setContactStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [contactStatus]);

  // Fade out newsletter status after 5s
  useEffect(() => {
    if (newsletterStatus) {
      const timer = setTimeout(() => setNewsletterStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [newsletterStatus]);

  // Contact form submission
  const onSubmitContact: SubmitHandler<ContactFormInputs> = async (data) => {
    setContactLoading(true);
    setContactStatus(null);

    try {
      const contacturl = `${baseUrl}/api/contacts`;
      const res = await fetch(contacturl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const text = await res.text();
      let responseData: ApiResponse = {};
      try {
        responseData = JSON.parse(text);
      } catch {
        responseData = { msg: text };
        console.warn("Response is not JSON:", text);
      }

      if (res.ok) {
        setContactStatus("Message sent successfully!");
        resetContact();
      } else {
        setContactStatus(responseData?.msg || "Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setContactStatus("Server error. Please try again.");
    } finally {
      setContactLoading(false);
    }
  };

  // Newsletter form submission
  const onSubmitNewsletter: SubmitHandler<NewsletterFormInputs> = async (
    data
  ) => {
    setNewsletterLoading(true);
    setNewsletterStatus(null);

    try {
      const letterurl = `${baseUrl}/api/newslettersubscriber`;
      const res = await fetch(letterurl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const text = await res.text();
      let responseData: ApiResponse = {};
      try {
        responseData = JSON.parse(text);
      } catch {
        responseData = { msg: text };
        console.warn("Response is not JSON:", text);
      }

      if (res.ok) {
        setNewsletterStatus("Subscribed successfully!");
        resetNewsletter();
      } else {
        setNewsletterStatus(responseData?.msg || "Failed to subscribe.");
      }
    } catch (err) {
      console.error(err);
      setNewsletterStatus("Server error. Please try again.");
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100 text-gray-800 py-11">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We&apos;re here to help. Reach out to us with your questions or to
            start your investment journey.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <div className="md:py-[90px] py-[60px] bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <form
              className="contact-form grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
              onSubmit={handleSubmitContact(onSubmitContact)}
            >
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="ContactName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="ContactName"
                  className="input-field"
                  placeholder="John Doe"
                  {...registerContact("ContactName", {
                    required: "Please enter full name.",
                  })}
                />
                {contactErrors.ContactName && (
                  <p className="text-red-600 mt-1">
                    {contactErrors.ContactName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="ContactEmail" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="ContactEmail"
                  className="input-field"
                  placeholder="you@example.com"
                  {...registerContact("ContactEmail", {
                    required: "Please enter email address.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {contactErrors.ContactEmail && (
                  <p className="text-red-600 mt-1">
                    {contactErrors.ContactEmail.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="ContactPhoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="ContactPhoneNumber"
                  className="input-field"
                  placeholder="0712000000"
                  {...registerContact("ContactPhoneNumber", {
                    required: "Please enter phone number",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone number must be exactly 10 digits",
                    },
                  })}
                />
                {contactErrors.ContactPhoneNumber && (
                  <p className="text-red-600 mt-1">
                    {contactErrors.ContactPhoneNumber.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div className="form-group">
                <label htmlFor="ContactSubject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="ContactSubject"
                  className="input-field"
                  placeholder="Investment Inquiry"
                  {...registerContact("ContactSubject", {
                    required: "Please enter subject.",
                  })}
                />
                {contactErrors.ContactSubject && (
                  <p className="text-red-600 mt-1">
                    {contactErrors.ContactSubject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="form-group md:col-span-2">
                <label htmlFor="ContactMessage" className="form-label">
                  Message
                </label>
                <textarea
                  id="ContactMessage"
                  rows={5}
                  className="input-field"
                  placeholder="Tell us more about your needs..."
                  {...registerContact("ContactMessage", {
                    required: "Please enter message.",
                  })}
                ></textarea>
                {contactErrors.ContactMessage && (
                  <p className="text-red-600 mt-1">
                    {contactErrors.ContactMessage.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="text-center md:col-span-2 mt-4">
                <button
                  type="submit"
                  className="btn px-12 py-4 text-lg"
                  disabled={contactLoading}
                >
                  {contactLoading ? "Sending..." : "Submit Message"}
                </button>
                {contactStatus && (
                  <p className="mt-2 text-green-600">{contactStatus}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-16 bg-secondary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-2xl font-bold">Stay Updated</h2>
            <p className="mb-8">
              Subscribe to our newsletter for the latest investment news,
              project updates, and events in Nakuru County.
            </p>
            <form
              className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto"
              onSubmit={handleSubmitNewsletter(onSubmitNewsletter)}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="input-field flex-grow"
                {...registerNewsletter("EmailAddress", {
                  required: "Please enter email address.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <button
                type="submit"
                className="btn px-8"
                disabled={newsletterLoading}
              >
                {newsletterLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {newsletterErrors.EmailAddress && (
              <p className="text-red-200 mt-2">
                {newsletterErrors.EmailAddress.message}
              </p>
            )}
            {newsletterStatus && (
              <p className="mt-2 text-green-200">{newsletterStatus}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
