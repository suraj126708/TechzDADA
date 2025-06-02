import { useEffect, useRef } from "react";
import colleges from "../../Data/College.json";
import { useNavigate } from "react-router-dom";

const CollegeSection = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationFrame;
    let isHovered = false;

    const scrollStep = () => {
      if (!isHovered && scrollContainer) {
        scrollContainer.scrollLeft += 1.5;
        // Loop back to start for infinite scroll effect
        if (
          scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scrollStep);
    };

    animationFrame = requestAnimationFrame(scrollStep);

    // Pause on hover
    const handleMouseEnter = () => {
      isHovered = true;
    };
    const handleMouseLeave = () => {
      isHovered = false;
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("mouseenter", handleMouseEnter);
      scrollContainer.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const handleExploreClick = (index) => {
    navigate(`/college/${colleges[index].name}`, {
      state: { colleges, index },
    });
  };

  const displayColleges = [...colleges, ...colleges, ...colleges];

  return (
    <section className="py-10 md:py-16 px-2 md:px-4 bg-orange-50 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 text-gray-800">
            Explore Top Colleges
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Scroll through and discover colleges. Connect with students and get
            real insights!
          </p>
        </div>

        <div className="relative w-full overflow-hidden rounded-xl md:rounded-2xl">
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 w-full overflow-x-auto md:overflow-x-hidden scrollbar-hide"
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            {displayColleges.map((college, idx) => (
              <div
                key={`${college.name}-${idx}`}
                className="min-w-[220px] sm:min-w-[260px] md:min-w-[280px] bg-white border border-orange-100 rounded-xl md:rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl hover:shadow-orange-200 transition-all duration-300 flex flex-col group"
              >
                <div className="relative overflow-hidden rounded-t-xl md:rounded-t-2xl">
                  <img
                    src={`${college.image}`}
                    alt={college.name}
                    className="h-32 sm:h-40 md:h-44 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4 md:p-6 flex flex-col flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3 line-clamp-1">
                    {college.name}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 md:mb-5 flex-1 line-clamp-2 leading-relaxed">
                    {college.address}
                  </p>
                  <button
                    onClick={() => handleExploreClick(idx % colleges.length)}
                    className="mt-auto px-4 py-2 md:px-6 md:py-3 bg-[#f68014] rounded-lg md:rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-orange-200 transition-all duration-300 transform hover:-translate-y-0.5 text-sm md:text-base"
                  >
                    Explore More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced fade effects for light theme */}
          <div className="pointer-events-none absolute top-0 right-0 h-full w-16 md:w-32 bg-gradient-to-l from-orange-50 via-orange-50/80 to-transparent" />
          <div className="pointer-events-none absolute top-0 left-0 h-full w-16 md:w-32 bg-gradient-to-r from-orange-50 via-orange-50/80 to-transparent" />
        </div>
      </div>

      <style>{`
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>
    </section>
  );
};

export default CollegeSection;
