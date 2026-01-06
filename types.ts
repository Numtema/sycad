
export enum DocumentType {
  ATTRIBUTION = "Attestation d’attribution de parcelle",
  CESSION = "Attestation de cession de parcelle"
}

export interface AttachmentMetadata {
  reference: string;
  date: string;
  amount: string;
  validityDate: string;
  authority: string;
  observation: string;
  fileName?: string;
}

export interface Quittance {
  id: string;
  reference: string;
  date: string;
  amount: string;
}

export interface FormData {
  // Step 1
  documentType: DocumentType | "";
  subject: string;
  requestDate: string;
  reference: string;
  observation: string;
  
  // Step 2: Parcelle concernée
  commune: string;
  section: string;
  lot: string;
  parcelNumber: string;
  surface: string;
  usage: string;

  // Step 3: Attributaire / Bénéficiaire
  isMandataire: boolean;
  beneficiaryId: string; // Linked to a person record

  // Step 4: Pièces jointes
  attachments: Record<string, AttachmentMetadata>; // Map of document index to rich metadata

  // Step 5: Paiements et quittances
  quittances: Quittance[];
}

export interface Step {
  id: number;
  label: string;
  status: 'active' | 'completed' | 'pending';
}
