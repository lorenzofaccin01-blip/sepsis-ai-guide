export interface Vitals {
  heartRate: number;
  systolicBP: number;
  diastolicBP: number;
  respiratoryRate: number;
  spO2: number;
  temperature: number;
  lactate: number;
}

export interface Laboratory {
  wbc: number;
  creatinine: number;
  bilirubin: number;
  platelets: number;
  procalcitonin: number;
  crp: number;
  paO2FiO2: number;
}

export interface SOFAScore {
  respiration: number;
  coagulation: number;
  liver: number;
  cardiovascular: number;
  cns: number;
  renal: number;
  total: number;
}

export interface Allergy {
  id: string;
  substance: string;
  reaction: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface DrugInteraction {
  id: string;
  drug1: string;
  drug2: string;
  severity: 'minor' | 'moderate' | 'major';
  description: string;
}

export interface ImagingFindings {
  lobarInfiltrate: boolean;
  bilateralInfiltrates: boolean;
  cavitations: boolean;
  pleuralEffusion: boolean;
  consolidation: boolean;
}

export interface RiskFactors {
  mrsa: boolean;
  pseudomonas: boolean;
  priorMDRColonization: boolean;
  recentHospitalization: boolean;
  recentIVAntibiotics: boolean;
  immunosuppression: boolean;
  copd: boolean;
  chronicLungDisease: boolean;
  renalFailure: boolean;
  hepaticFailure: boolean;
  diabetes: boolean;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  sex: 'M' | 'F';
  mrn: string;
  admissionDate: string;
  location: 'ED' | 'ICU';
  vitals: Vitals;
  laboratory: Laboratory;
  sofaScore: SOFAScore;
  allergies: Allergy[];
  riskFactors: RiskFactors;
  imagingFindings: ImagingFindings;
  qtcInterval: number;
}

export interface AntibioticRecommendation {
  id: string;
  isPrimary: boolean;
  drugs: {
    name: string;
    dose: string;
    route: string;
    frequency: string;
  }[];
  targetPathogens: string[];
  rationale: string;
  stewardshipScore: number;
  contraindications: string[];
  adjustments: string[];
}

export interface SafetyAlert {
  id: string;
  type: 'allergy' | 'interaction' | 'qtc' | 'renal' | 'hepatic';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  action: string;
}
