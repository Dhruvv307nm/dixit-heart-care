import { Procedure, ClinicPolicy, ClinicTiming } from './types';

export const PROCEDURES: Procedure[] = [
  {
    id: 'ecg',
    name: 'ECG / EKG',
    marathiName: 'ईसीजी (इलेक्ट्रोकार्डियोग्राम)',
    price: 500,
    description: 'A quick, painless test that records the electrical signals in your heart to detect arrhythmias or previous heart attacks.',
    iconName: 'HeartPulse',
    duration: '10 mins',
    instructions: ['Wear loose, comfortable clothing.', 'Avoid applying oily creams or lotions to the chest area.']
  },
  {
    id: 'echo',
    name: '2D Echo',
    marathiName: '२डी इकोकार्डियोग्राफी',
    price: 2000,
    description: 'Ultrasound imaging of the heart to assess structure, valve function, and overall pumping capacity.',
    iconName: 'Heart',
    duration: '30 mins',
    instructions: ['No special preparation is needed.', 'You may eat, drink, and take medications as normal.']
  },
  {
    id: 'tmt',
    name: 'TMT Test',
    marathiName: 'टीएमटी (ट्रेडमिल टेस्ट)',
    price: 2500,
    description: 'Stress test evaluating heart function during physical exertion to detect coronary artery disease.',
    iconName: 'TrendingUp',
    duration: '45 mins',
    instructions: [
      'Do not eat a heavy meal 2 hours before the test.',
      'Wear comfortable walking shoes or sports shoes.',
      'Consult your cardiologist if you take beta-blocker medications.'
    ]
  },
  {
    id: 'holter',
    name: 'Holter Monitor',
    marathiName: 'होल्टर मॉनिटरिंग (२४ तास)',
    price: 3500,
    description: 'Continuous 24-hour ECG recording to catch irregular heartbeats that may not occur during a standard exam.',
    iconName: 'Clock',
    duration: '24 hours',
    instructions: [
      'Do not bathe or shower while wearing the monitor.',
      'Keep a detailed log of any symptoms experienced (palpitations, dizziness).',
      'Avoid high-voltage areas or metal detectors.'
    ]
  },
  {
    id: 'lipid',
    name: 'Lipid Profile',
    marathiName: 'लिपिड प्रोफाईल',
    price: 800,
    description: 'Blood test to measure cholesterol levels and triglycerides, key indicators of cardiovascular risk.',
    iconName: 'Droplet',
    duration: '15 mins',
    instructions: [
      'A 10 to 12-hour overnight fast is strictly required.',
      'Only plain water is allowed during the fasting period.'
    ]
  },
  {
    id: 'consultation',
    name: 'Consultation',
    marathiName: 'डॉक्टरांचा सल्ला',
    price: 1000,
    description: 'Comprehensive review of your medical history, symptoms, and test results with our expert cardiologists.',
    iconName: 'Stethoscope',
    duration: '20 mins',
    instructions: [
      'Bring all your previous medical records and ECG sheets.',
      'List your current active medications or bring their packaging.'
    ]
  }
];

export const POLICIES: ClinicPolicy[] = [
  {
    id: 'policy-1',
    title: 'Appointments & Walk-ins',
    description: 'Patients are seen strictly by prior appointment. Walk-in patients will be accommodated only if slots are available. Emergencies are prioritized.',
    iconName: 'Calendar',
    type: 'info'
  },
  {
    id: 'policy-2',
    title: 'Emergency Cases',
    description: 'In case of a severe emergency, please proceed directly to the nearest hospital emergency room. For urgent but non-life-threatening cardiac issues during clinic hours, please contact the reception immediately.',
    iconName: 'ShieldAlert',
    type: 'warning'
  },
  {
    id: 'policy-3',
    title: 'Payment & Insurance',
    description: 'Fees are payable at the time of service. We accept cash, credit/debit cards, and UPI. For insurance claims, required documentation will be provided after full settlement of bills.',
    iconName: 'DollarSign',
    type: 'success'
  }
];

export const TIMINGS: ClinicTiming[] = [
  {
    days: 'Mon - Sat',
    hours: '3:00 PM - 8:00 PM'
  },
  {
    days: 'Sunday',
    hours: 'Closed (Emergencies Only)',
    isClosed: true
  }
];

export const CONTACT_INFO = {
  address: 'Dixit Heart Care Centre, Radhika Road, Satara, Maharashtra 415002',
  phoneNumbers: ['02162 233266', '+917218692294'],
  emergencyLine: '+917218692294',
  whatsappNumber: '+917218692294',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Dixit+Heart+Care+Centre,+Radhika+Road,+Satara'
};
