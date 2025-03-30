

// src/types/index.ts
export interface ImageState {
  uri: string;
  name?: string;
  type?: string;
  file?: File;
}

export interface PredictionResult {
  probability: number;
  riskLevel: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Error';
  riskColor: string;
}