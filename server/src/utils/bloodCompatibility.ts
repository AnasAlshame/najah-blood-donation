export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export const VALID_BLOOD_TYPES: BloodType[] = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

/**
 * Blood Compatibility Matrix:
 * Which donor blood types can give to a patient with a specific blood type?
 */
export const BLOOD_COMPATIBILITY: Record<BloodType, BloodType[]> = {
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'A-': ['A-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Universal Recipient
  'AB-': ['AB-', 'A-', 'B-', 'O-'],
  'O+': ['O+', 'O-'],
  'O-': ['O-'] // Can only receive from O-
};

export const AN_NAJAH_FACULTIES = [
  'كلية الطب وعلوم الصحة',
  'كلية الهندسة وتكنولوجيا المعلومات',
  'كلية العلوم',
  'كلية القانون والعلوم السياسية',
  'كلية الاقتصاد والعلوم الاجتماعية',
  'كلية العلوم الإنسانية والتربوية',
  'كلية الفنون الجميلة',
  'كلية الشريعة',
  'كلية الزراعة والطب البيطري',
  'كلية تكنولوجيا المعلومات',
  'كلية الدراسات العليا',
  'أخرى'
];

export const PALESTINIAN_CITIES = [
  'نابلس',
  'جنين',
  'طولكرم',
  'قلقيلية',
  'طوباس',
  'سلفيت',
  'رام الله والبيرة',
  'القدس',
  'أريحا',
  'بيت لحم',
  'الخليل',
  'أخرى'
];
