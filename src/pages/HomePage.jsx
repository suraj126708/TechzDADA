/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Users,
  MessageCircle,
  Play,
  ExternalLink,
  BookOpen,
  Heart,
  Shield,
} from "lucide-react";
import UserNavbar from "../Components/Layouts/UserNavbar";
import CollegeSection from "../Components/Sections/CollegeSection";
import logo from "/assets/Logo.svg";
import Footer from "../Components/Layouts/Footer";
import DecorativeElements from "../Components/DecorativeElements";

// Blur color constants
const BLUR_COLORS = {
  orange: "bg-orange-500/20",
  white: "bg-white/10",
};

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Direct Student Connect",
      description: "Chat directly with Seniors from your dream colleges",
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Real Experiences",
      description:
        "Get authentic insights about college life, academics, and placements",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Admission Guidance",
      description:
        "Step-by-step guidance for entrance exams and admission procedures",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Verified Students",
      description:
        "All our Seniors are verified with proper college credentials",
    },
  ];

  return (
    <div className="min-h-screen text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <UserNavbar />

      <section className="relative min-h-[90vh] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-orange-50"></div>
        <div className="absolute inset-0">
          <div
            className={`absolute top-20 left-20 w-72 h-72 ${BLUR_COLORS.orange} rounded-full blur-3xl animate-pulse`}
          ></div>
          <div
            className={`absolute bottom-20 right-20 w-96 h-96 ${BLUR_COLORS.orange} rounded-full blur-3xl animate-pulse delay-1000`}
          ></div>
        </div>

        <div
          className={`relative z-10 text-center max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-orange-100 rounded-full border border-orange-200 text-orange-600 text-sm font-medium">
              🎓 Bridge the Gap Between Dreams and Reality
            </span>
          </div>
          <div className="w-full flex justify-center mb-4">
            <img src={logo} alt="logo" />
          </div>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Get real insights from Seniors, know the reality of college before
            you take Admission!
          </p>
          <div className=" flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="#whatsapp community"
              className="group px-8 py-4 bg-[#f68014] rounded-full font-semibold text-lg text-white hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              Start Your Journey
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://www.instagram.com/share/BAKiLSAxW0"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-white border border-orange-200 rounded-full font-semibold text-lg text-orange-600 hover:bg-orange-50 transition-all duration-300 flex items-center gap-2"
            >
              <Play className="h-5 w-5" />
              Watch Our Story
            </a>
          </div>
        </div>
      </section>

      <DecorativeElements.LinePattern />

      {/* Features Section */}
      <section className="py-20 px-4 relative bg-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-4xl font-bold mb-6 text-gray-800">
              Why Choose{" "}
              <span className="text-orange-500">College Pe चर्चा?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Were more than just a platform - were your bridge to informed
              college decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl border border-orange-100 hover:shadow-xl hover:shadow-orange-100 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-[#f68014] mb-4 group-hover:text-orange-600 transition-colors group-hover:scale-110 transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-[#f68014] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DecorativeElements.LinePattern />

      {/* How It Works */}
      <section className="py-20 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-[#f68014] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Choose Your College
              </h3>
              <p className="text-gray-600">
                Browse through hundreds of colleges and find the ones youre
                interested in
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-[#f68014] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Connect with Students
              </h3>
              <p className="text-gray-600">
                Match with verified current students from your chosen colleges
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-[#f68014] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Get Real Insights
              </h3>
              <p className="text-gray-600">
                Chat, ask questions, and get authentic experiences to make
                informed decisions
              </p>
            </div>
          </div>
        </div>
      </section>

      <DecorativeElements.LinePattern />

      <CollegeSection />

      <DecorativeElements.LinePattern />

      {/* WhatsApp Community Section */}
      <section id="whatsapp community" className="py-20 px-4 bg-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border border-orange-200 rounded-3xl p-8 md:p-12">
            <div className="mb-6">
              <span className="text-6xl">💬</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#f68014]">
              Join Our WhatsApp Community
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect instantly with peers, mentors, and college seniors. Get
              real-time updates, ask questions, and be part of a vibrant student
              community!
            </p>
            <div className="flex justify-center">
              <a
                href="https://chat.whatsapp.com/HbLY6umdG2G5jKfeRIfbxf"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-[#f68014] rounded-full font-semibold text-lg text-white hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 justify-center"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.372.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.463 3.484 1.341 4.997l-1.409 5.151 5.283-1.386c1.463.801 3.125 1.235 4.782 1.235h.001c5.514 0 9.997-4.483 9.997-9.997 0-2.662-1.037-5.164-2.921-7.048-1.884-1.884-4.386-2.949-7.077-2.949zm0 18.181c-1.518 0-3.004-.393-4.292-1.137l-.308-.178-3.136.822.837-3.059-.2-.314c-.831-1.306-1.271-2.823-1.271-4.315 0-4.411 3.589-8 8-8 2.137 0 4.146.833 5.657 2.344 1.511 1.511 2.343 3.52 2.343 5.656 0 4.411-3.589 8-8 8z" />
                </svg>
                Join WhatsApp
              </a>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              🚀 Fast answers • Peer support • Free to join
            </div>
          </div>
        </div>
      </section>

      <DecorativeElements.LinePattern />

      {/* Channel Promotion */}
      <section className="py-20 px-4 bg-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white border border-orange-200 rounded-3xl p-8 md:p-12">
            <div className="mb-6">
              <span className="text-6xl">📺</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#f68014]">
              Follow Our YouTube Channel
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get exclusive college insights, admission tips, and student
              stories. Join our growing community of ambitious students!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.youtube.com/@techzdada1103"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 cursor-pointer py-4 bg-[#f68014] rounded-full font-semibold text-lg text-white hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 justify-center"
              >
                <Play className="h-5 w-5" />
                Subscribe Now
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://youtu.be/cZ590Z8ROws?si=d-zZ1q27LZwWvvCP"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-white border border-orange-200 rounded-full font-semibold text-lg text-[#f68014] hover:bg-orange-50 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <Heart className="h-5 w-5" />
                Latest Videos
              </a>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              🔔 Hit the bell icon to never miss our latest content!
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
