const fs = require("fs");
const path = "src/Data/CAP_03_2024.json";
const backupPath = path + ".backup";

const fixes = {
  "Adgaon Nashik": "Nashik",
  "Agaskhind Tal. Sinnar": "Nashik",
  Akkalkuwa: "Nandurbar",
  Akluj: "Solapur",
  Andheri: "Mumbai Suburban",
  "Avasari Khurd": "Pune",
  "Badlapur(W)": "Thane",
  "Baramati Dist.Pune": "Pune",
  "Chhatrapati Sambhajinagar": "Aurangabad",
  "Chincholi Dist. Nashik": "Nashik",
  Haveli: "Pune",
  Ichalkaranji: "Kolhapur",
  "Kharghar Navi Mumbai": "Palghar",
  Lonavala: "Pune",
  Miraj: "Sangli",
  "Narhe (Ambegaon)": "Pune",
  "New Panvel": "Raigad",
  Panvel: "Raigad",
  Pisoli: "Pune",
  Ravet: "Pune",
  Ulhasnagar: "Thane",
  Vasai: "Palghar",
  Virar: "Palghar",
  Wagholi: "Pune",
  solapur: "Solapur",
};

// Make a backup
fs.copyFileSync(path, backupPath);
console.log(`Backup created at ${backupPath}`);

const raw = fs.readFileSync(path, "utf8");
let changed = false;

// Try to parse as JSON object or JSON with top-level object keys
let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error("Could not parse JSON. Aborting.");
  process.exit(1);
}

// If the file is a plain object (not an array), convert to array of entries
const isArray = Array.isArray(data);

function updateDistricts(obj, keyName = null) {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      updateDistricts(obj[key], key);
    }
  }
  // Check if this object has a 'district' field and its key or fields match any fix
  if (obj.district && typeof obj.district === "string") {
    for (const loc in fixes) {
      if (
        (keyName && keyName.includes(loc)) ||
        (obj.name && obj.name.includes(loc)) ||
        (obj.college && obj.college.includes(loc)) ||
        (obj.address && obj.address.includes(loc)) ||
        obj.district === loc
      ) {
        if (obj.district !== fixes[loc]) {
          obj.district = fixes[loc];
          changed = true;
        }
      }
    }
  }
}

if (isArray) {
  data.forEach((item) => updateDistricts(item));
} else {
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "object" && value !== null) {
      updateDistricts(value, key);
    }
  }
}

if (changed) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log("✅ Districts updated successfully.");
} else {
  console.log("No changes were made.");
}
