/* eslint-disable react/no-unescaped-entities */
import { Mail, Instagram, Send, MapPin } from "lucide-react";
import UserNavbar from "../Components/Layouts/UserNavbar";
import Footer from "../Components/Layouts/Footer";
import DecorativeElements from "../Components/DecorativeElements";
import { handleError, handleSuccess } from "../utils";
import { useRef } from "react";

const ContactUs = () => {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: "techzdada11@gmail.com",
    },
    {
      icon: <Instagram className="h-6 w-6" />,
      title: "DM us on Instagram",
      details: "@myself_techzdada11",
      link: "https://www.instagram.com/myself_techzdada11/",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      details: "Pune, India",
    },
  ];

  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);

    try {
      await fetch("https://formsubmit.co/techzdada11@gmail.com", {
        method: "POST",
        body: formData,
      });
      handleSuccess(
        "Message sent successfully! we will try to respond as soon as possible."
      );
      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      handleError("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <UserNavbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-orange-50">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <DecorativeElements.LinePattern />

      {/* Contact Form Section */}
      <section className="py-20 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 border border-orange-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="text-[#f68014] p-3 bg-orange-50 rounded-lg">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {info.title}
                        </h3>
                        <a
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <p className="text-gray-600">{info.details}</p>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 border border-orange-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Send us a Message
              </h2>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Optional hidden fields */}
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_next"
                  value="http://localhost:5173/thank-you"
                />

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-white px-4 py-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-white px-4 py-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="w-full bg-white px-4 py-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-[#f68014] rounded-full font-semibold text-lg text-white hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
