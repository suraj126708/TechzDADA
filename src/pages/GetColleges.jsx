/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import CAP01 from "../Data/CAP_01_2024.json";
import CAP02 from "../Data/CAP_02_2024.json";
import CAP03 from "../Data/CAP_03_2024.json";
import AI_CAP1 from "../Data/AI_CAP1.json";
import AI_CAP2 from "../Data/AI_CAP2.json";
import AI_CAP3 from "../Data/AI_CAP3.json";

import {
  Search,
  Filter,
  MapPin,
  Award,
  Users,
  GraduationCap,
  ChevronDown,
  X,
  CheckCircle,
  Star,
  Building,
  BookOpen,
} from "lucide-react";
import UserNavbar from "../Components/Layouts/UserNavbar";
import Footer from "../Components/Layouts/Footer";

const casteFallbackOrder = {
  NT3: ["NT3", "NT2", "NT1", "OPEN"],
  NT2: ["NT2", "NT1", "OPEN"],
  NT1: ["NT1", "OPEN"],
  VJ: ["VJ", "OPEN"],
  OBC: ["OBC", "OPEN"],
  SC: ["SC", "OPEN"],
  ST: ["ST", "OPEN"],
  OPEN: ["OPEN"],
  EWS: ["EWS", "OPEN"],
};

