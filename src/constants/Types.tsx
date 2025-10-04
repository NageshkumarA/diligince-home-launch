// src/constants/industries.ts
export const industries = [
  "Sugar Manufacturing",
  "Rice Mills",
  "Coal Mining",
  "Steel Manufacturing",
  "Cement Production",
  "Oil Refining",
  "Natural Gas Processing",
  "Textile Manufacturing",
  "Paper Mills",
  "Chemical Manufacturing",
  "Pharmaceutical Production",
  "Food Processing",
  "Automotive Manufacturing",
  "Electronics Manufacturing",
  "Plastics Manufacturing",
  "Glass Production",
  "Plumber and Wood Products",
  "Fertilizer Production",
  "Power Generation",
  "Water Treatment",
  "Manufacturing",
  "Others"
].sort((a, b) => a.localeCompare(b));


export const expertiseAreas = [
  "Mechanical Engineering",
  "Electrical Engineering",
  "Process Engineering",
  "Chemical Engineering",
  "Civil Engineering",
  "Industrial Safety",
  "Quality Control",
  "Maintenance",
  "Plant Operations",
  "Automation",
  "Robotics",
  "Welding",
  "Heavy Equipment Operation",
  "HVAC Systems",
  "Instrumentation",
  "Logistics Management",
  "Supply Chain Management",
  "Production Management",
  "Project Management",
  "Environmental Compliance"
];

export const vendorCategories = [
  "Service Vendor",
  "Product Vendor",
  "Logistics Vendor"
];

// Specializations based on vendor category
export const specializations = {
  "Service Vendor": [
    "Equipment Maintenance",
    "Plant Installation",
    "Process Optimization",
    "Industrial Cleaning",
    "Quality Inspection",
    "Safety Compliance",
    "Environmental Services",
    "Automation Services",
    "Electrical Services",
    "Mechanical Services"
  ],
  "Product Vendor": [
    "Industrial Equipment",
    "Spare Parts",
    "Raw Materials",
    "Safety Equipment",
    "Tools & Hardware",
    "Industrial Chemicals",
    "Industrial Electronics",
    "Process Control Equipment",
    "Packaging Materials",
    "Laboratory Equipment"
  ],
  "Logistics Vendor": [
    "Transportation Services",
    "Warehouse Management",
    "Heavy Equipment Rental",
    "Crane Services",
    "Forklift Rental",
    "Inventory Management",
    "Supply Chain Solutions",
    "Cold Chain Logistics",
    "Bulk Material Transport",
    "Hazardous Material Transport"
  ]
};
