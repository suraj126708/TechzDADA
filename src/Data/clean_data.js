import { readFileSync, writeFileSync } from "fs";

// Read the JSON file
const data = JSON.parse(readFileSync("./src/Data/AI_CAP1.json", "utf8"));

// Complete list of branches
const allBranches = [
  "",
  "5G",
  "Aeronautical Engineering",
  "Agricultural Engineering",
  "Artificial Intelligence",
  "Artificial Intelligence (AI) and Data Science",
  "Artificial Intelligence and Data Science",
  "Artificial Intelligence and Machine Learning",
  "Automation and Robotics",
  "Automobile Engineering",
  "Bio Medical Engineering",
  "Bio Technology",
  "Chemical Engineering",
  "Civil Engineering",
  "Civil Engineering and Planning",
  "Civil and Environmental Engineering",
  "Civil and infrastructure Engineering",
  "Computer Engineering",
  "Computer Engineering (Software Engineering)",
  "Computer Science",
  "Computer Science and Business Systems",
  "Computer Science and Design",
  "Computer Science and Engineering",
  "Computer Science and Engineering (Artificial",
  "Computer Science and Engineering (Cyber",
  "Computer Science and Engineering (Internet of",
  "Computer Science and Engineering (IoT)",
  "Computer Science and Engineering(Artificial",
  "Computer Science and Engineering(Cyber",
  "Computer Science and Engineering(Data Science)",
  "Computer Science and Information Technology",
  "Computer Technology",
  "Cyber Security",
  "Data Engineering",
  "Data Science",
  "Dyestuff Technology",
  "Electrical Engg[Electronics and Power",
  "Electrical Engg[Electronics and Power]",
  "Electrical Engineering",
  "Electrical and Computer Engineering",
  "Electrical and Electronics Engineering",
  "Electronics Engineering",
  "Electronics Engineering (VLSI Design and",
  "Electronics and Biomedical Engineering",
  "Electronics and Communication",
  "Electronics and Communication(Advanced",
  "Electronics and Telecommunication Engg",
  "Electronics and Computer Engineering",
  "Electronics and Computer Science",
  "Fashion Technology",
  "Food Engineering and Technology",
  "Food Technology",
  "Industrial IoT",
  "Information Technology",
  "Instrumentation Engineering",
  "Instrumentation and Control Engineering",
  "Internet of Things (IoT)",
  "Man Made Textile Technology",
  "Manufacturing Science and Engineering",
  "Mechanical Engineering[Sandwich]",
  "Mechanical & Automation Engineering",
  "Mechanical Engineering",
  "Mechanical Engineering Automobile",
  "Mechanical and Mechatronics Engineering",
  "Mechatronics Engineering",
  "Metallurgy and Material Technology",
  "Mining Engineering",
  "Oil Technology",
  "Oil,Oleochemicals and Surfactants Technology",
  "Paper and Pulp Technology",
  "Petro Chemical Engineering",
  "Pharmaceuticals Chemistry and Technology",
  "Plastic and Polymer Engineering",
  "Polymer Engineering and Technology",
  "Printing and Packing Technology",
  "Robotics and Artificial Intelligence",
  "Robotics and Automation",
  "Structural Engineering",
  "Surface Coating Technology",
  "Technical Textiles",
  "Textile Chemistry",
  "Textile Technology",
  "VLSI",
];

// Function to clean text by removing course names
function cleanText(text, existingCourses) {
  let cleanedText = text;

  // Get list of courses that are not in the existing courses array
  const missingCourses = allBranches.filter(
    (branch) =>
      branch && // Skip empty string
      !existingCourses.includes(branch) && // Skip if course already exists
      cleanedText.toLowerCase().includes(branch.toLowerCase()) // Check if course name appears in text
  );

  // Remove missing course names from text
  missingCourses.forEach((course) => {
    cleanedText = cleanedText.replace(new RegExp(course, "gi"), "");
  });

  // Clean up any remaining issues
  cleanedText = cleanedText
    .replace(/\s*,\s*/g, ", ") // Fix spacing around commas
    .replace(/\s+/g, " ") // Remove extra spaces
    .replace(/,\s*$/, "") // Remove trailing comma
    .replace(/\n/g, " ") // Replace newlines with spaces
    .trim();

  return cleanedText;
}

// Process the data
const cleanedData = data.map((college) => {
  // Get list of existing course names
  const existingCourses = college.Courses.map(
    (course) => course["Course Name"]
  ).filter((name) => name); // Remove empty course names

  return {
    ...college,
    "Institute Name": cleanText(college["Institute Name"], existingCourses),
    District: cleanText(college["District"], existingCourses),
  };
});

// Write the cleaned data back to the file
writeFileSync("./src/Data/AI_CAP1.json", JSON.stringify(cleanedData, null, 2));