function PercentileDisplay() {
  const [availableBranches, setAvailableBranches] = useState([]);
  const [capRound, setCapRound] = useState("01");
  const [examType, setExamType] = useState("MHT-CET");

  const casteCategories = [
    { value: "OPEN", label: "Open Category" },
    { value: "SC", label: "Scheduled Caste (SC)" },
    { value: "ST", label: "Scheduled Tribe (ST)" },
    { value: "VJ", label: "Vimukta Jati (VJ)" },
    { value: "NT1", label: "Nomadic Tribe 1 (NT1)" },
    { value: "NT2", label: "Nomadic Tribe 2 (NT2)" },
    { value: "NT3", label: "Nomadic Tribe 3 (NT3)" },
    { value: "OBC", label: "Other Backward Class (OBC)" },
    { value: "EWS", label: "Economically Weaker Section (EWS)" },
  ];

  const [filters, setFilters] = useState({
    percentile: "",
    caste: "",
    branch: [],
    district: [],
    gender: "",
    isDefence: false,
    isPWD: false,
  });

  const [percentileError, setPercentileError] = useState("");
  const [suggestedPercentile, setSuggestedPercentile] = useState(null);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [filteredColleges, setFilteredColleges] = useState([]);
  const [availableDistricts, setAvailableDistricts] = useState([]);

  useEffect(() => {
    // Pick the correct data based on exam type and capRound
    let data;
    if (examType === "MHT-CET") {
      if (capRound === "01") data = CAP01;
      else if (capRound === "02") data = CAP02;
      else data = CAP03;
    } else {
      if (capRound === "01") data = AI_CAP1;
      else if (capRound === "02") data = AI_CAP2;
      else data = AI_CAP3;
    }

    const branchesSet = new Set();
    const districtsSet = new Set();

    if (examType === "MHT-CET") {
      Object.values(data).forEach((college) => {
        if (college.district) {
          districtsSet.add(college.district);
        }
        college.branches.forEach((branch) => {
          branchesSet.add(branch.branch_info);
        });
      });
    } else {
      // Handle JEE data structure
      data.forEach((college) => {
        if (college.District) {
          districtsSet.add(college.District);
        }
        college.Courses.forEach((course) => {
          branchesSet.add(course["Course Name"]);
        });
      });
    }

    setAvailableBranches(Array.from(branchesSet).sort());
    setAvailableDistricts(Array.from(districtsSet).sort());
  }, [capRound, examType]);

  // Function to get all matching caste codes for a selected category with gender, defence, and PWD considerations
  const getMatchingCastes = (selectedCaste, gender, isDefence, isPWD) => {
    if (!selectedCaste) return [];

    const allCastes = [
      "GOPENS",
      "GSCS",
      "GSTS",
      "GVJS",
      "GNT1S",
      "GNT2S",
      "GNT3S",
      "GOBCS",
      "LOPENS",
      "LSCS",
      "LSTS",
      "LVJS",
      "LNT2S",
      "LOBCS",
      "DEFOPENS",
      "TFWS",
      "DEFROBCS",
      "EWS",
      "LNT1S",
      "PWDOPENS",
      "PWDROBCS",
      "DEFRSCS",
      "GOPENH",
      "GSCH",
      "GVJH",
      "GNT1H",
      "GOBCH",
      "LOPENH",
      "LOBCH",
      "GOPENO",
      "GSCO",
      "GOBCO",
      "GSTH",
      "GNT2H",
      "LSCH",
      "GNT3H",
      "GSTO",
      "GVJO",
      "GNT1O",
      "GNT2O",
      "LOPENO",
      "LSCO",
      "LOBCO",
      "LSTH",
      "PWDOPENH",
      "GNT3O",
      "PWDROBCH",
      "LNT2H",
      "LVJH",
      "LNT1H",
      "LSTO",
      "DEFOBCS",
      "MI",
      "LNT3S",
      "PWDOBCS",
      "PWDRSCS",
      "ORPHAN",
      "DEFRVJS",
      "DEFRNT2S",
      "PWDRSCH",
      "LNT3H",
      "DEFRNT1S",
      "PWDRVJS",
      "PWDRNT2S",
      "PWDSCS",
      "DEFSCS",
      "LNT2O",
      "LVJO",
      "LNT1O",
      "PWDOBCH",
      "PWDSCH",
      "PWDRNT2H",
      "PWDRVJH",
      "PWDRNT1S",
      "DEFRNT3S",
      "DEFSTS",
      "PWDSTS",
    ];

    let baseCastes = [];

    // First, get base caste codes
    switch (selectedCaste) {
      case "OPEN":
        baseCastes = allCastes.filter(
          (caste) => caste.includes("OPEN") || caste.includes("TFWS")
        );
        break;
      case "SC":
        baseCastes = allCastes.filter((caste) => caste.includes("SC"));
        break;
      case "ST":
        baseCastes = allCastes.filter((caste) => caste.includes("ST"));
        break;
      case "VJ":
        baseCastes = allCastes.filter((caste) => caste.includes("VJ"));
        break;
      case "NT1":
        baseCastes = allCastes.filter((caste) => caste.includes("NT1"));
        break;
      case "NT2":
        baseCastes = allCastes.filter((caste) => caste.includes("NT2"));
        break;
      case "NT3":
        baseCastes = allCastes.filter((caste) => caste.includes("NT3"));
        break;
      case "OBC":
        baseCastes = allCastes.filter((caste) => caste.includes("OBC"));
        break;
      case "EWS":
        baseCastes = allCastes.filter((caste) => caste.includes("EWS"));
        break;
      default:
        return [];
    }

    // Now filter based on gender, defence, and PWD status
    let filteredCastes = baseCastes;

    // Filter by PWD status first (most specific)
    if (isPWD) {
      filteredCastes = filteredCastes.filter((caste) =>
        caste.startsWith("PWD")
      );
    } else if (isDefence) {
      filteredCastes = filteredCastes.filter((caste) =>
        caste.startsWith("DEF")
      );
    } else if (gender) {
      if (gender === "female") {
        filteredCastes = filteredCastes.filter((caste) =>
          caste.startsWith("L")
        );
      } else if (gender === "male") {
        filteredCastes = filteredCastes.filter((caste) =>
          caste.startsWith("G")
        );
      }
    }

    // If no specific matches found, include general categories as fallback
    if (filteredCastes.length === 0 && !isPWD && !isDefence) {
      filteredCastes = baseCastes.filter(
        (caste) => caste.startsWith("G") || caste.startsWith("L")
      );
    }

    return filteredCastes;
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "percentile") {
      const percentileValue = parseFloat(value);

      // Clear previous error and suggestion
      setPercentileError("");
      setSuggestedPercentile(null);

      if (percentileValue > 100) {
        setPercentileError("Percentile cannot be greater than 100");
      } else if (percentileValue < 0) {
        setPercentileError("Percentile cannot be negative");
      } else if (percentileValue < 50) {
        setSuggestedPercentile(percentileValue + 5);
      } else if (percentileValue < 80) {
        setSuggestedPercentile(percentileValue + 3);
      }
    }

    if (name === "branch") {
      setSelectedBranch(value);
    } else if (name === "district") {
      setSelectedDistrict(value);
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const addBranch = () => {
    if (selectedBranch && !filters.branch.includes(selectedBranch)) {
      setFilters((prev) => ({
        ...prev,
        branch: [...prev.branch, selectedBranch],
      }));
      setSelectedBranch("");
    }
  };

  const removeBranch = (branchToRemove) => {
    setFilters((prev) => ({
      ...prev,
      branch: prev.branch.filter((branch) => branch !== branchToRemove),
    }));
  };

  const addDistrict = () => {
    if (selectedDistrict && !filters.district.includes(selectedDistrict)) {
      setFilters((prev) => ({
        ...prev,
        district: [...prev.district, selectedDistrict],
      }));
      setSelectedDistrict("");
    }
  };

  const removeDistrict = (districtToRemove) => {
    setFilters((prev) => ({
      ...prev,
      district: prev.district.filter(
        (district) => district !== districtToRemove
      ),
    }));
  };

  const getExactSeatCode = (
    selectedCaste,
    gender,
    isDefence,
    isPWD,
    collegeLevel
  ) => {
    if (!selectedCaste) return null;
    let prefix = "";
    if (isPWD) prefix = "PWD";
    else if (isDefence) prefix = "DEF";
    else if (gender === "female") prefix = "L";
    else prefix = "G";

    // Determine suffix based on college level
    let suffix = "S"; // Default to State Level
    if (collegeLevel) {
      if (collegeLevel.toLowerCase().includes("home university")) {
        suffix = "H";
      } else if (collegeLevel.toLowerCase().includes("outside")) {
        suffix = "O";
      }
    }

    return `${prefix}${selectedCaste}${suffix}`;
  };

  function applyFilters() {
    const { percentile, caste, branch, district, gender, isDefence, isPWD } =
      filters;

    if (!percentile) {
      alert("Please enter your percentile");
      return;
    }

    if (examType === "MHT-CET" && !caste) {
      alert("Please select a caste category");
      return;
    }

    const percentileValue = parseFloat(percentile);
    if (percentileValue > 100) {
      setPercentileError("Percentile cannot be greater than 100");
      return;
    }

    // Use suggested percentile if available
    const percentileToUse = suggestedPercentile || percentileValue;

    let data;
    if (examType === "MHT-CET") {
      if (capRound === "01") data = CAP01;
      else if (capRound === "02") data = CAP02;
      else data = CAP03;
    } else {
      if (capRound === "01") data = AI_CAP1;
      else if (capRound === "02") data = AI_CAP2;
      else data = AI_CAP3;
    }

    let results = [];

    if (examType === "MHT-CET") {
      // Get fallback order for selected caste
      const fallbackCastes = casteFallbackOrder[caste] || [caste];

      results = Object.entries(data)
        .map(([collegeName, collegeInfo]) => {
          // Filter by district first
          const districtMatch =
            district.length === 0 || // If no districts selected, show all
            district.some(
              (selectedDistrict) =>
                collegeInfo.district?.toLowerCase() ===
                selectedDistrict.toLowerCase()
            );

          if (!districtMatch) return null;

          let foundBranches = [];
          let usedCaste = null;
          let bestPercentile = 0;

          // First try with selected caste and filters
          for (let fallbackCaste of fallbackCastes) {
            const seatCode = getExactSeatCode(
              fallbackCaste,
              gender,
              isDefence,
              isPWD,
              collegeInfo.level
            );

            let branches = collegeInfo.branches.filter((b) => {
              // Check if branch matches any of the selected branches
              const branchMatch =
                branch.length === 0 || // If no branches selected, show all
                branch.some((selectedBranch) =>
                  b.branch_info
                    .toLowerCase()
                    .includes(selectedBranch.toLowerCase())
                );

              if (!branchMatch) return false;

              const percentileMatch = b.table_data.some((row) => {
                if (seatCode in row) {
                  const cutoffData = row[seatCode];
                  if (cutoffData) {
                    const cutoffPercentile = parseFloat(
                      cutoffData.split("\n")[1]?.replace(/[()]/g, "")
                    );
                    return (
                      !isNaN(cutoffPercentile) &&
                      percentileToUse >= cutoffPercentile
                    );
                  }
                }
                return false;
              });

              return percentileMatch;
            });

            if (branches.length > 0) {
              // Calculate best cutoff for each branch
              branches = branches.map((b) => {
                let branchBestPercentile = 0;
                let branchBestCaste = fallbackCaste;

                // Only check cutoffs for the current fallback caste
                b.table_data.forEach((row) => {
                  if (seatCode in row) {
                    const cutoffData = row[seatCode];
                    if (cutoffData) {
                      const cutoffPercentile = parseFloat(
                        cutoffData.split("\n")[1]?.replace(/[()]/g, "")
                      );
                      if (
                        !isNaN(cutoffPercentile) &&
                        cutoffPercentile > branchBestPercentile
                      ) {
                        branchBestPercentile = cutoffPercentile;
                        branchBestCaste = fallbackCaste;
                      }
                    }
                  }
                });

                return {
                  ...b,
                  bestCutoff: branchBestPercentile,
                  bestCaste: branchBestCaste,
                };
              });

              // Filter branches to only show those that match user's selected branches
              if (branch.length > 0) {
                branches = branches.filter((b) =>
                  branch.some((selectedBranch) =>
                    b.branch_info
                      .toLowerCase()
                      .includes(selectedBranch.toLowerCase())
                  )
                );
              }

              foundBranches = branches;
              usedCaste = fallbackCaste;
              bestPercentile = Math.max(...branches.map((b) => b.bestCutoff));
              break;
            }
          }

          if (foundBranches.length > 0) {
            return {
              collegeName,
              status: collegeInfo.status,
              level: collegeInfo.level,
              district: collegeInfo.district,
              branches: foundBranches.sort((a, b) =>
                a.branch_info.localeCompare(b.branch_info)
              ),
              closingPercentile: bestPercentile,
              casteUsed: usedCaste,
            };
          }
          return null;
        })
        .filter(Boolean);
    } else {
      // JEE filtering logic
      results = data
        .map((college) => {
          // Filter by district first
          const districtMatch =
            district.length === 0 || // If no districts selected, show all
            district.some(
              (selectedDistrict) =>
                college.District?.toLowerCase() ===
                selectedDistrict.toLowerCase()
            );

          if (!districtMatch) return null;

          const matchingCourses = college.Courses.filter((course) => {
            const branchMatch =
              branch.length === 0 ||
              branch.some((selectedBranch) =>
                course["Course Name"]
                  .toLowerCase()
                  .includes(selectedBranch.toLowerCase())
              );

            if (!branchMatch) return false;

            const meritData = course["All India Merit"].split(" ");
            const cutoffPercentile = parseFloat(
              meritData[1]?.replace(/[()]/g, "")
            );

            return (
              !isNaN(cutoffPercentile) && percentileToUse >= cutoffPercentile
            );
          });

          if (matchingCourses.length > 0) {
            return {
              collegeName: college["Institute Name"],
              status: matchingCourses[0]["Merit Exam"],
              level: "All India",
              district: college.District,
              branches: matchingCourses.map((course) => ({
                branch_info: course["Course Name"],
                bestCutoff: parseFloat(
                  course["All India Merit"].split(" ")[1]?.replace(/[()]/g, "")
                ),
              })),
              closingPercentile: Math.max(
                ...matchingCourses.map((course) =>
                  parseFloat(
                    course["All India Merit"]
                      .split(" ")[1]
                      ?.replace(/[()]/g, "")
                  )
                )
              ),
            };
          }
          return null;
        })
        .filter(Boolean);
    }

    // Sort results by closing percentile in descending order
    results.sort((a, b) => b.closingPercentile - a.closingPercentile);

    setFilteredColleges(results.slice(0, 20)); // Top 20 results
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <UserNavbar />

      <div className="backdrop-blur-md border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
          <div className="text-center">
            <div className="flex sm:flex-row items-center justify-center gap-2 sm:gap-6 mb-3 sm:mb-4">
              <div className="hidden sm:block bg-[#f68014] p-3 sm:p-4 rounded-2xl flex-shrink-0">
                <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <h1
                style={{ fontSize: "1.5rem" }}
                className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#f68014] sm:mb-0 text-center"
              >
                College Predictor 2025
              </h1>
            </div>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Find your perfect engineering college based on your percentile and
              preferences
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Filters Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-orange-100 sticky top-24">
              <div className="p-4 sm:p-6 border-b border-orange-100">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-[#f68014]" />
                  <span>Filter Criteria</span>
                </h2>
              </div>

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Exam Type Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Exam Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["MHT-CET", "JEE"].map((type) => (
                      <label key={type} className="relative">
                        <input
                          type="radio"
                          name="examType"
                          value={type}
                          checked={examType === type}
                          onChange={() => setExamType(type)}
                          className="peer sr-only"
                        />
                        <div className="px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 border border-orange-200 rounded-lg text-center cursor-pointer transition-all duration-200 peer-checked:bg-[#f68014] peer-checked:text-white peer-checked:border-[#f68014] hover:border-orange-300">
                          <span className="text-xs sm:text-sm font-medium">
                            {type}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* CAP Round */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    CAP Round
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["01", "02", "03"].map((round) => (
                      <label key={round} className="relative">
                        <input
                          type="radio"
                          name="capRound"
                          value={round}
                          checked={capRound === round}
                          onChange={() => setCapRound(round)}
                          className="peer sr-only"
                        />
                        <div className="px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 border border-orange-200 rounded-lg text-center cursor-pointer transition-all duration-200 peer-checked:bg-[#f68014] peer-checked:text-white peer-checked:border-[#f68014] hover:border-orange-300">
                          <span className="text-xs sm:text-sm font-medium">
                            CAP_{round}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Percentile Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Award className="h-4 w-4 text-[#f68014]" />
                    <span>Your Percentile</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="percentile"
                      value={filters.percentile}
                      onChange={handleFilterChange}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border ${
                        percentileError ? "border-red-300" : "border-orange-200"
                      } rounded-xl focus:ring-2 focus:ring-[#f68014] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white text-sm sm:text-base`}
                      placeholder="Enter percentile (e.g., 85.5)"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                    {percentileError && (
                      <div className="mt-1 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{percentileError}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Caste Category - Only show for MHT-CET */}
                {examType === "MHT-CET" && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                      <Users className="h-4 w-4 text-[#f68014]" />
                      <span>Select Caste Category</span>
                    </label>
                    <div className="relative">
                      <select
                        name="caste"
                        value={filters.caste}
                        onChange={handleFilterChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-[#f68014] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer text-sm sm:text-base"
                      >
                        <option value="">-- Select Caste Category --</option>
                        {casteCategories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* Special Categories - Only show for MHT-CET */}
                {examType === "MHT-CET" && (
                  <div className="space-y-2 sm:space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Special Categories
                    </label>
                    <div className="space-y-2 sm:space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="isDefence"
                            checked={filters.isDefence}
                            onChange={handleFilterChange}
                            className="sr-only peer"
                          />
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-orange-300 rounded peer-checked:bg-[#f68014] peer-checked:border-[#f68014] transition-all duration-200 group-hover:border-orange-400 flex items-center justify-center">
                            <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 group-hover:text-gray-900">
                          Defence Category
                        </span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="isPWD"
                            checked={filters.isPWD}
                            onChange={handleFilterChange}
                            className="sr-only peer"
                          />
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-orange-300 rounded peer-checked:bg-[#f68014] peer-checked:border-[#f68014] transition-all duration-200 group-hover:border-orange-400 flex items-center justify-center">
                            <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-700 group-hover:text-gray-900">
                          Person with Disability (PWD)
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Branch Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-[#f68014]" />
                    <span>Select Branches</span>
                  </label>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <select
                          name="branch"
                          value={selectedBranch}
                          onChange={handleFilterChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-[#f68014] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer text-sm sm:text-base"
                        >
                          <option value="">Select Branch</option>
                          {availableBranches
                            .filter(
                              (branch) => !filters.branch.includes(branch)
                            )
                            .map((branch) => (
                              <option key={branch} value={branch}>
                                {branch}
                              </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                      </div>
                      <button
                        onClick={addBranch}
                        disabled={!selectedBranch}
                        className="px-3 sm:px-4 py-2 sm:py-3 bg-[#f68014] text-white rounded-xl hover:bg-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
                      >
                        Add
                      </button>
                    </div>

                    {/* Selected Branches */}
                    {filters.branch.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {filters.branch.map((branch) => (
                          <div
                            key={branch}
                            className="flex items-center gap-1 bg-orange-100 text-[#f68014] px-2 sm:px-3 py-1 rounded-xl text-xs sm:text-sm"
                          >
                            <span className="truncate max-w-[120px] sm:max-w-[200px]">
                              {branch}
                            </span>
                            <button
                              onClick={() => removeBranch(branch)}
                              className="hover:text-orange-700 flex-shrink-0"
                            >
                              <X className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Location Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-[#f68014]" />
                    <span>Select Locations</span>
                  </label>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <select
                          name="district"
                          value={selectedDistrict}
                          onChange={handleFilterChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-[#f68014] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white appearance-none cursor-pointer text-sm sm:text-base"
                        >
                          <option value="">Select Location</option>
                          {availableDistricts
                            .filter(
                              (district) => !filters.district.includes(district)
                            )
                            .map((district) => (
                              <option key={district} value={district}>
                                {district}
                              </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                      </div>
                      <button
                        onClick={addDistrict}
                        disabled={!selectedDistrict}
                        className="px-3 sm:px-4 py-2 sm:py-3 bg-[#f68014] text-white rounded-xl hover:bg-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
                      >
                        Add
                      </button>
                    </div>

                    {/* Selected Districts */}
                    {filters.district.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {filters.district.map((district) => (
                          <div
                            key={district}
                            className="flex items-center gap-1 bg-orange-100 text-[#f68014] px-2 sm:px-3 py-1 rounded-xl text-xs sm:text-sm"
                          >
                            <span className="truncate max-w-[120px] sm:max-w-[200px]">
                              {district}
                            </span>
                            <button
                              onClick={() => removeDistrict(district)}
                              className="hover:text-orange-700 flex-shrink-0"
                            >
                              <X className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={applyFilters}
                  className="w-full bg-[#f68014] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl hover:bg-orange-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="font-medium">Find Colleges</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-3">
            <div className="space-y-4 sm:space-y-6">
              {/* Results */}
              {filteredColleges.length > 0 ? (
                filteredColleges.map((college, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-4">
                        <div className="flex-1">
                          <h2 className="text-lg sm:text-xl font-bold text-gray-800 my-2 leading-tight">
                            {college.collegeName}
                          </h2>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm mb-3">
                            <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full font-medium text-xs sm:text-sm">
                              {college.status}
                            </span>
                            <span className="text-gray-600 flex items-center space-x-1 text-xs sm:text-sm">
                              <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>{college.level}</span>
                            </span>
                          </div>
                          {college.district && (
                            <p className="text-xs sm:text-sm text-gray-600 flex items-center space-x-1 mb-2">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>District: {college.district}</span>
                            </p>
                          )}
                        </div>

                        <div className="text-left">
                          <div className="bg-[#f68014] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl inline-block">
                            <div className="text-xs font-medium opacity-90">
                              Best Closing
                            </div>
                            <div className="text-base sm:text-lg text-left font-bold">
                              {college.closingPercentile.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-orange-100 pt-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2 text-sm sm:text-base">
                          <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-[#f68014]" />
                          <span>Available Branches</span>
                        </h3>
                        <div className="space-y-2">
                          {college.branches.map((branch, i) => (
                            <div
                              key={i}
                              className="bg-gray-50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-orange-50 transition-colors duration-200"
                            >
                              <span className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#f68014] rounded-full"></div>
                                <span>{branch.branch_info}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 sm:p-8 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                    No colleges found
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    No colleges match your criteria. Try adjusting the filters.
                  </p>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                      <div className="text-left">
                        <p className="text-amber-800 font-medium text-xs sm:text-sm">
                          <strong>
                            If you are not getting any results, it can mean that
                            there is no seat for your caste or gender in any
                            college for the given percentile.
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-red-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">⚠</span>
                      </div>
                      <div className="text-left">
                        <p className="text-red-800 text-xs sm:text-sm">
                          <strong>Please note:</strong> This tool uses official
                          data provided by MHT-CET, but our model may make
                          mistakes or have limitations. Do not rely solely on
                          these results for your decisions. If you are not
                          getting the expected results, try changing the filters
                          or double-check your inputs. Always verify with
                          official sources before making any final choices.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PercentileDisplay;
