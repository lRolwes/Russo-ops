export type FieldPair = [label: string, value: string];

export type Submission = {
  id: string;
  kind: "contact" | "talent";
  inquiry_type: string;
  name: string;
  email: string;
  phone: string;
  fields: FieldPair[];
  page: string;
  status: "new" | "handled";
  email_status: string;
  created_at: string;
};

/** Inquiry types offered on the contact form (and the talent form's fixed type). */
export const INQUIRY_LABELS: Record<string, string> = {
  hiring: "Hiring Need",
  skillbridge: "SkillBridge Assessment",
  veteran: "Veteran Hiring",
  teaming: "Teaming Opportunity",
  advisory: "Workforce Advisory",
  candidate: "Talent Network Profile",
  general: "General Inquiry",
};

export const inquiryLabel = (type: string) => INQUIRY_LABELS[type] ?? "Inquiry";
