/* eslint-disable react/no-unescaped-entities */
import { Mail, Instagram, Send, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import UserNavbar from "../Components/Layouts/UserNavbar";
import Footer from "../Components/Layouts/Footer";
import DecorativeElements from "../Components/DecorativeElements";
import { useForm } from "@formspree/react";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";

const ContactUs = () => {
  const [state, submitToFormspree] = useForm("manjeepj");
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });
  const formRef = useRef(null);
  const navigate = useNavigate();

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: "techzdada11@gmail.com",
      link: "mailto:techzdada11@gmail.com",
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

  // Custom submit handler for instant feedback
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormMessage({ type: "loading", text: "Sending message..." });

    try {
      await submitToFormspree(e);
    } catch (error) {
      setFormMessage({
        type: "error",
        text: "Failed to send message. Please try again later.",
      });
    }
  };

  // Handle Formspree response states
  useEffect(() => {
    if (state.succeeded) {
      setFormMessage({
        type: "success",
        text: "Message sent successfully! We will try to respond as soon as possible.",
      });
      formRef.current?.reset();
      setTimeout(() => {
        setFormMessage({ type: "", text: "" });
        navigate("/");
      }, 2000);
    }

    if (state.errors && state.errors.length > 0) {
      setFormMessage({
        type: "error",
        text: "Failed to send message. Please try again later.",
      });
    }
  }, [state.succeeded, state.errors]);

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
                        {info.link ? (
                          <a
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-[#f68014] transition-colors duration-200"
                          >
                            {info.details}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.details}</p>
                        )}
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

              {/* Form Message */}
              {formMessage.text && (
                <div
                  className={`mb-6 p-4 rounded-lg border ${
                    formMessage.type === "success"
                      ? "bg-green-50 border-green-200"
                      : formMessage.type === "error"
                      ? "bg-red-50 border-red-200"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <p
                    className={`${
                      formMessage.type === "success"
                        ? "text-green-800"
                        : formMessage.type === "error"
                        ? "text-red-800"
                        : "text-blue-800"
                    }`}
                  >
                    {formMessage.text}
                  </p>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
                    disabled={state.submitting}
                    className="w-full bg-white px-4 py-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={state.submitting}
                    className="w-full bg-white px-4 py-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={state.submitting}
                    className="w-full bg-white px-4 py-3 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full px-8 py-4 bg-[#f68014] rounded-full font-semibold text-lg text-white hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {state.submitting ? "Sending..." : "Send Message"}
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
