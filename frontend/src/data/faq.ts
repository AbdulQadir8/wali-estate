export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'What is the process of buying property in DHA Lahore?',
    answer: 'The process involves several steps: 1) Identify the property through a trusted dealer like MAAN ESTATE, 2) Verify property documents and status, 3) Negotiate price and terms, 4) Sign the agreement and pay token money, 5) Complete transfer process at DHA office with all required documents, 6) Pay remaining amount and receive transfer letter.',
    category: 'Buying Process'
  },
  {
    id: '2',
    question: 'What documents are required for property transfer in DHA?',
    answer: 'Required documents include: Original allotment letter, CNIC copies of buyer and seller, Passport size photographs, NOC from seller (if applicable), Latest utility bills, Transfer application form, and Payment receipts. Additional documents may be required based on property type.',
    category: 'Documentation'
  },
  {
    id: '3',
    question: 'How long does the property transfer process take?',
    answer: 'The typical transfer process takes 15-30 working days, depending on document completeness and DHA approval timelines. Working with authorized dealers can help expedite the process.',
    category: 'Process'
  },
  {
    id: '4',
    question: 'What are the current DHA file rates?',
    answer: 'DHA file rates vary daily based on market conditions. Rates differ by phase, plot size, and file type (Allocation vs Affidavit). Contact MAAN ESTATE for real-time file rates and market analysis.',
    category: 'File Rates'
  },
  {
    id: '5',
    question: 'What is the difference between Allocation and Affidavit files?',
    answer: 'Allocation files are issued to original allottees by DHA and carry higher market value. Affidavit files are transferred through a legal affidavit from the original allottee to the new owner. Allocation files are generally preferred for their clear title and higher resale value.',
    category: 'File Types'
  },
  {
    id: '6',
    question: 'How can I verify a property before purchase?',
    answer: 'Property verification involves checking: 1) DHA official records for plot status, 2) Original documents authenticity, 3) Any pending dues or litigation, 4) Seller identity and ownership rights. MAAN ESTATE provides comprehensive property verification services.',
    category: 'Verification'
  },
  {
    id: '7',
    question: 'What are the transfer expenses in DHA Lahore?',
    answer: 'Transfer expenses include DHA transfer fee, stamp duty, registration charges, and agent commission. The exact amount varies by property type and size. Contact us for the latest transfer expense schedule.',
    category: 'Expenses'
  },
  {
    id: '8',
    question: 'Can foreigners buy property in DHA Lahore?',
    answer: 'Yes, foreigners can buy property in DHA Lahore with certain documentation requirements including passport copies, visa details, and NOC from relevant authorities. The process is similar with additional verification steps.',
    category: 'Foreign Buyers'
  },
  {
    id: '9',
    question: 'What is the balloting process in DHA?',
    answer: 'Balloting is a computerized random allocation process where plots are assigned to file holders. Registered file holders participate in the balloting, and results are announced transparently. Successful applicants receive allotment letters.',
    category: 'Balloting'
  },
  {
    id: '10',
    question: 'How do I list my property with MAAN ESTATE?',
    answer: 'To list your property, contact us through phone, WhatsApp, or visit our office at 63-MB, Phase-6, DHA Lahore. Our team will verify your property details, take professional photographs, and list it across our marketing channels.',
    category: 'Selling'
  },
  {
    id: '11',
    question: 'What areas does MAAN ESTATE cover?',
    answer: 'MAAN ESTATE specializes in all DHA phases in Lahore (Phase 1-9 Prism), DHA Multan, DHA Bahawalpur, DHA Quetta, DHA Peshawar, and DHA Gujranwala. We also deal in Dubai properties.',
    category: 'Coverage'
  },
  {
    id: '12',
    question: 'What services does MAAN ESTATE provide?',
    answer: 'We provide complete real estate services including buying, selling, and renting properties, property valuation, investment consulting, file trading, transfer assistance, and rental management.',
    category: 'Services'
  }
];

export const faqCategories = ['All', 'Buying Process', 'Documentation', 'Process', 'File Rates', 'File Types', 'Verification', 'Expenses', 'Foreign Buyers', 'Balloting', 'Selling', 'Coverage', 'Services'];
