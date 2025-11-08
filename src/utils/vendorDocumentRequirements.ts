export const getRequiredDocuments = (
  vendorCategory: string,
  specialization?: string
): { name: string; type: string }[] => {
  // Base mandatory documents for all vendors
  const mandatory = [
    { name: 'GST Certificate', type: 'gst_certificate' },
    { name: 'PAN Card', type: 'pan_card' },
    { name: 'Registration Certificate', type: 'registration_certificate' }
  ];
  
  // Category-specific documents
  const categoryDocs: Record<string, { name: string; type: string }[]> = {
    'Service Vendor': [
      { name: 'Service Certifications', type: 'service_certifications' },
      { name: 'Insurance Certificate', type: 'insurance_certificate' }
    ],
    'Product Vendor': [
      { name: 'Product Certifications', type: 'product_certifications' },
      { name: 'Quality Certificates', type: 'quality_certificates' }
    ],
    'Logistics Vendor': [
      { name: 'Transport License', type: 'transport_license' },
      { name: 'Vehicle Registration', type: 'vehicle_registration' }
    ]
  };
  
  return [
    ...mandatory,
    ...(categoryDocs[vendorCategory] || [])
  ];
};

export const getDocumentDisplayName = (documentType: string): string => {
  const displayNames: Record<string, string> = {
    'gst_certificate': 'GST Certificate',
    'pan_card': 'PAN Card',
    'registration_certificate': 'Registration Certificate',
    'service_certifications': 'Service Certifications',
    'insurance_certificate': 'Insurance Certificate',
    'technical_qualifications': 'Technical Qualifications',
    'product_certifications': 'Product Certifications',
    'quality_certificates': 'Quality Certificates',
    'manufacturer_authorization': 'Manufacturer Authorization',
    'product_catalog': 'Product Catalog',
    'transport_license': 'Transport License',
    'vehicle_registration': 'Vehicle Registration',
    'goods_insurance': 'Goods Insurance',
    'warehouse_license': 'Warehouse License'
  };
  
  return displayNames[documentType] || documentType;
};
