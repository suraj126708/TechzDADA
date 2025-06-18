import { readFileSync, writeFileSync } from "fs";

// Read the JSON file
const data = JSON.parse(readFileSync("./src/Data/AI_CAP1.json", "utf8"));

// Process the data
const updatedData = data.map((college) => {
  const instituteName = college["Institute Name"];

  // Update districts based on institute names
  if (
    instituteName ===
    "06307 - Dhole Patil Education Society, Dhole Patil College of Engineering, Wagholi, Tal. Haveli"
  ) {
    return { ...college, District: "Pune" };
  } else if (
    instituteName ===
    "06319 - Shahajirao Patil Vikas Pratishthan, S.B.Patil College of Engineering, Vangali, Tal. Indapur"
  ) {
    return { ...college, District: "Pune" };
  } else if (
    instituteName ===
    "06834 - Dr.D.Y.Patil College Of Engineering & Innovation,Talegaon"
  ) {
    return { ...college, District: "Pune" };
  } else if (
    instituteName ===
    "05169 - Nagaon Education Society's Gangamai College of Engineering, Nagaon, Tal Dist Dhule"
  ) {
    return { ...college, District: "Dhule" };
  } else if (
    instituteName ===
    "04304 - Cummins College of Engineering For Women, Sukhali (Gupchup), Tal. Hingna Hingna Nagpur"
  ) {
    return { ...college, District: "Nagpur" };
  } else if (
    instituteName ===
    "03436 - B.R. Harne College of Engineering & Technology, Karav, Tal-Ambernath"
  ) {
    return { ...college, District: "Thane" };
  } else if (
    instituteName ===
    "03223 - Mahatma Education Society's Pillai HOC College of Engineering & Technology, Tal. Khalapur. Dist. Raigad"
  ) {
    return { ...college, District: "Raigad" };
  } else if (
    instituteName ===
    "03219 - Koti Vidya Charitable Trust's Smt. Alamuri Ratnamala Institute of Engineering and Technology, Sapgaon, Tal. Shahapur"
  ) {
    return { ...college, District: "Thane" };
  } else {
    return college;
  }
});

// Write the updated data back to the file
writeFileSync("./src/Data/AI_CAP1.json", JSON.stringify(updatedData, null, 2));
