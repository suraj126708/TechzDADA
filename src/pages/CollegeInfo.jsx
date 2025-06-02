import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const CollegeDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { colleges, index } = location.state || {};

  // Fallback if state is missing
  if (!colleges || typeof index !== "number") {
    return (
      <div className="p-8 text-center text-red-500">
        College information not found.
        <button
          className="block mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  const college = colleges[index];

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 mb-8 px-4 py-2 bg-white/80 hover:bg-white border border-white/30 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
        >
          <ArrowLeft size={20} className="text-blue-600" />
          <span className="text-gray-700 font-medium">Back to Colleges</span>
        </button>

        {/* College Detail Card */}
        <div className="bg-white/90 border border-white/30 rounded-3xl shadow-xl backdrop-blur-sm overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={college.image}
              alt={college.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {college.name}
              </h1>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin size={16} />
                <span>{college.address}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="text-blue-600" size={20} />
                  <span className="text-gray-600 font-medium">Established</span>
                </div>
                <span className="text-xl font-bold text-gray-800">
                  {college.established}
                </span>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="text-purple-600" size={20} />
                  <span className="text-gray-600 font-medium">Students</span>
                </div>
                <span className="text-xl font-bold text-gray-800">
                  {college.students}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3">About</h2>
              <p className="text-gray-600 leading-relaxed">
                {college.description}
              </p>
            </div>

            {/* Programs */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Programs Offered
              </h3>
              <div className="flex flex-wrap gap-2">
                {college.programs.map((program, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                  >
                    {program}
                  </span>
                ))}
              </div>
            </div>

            {/* Branches */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Branches Offered
              </h3>
              <div className="flex flex-wrap gap-2">
                {college.branches.map((program, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                  >
                    {program}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Key Highlights
              </h3>
              <ul className="space-y-2">
                {college.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp Group */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-3">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Join Student Community
                </h3>
                <p className="text-gray-600 mb-4">
                  Connect with students, get tips, and stay updated with college
                  news.
                </p>
                <a
                  href={college.whatsappGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <MessageCircle size={20} className="hidden md:inline-flex" />
                  <span>Join WhatsApp Group</span>
                  <ExternalLink size={16} className="hidden md:inline-flex" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetailPage;
