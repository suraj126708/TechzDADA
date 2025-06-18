import os

# 🗺 Mapping of wrong district to correct district
corrections = {
    "Bota Sangamner": "Ahmednagar",
    "Chikhali": "Buldhana",
    "Dondaicha": "Dhule",
    "Dumbarwadi": "Pune",
    "Gadhinglaj": "Kolhapur",
    "Ichalkaranji": "Kolhapur",
    "Jaysingpur": "Kolhapur",
    "Kankavli": "Sindhudurg",
    "Karad": "Satara",
    "Karav": "Thane",
    "Karjat": "Raigad",
    "Kokamthan": "Ahmednagar",
    "Kolpahpur": "Kolhapur",
    "Kopargaon": "Ahmednagar",
    "Kuran": "Pune",
    "Malegaon": "Nashik",
    "Malegaon-Baramati": "Pune",
    "Mouza Bamni": "Gadchiroli",
    "NASHIK": "Nashik",
    "Nadurbar": "Nandurbar",
    "Navi Mumbai": "Thane",
    "Nepti": "Ahmednagar",
    "Nile": "Nandurbar",
    "Ohar": "Nanded",
    "Pandharpur": "Solapur",
    "Pusad": "Yavatmal",
    "Ramtek": "Nagpur",
    "Sangali": "Sangli",
    "Sangamner": "Ahmednagar",
    "Sangola": "Solapur",
    "Sevagram": "Wardha",
    "Shegaon": "Buldhana",
    "Shirpur": "Dhule",
    "Tuljapur": "Osmanabad",
    "Wadwadi": "Satara",
    "Warananagar": "Kolhapur",
    "Yelgaon": "Buldhana",
    "Yelur": "Kolhapur"
}

# 📁 Folder containing the JSON files
folder_path = "./Data"  # Change to your folder

# 🔄 Go through each file and replace text
for filename in os.listdir(folder_path):
    if filename.endswith(".json"):
        file_path = os.path.join(folder_path, filename)

        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        for wrong, correct in corrections.items():
            content = content.replace(f'"District": "{wrong}"', f'"District": "{correct}"')

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

print("✅ Full string replacements completed in all JSON files.")
