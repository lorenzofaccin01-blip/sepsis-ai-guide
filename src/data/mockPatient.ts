import { Patient, AntibioticRecommendation, SafetyAlert } from '@/types/patient';

export const mockPatient: Patient = {
  id: 'P-2024-0847',
  name: 'Robert M. Henderson',
  age: 72,
  sex: 'M',
  mrn: 'MRN-847291',
  admissionDate: '2024-12-03T08:45:00',
  location: 'ICU',
  vitals: {
    heartRate: 112,
    systolicBP: 88,
    diastolicBP: 52,
    respiratoryRate: 28,
    spO2: 89,
    temperature: 38.9,
    lactate: 4.2,
  },
  laboratory: {
    wbc: 18.4,
    creatinine: 2.1,
    bilirubin: 1.8,
    platelets: 95,
    procalcitonin: 12.5,
    crp: 285,
    paO2FiO2: 185,
  },
  sofaScore: {
    respiration: 3,
    coagulation: 2,
    liver: 1,
    cardiovascular: 3,
    cns: 1,
    renal: 2,
    total: 12,
  },
  allergies: [
    {
      id: 'a1',
      substance: 'Penicillin',
      reaction: 'Anaphylaxis',
      severity: 'severe',
    },
    {
      id: 'a2',
      substance: 'Sulfonamides',
      reaction: 'Rash',
      severity: 'moderate',
    },
  ],
  riskFactors: {
    mrsa: true,
    pseudomonas: true,
    priorMDRColonization: false,
    recentHospitalization: true,
    recentIVAntibiotics: true,
    immunosuppression: false,
    copd: true,
    chronicLungDisease: true,
    renalFailure: false,
    hepaticFailure: false,
    diabetes: true,
  },
  imagingFindings: {
    lobarInfiltrate: true,
    bilateralInfiltrates: true,
    cavitations: false,
    pleuralEffusion: true,
    consolidation: true,
  },
  qtcInterval: 445,
};

export const mockRecommendations: AntibioticRecommendation[] = [
  {
    id: 'rec1',
    isPrimary: true,
    drugs: [
      {
        name: 'Meropenem',
        dose: '1g',
        route: 'IV',
        frequency: 'q8h',
      },
      {
        name: 'Vancomycin',
        dose: '15mg/kg',
        route: 'IV',
        frequency: 'q12h',
      },
    ],
    targetPathogens: [
      'MRSA',
      'Pseudomonas aeruginosa',
      'Klebsiella pneumoniae',
      'Streptococcus pneumoniae',
    ],
    rationale:
      'Given severe CAP with MRSA and Pseudomonas risk factors, COPD history, and bilateral infiltrates. Meropenem provides broad gram-negative coverage including Pseudomonas. Vancomycin covers MRSA. Penicillin allergy (anaphylaxis) precludes beta-lactam/beta-lactamase inhibitors.',
    stewardshipScore: 85,
    contraindications: [],
    adjustments: [
      'Vancomycin: Target trough 15-20 mcg/mL due to severe infection',
      'Meropenem: Consider extended infusion (3hr) for enhanced efficacy',
      'Renal adjustment may be needed - monitor creatinine clearance',
    ],
  },
  {
    id: 'rec2',
    isPrimary: false,
    drugs: [
      {
        name: 'Cefepime',
        dose: '2g',
        route: 'IV',
        frequency: 'q8h',
      },
      {
        name: 'Linezolid',
        dose: '600mg',
        route: 'IV',
        frequency: 'q12h',
      },
    ],
    targetPathogens: [
      'MRSA',
      'Pseudomonas aeruginosa',
      'Gram-negative bacteria',
    ],
    rationale:
      'Alternative regimen if carbapenem-sparing approach preferred. Cefepime has anti-pseudomonal activity. Linezolid for MRSA coverage (alternative to vancomycin). Note: Cross-reactivity risk with penicillin allergy is low (<2%) but monitor closely.',
    stewardshipScore: 78,
    contraindications: [
      'Monitor for cephalosporin cross-reactivity (penicillin allergy)',
    ],
    adjustments: [
      'Linezolid: Monitor for thrombocytopenia (platelets already low)',
      'Cefepime: Renal dose adjustment recommended with Cr 2.1',
    ],
  },
];

export const mockSafetyAlerts: SafetyAlert[] = [
  {
    id: 'sa1',
    type: 'allergy',
    severity: 'critical',
    message: 'SEVERE PENICILLIN ALLERGY - Anaphylaxis history',
    action: 'All penicillins and aminopenicillins excluded from recommendations',
  },
  {
    id: 'sa2',
    type: 'renal',
    severity: 'warning',
    message: 'Elevated creatinine (2.1 mg/dL) - AKI Stage 2',
    action: 'Vancomycin and aminoglycoside dosing requires adjustment',
  },
  {
    id: 'sa3',
    type: 'qtc',
    severity: 'info',
    message: 'QTc 445ms - Upper normal range',
    action: 'Fluoroquinolones and macrolides used with caution',
  },
];
