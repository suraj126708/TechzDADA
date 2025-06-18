#!/usr/bin/env bash

FILE="./src/Data/AI_CAP1.json" 

declare -A fixes=(
  ["Adgaon Nashik"]="Nashik"
  ["Agaskhind Tal. Sinnar"]="Nashik"
  ["Akkalkuwa"]="Nandurbar"
  ["Akluj"]="Solapur"
  ["Andheri"]="Mumbai Suburban"
  ["Avasari Khurd"]="Pune"
  ["Badlapur(W)"]="Thane"
  ["Baramati Dist.Pune"]="Pune"
  ["Chhatrapati Sambhajinagar"]="Aurangabad"
  ["Chincholi Dist. Nashik"]="Nashik"
  ["Haveli"]="Pune"
  ["Ichalkaranji"]="Kolhapur"
  ["Kharghar Navi Mumbai"]="Palghar"
  ["Lonavala"]="Pune"
  ["Miraj"]="Sangli"
  ["Narhe (Ambegaon)"]="Pune"
  ["New Panvel"]="Raigad"
  ["Panvel"]="Raigad"
  ["Pisoli"]="Pune"
  ["Ravet"]="Pune"
  ["Ulhasnagar"]="Thane"
  ["Vasai"]="Palghar"
  ["Virar"]="Palghar"
  ["Wagholi"]="Pune"
  ["solapur"]="Solapur"
)

for key in "${!fixes[@]}"; do
  district="${fixes[$key]}"
  sed -i "/\"$key\"/,/\"district\":/s/\"district\": \"[^\"]*\"/\"district\": \"$district\"/" "$FILE"
done

echo "✅ All specified locations have been updated to their correct districts."
