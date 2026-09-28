export type UserRole = 'guru' | 'koordinator_mtss' | 'konselor' | 'admin' | 'pimpinan';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  assignedClassIds?: string[]; // IDs of classes assigned if role is guru
  avatar?: string;
  phone?: string;
}

export type TierLevel = 'Tier 1' | 'Tier 2' | 'Tier 3';

export type Gender = 'L' | 'P';

export interface Student {
  id: string;
  nisn: string;
  fullName: string;
  nickname: string;
  classId: string;
  className: string;
  grade: number;
  gender: Gender;
  birthDate: string;
  currentTier: TierLevel;
  guardianName: string;
  guardianContact?: string;
  needsReviewFlag: boolean;
  flagReason?: string;
  notes?: string;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface BehaviorObservation {
  id: string;
  studentId: string;
  studentName?: string;
  classId: string;
  className?: string;
  date: string;
  time: string;
  locationContext: string; // e.g. Ruang Kelas, Lapangan, Kantin, Koridor, Perpustakaan
  situationBefore: string; // Antecedent / Situasi sebelum kejadian
  behaviorObserved: string; // Perilaku objektif yang diamati
  staffResponse: string; // Respons / tindakan staf seketika
  impactOnActivity: string; // Dampak terhadap pembelajaran / aktivitas
  supportStrategyGiven: string; // Strategi dukungan yang langsung diberikan
  resultAfterSupport: string; // Hasil setelah intervensi langsung
  additionalNotes?: string;
  observerId: string;
  observerName: string;
  observerRole: string;
  createdAt: string;
  updatedAt: string;
}

export type SocialEmotionalScale = 'belum_terlihat' | 'mulai_berkembang' | 'berkembang' | 'konsisten';

export interface SocialEmotionalObservation {
  id: string;
  studentId: string;
  studentName?: string;
  classId: string;
  className?: string;
  date: string;
  indicatorGroupId: string; // e.g. self_awareness, self_management, social_awareness, relationship_skills, decision_making
  indicatorGroupName: string;
  indicatorId: string;
  indicatorName: string;
  ratingScale: SocialEmotionalScale;
  ratingScore: number; // 1 to 4
  evidenceNotes: string; // Bukti catatan perilaku konkret
  context: string; // Konteks situasi (misal: saat kerja kelompok, saat istirahat)
  supportStrategy?: string; // Strategi dukungan penguatan
  followUpResult?: string; // Hasil tindak lanjut
  observerId: string;
  observerName: string;
  observerRole: string;
  createdAt: string;
  updatedAt: string;
}

export type SupportPlanStatus = 'Draft' | 'Active' | 'Under Review' | 'Completed' | 'Discontinued';

export interface SupportPlan {
  id: string;
  studentId: string;
  studentName?: string;
  className?: string;
  tier: TierLevel;
  areaOfNeed: string; // Area kebutuhan (misal: Regulasi Emosi, Fokus Tugas, Keterampilan Berbagi, Adaptasi Transisi)
  targetGoals: string; // Tujuan dukungan yang spesifik dan terukur
  strategies: string[]; // Strategi / intervensi yang direncanakan
  frequency: string; // misal: 2x seminggu, Setiap sesi pagi, Saat transisi pelajaran
  duration: string; // misal: 4 minggu, 8 minggu
  personInCharge: string; // Penanggung jawab (misal: Guru Kelas, Guru Pendamping, Konselor)
  startDate: string;
  targetReviewDate: string;
  status: SupportPlanStatus;
  resultNotes?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
  updatedBy?: string;
}

export interface InterventionLog {
  id: string;
  planId?: string;
  studentId: string;
  studentName?: string;
  date: string;
  time?: string;
  strategyUsed: string;
  durationMinutes: number;
  studentResponse: string; // Respons siswa selama intervensi
  observedResult: string; // Hasil yang teramati
  notes?: string;
  followUpNeeded: boolean;
  followUpNotes?: string;
  loggedBy: string;
  loggedByName: string;
  loggedByRole: string;
  createdAt: string;
}

export interface ProgressMonitoringRecord {
  id: string;
  studentId: string;
  studentName?: string;
  date: string;
  periodLabel: string; // e.g. "Minggu 1 - Ags 2026", "Bulan 1"
  domain: string; // e.g. "Regulasi Diri", "Fokus Belajar", "Interaksi Teman Sebaya"
  targetMetricName: string;
  scoreNumeric: number; // 1 to 5 scale or percentage
  ratingLabel: string; // e.g. "Memerlukan Dukungan Tambahan", "Menunjukkan Kemajuan Positif", "Mencapai Target"
  operationalStatus: 'memerlukan_pemantauan' | 'menunjukkan_kemajuan' | 'perlu_ditinjau_tim' | 'target_tercapai';
  notes: string;
  recordedBy: string;
  recordedByName: string;
  createdAt: string;
}

export type FollowUpStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
export type PriorityLevel = 'Rendah' | 'Sedang' | 'Tinggi';

export interface FollowUp {
  id: string;
  studentId: string;
  studentName?: string;
  title: string;
  description: string;
  dueDate: string;
  priority: PriorityLevel;
  status: FollowUpStatus;
  assignedToId: string;
  assignedToName: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  completedAt?: string;
  resolutionNotes?: string;
}

export type MtssReviewType = 'Rutin' | 'Flagged Eskalasi' | 'Permintaan Guru' | 'Evaluasi Selesai';
export type MtssReviewStatus = 'Approved' | 'Deferred' | 'Strategy Adjusted';

export interface MtssReview {
  id: string;
  studentId: string;
  studentName?: string;
  reviewDate: string;
  reviewType: MtssReviewType;
  currentTier: TierLevel;
  recommendedTier: TierLevel;
  observationsSummary: string;
  interventionSummary: string;
  decisionNotes: string; // Catatan keputusan tim profesional
  nextReviewDate: string;
  committeeMembers: string[]; // Anggota tim yang hadir dalam review
  status: MtssReviewStatus;
  createdById: string;
  createdByName: string;
  createdAt: string;
}

export interface MasterClass {
  id: string;
  name: string;
  grade: number;
  homeroomTeacherId: string;
  homeroomTeacherName: string;
  academicYear: string;
  totalStudents?: number;
}

export interface MasterIndicatorGroup {
  id: string;
  name: string;
  description: string;
  indicators: MasterIndicatorItem[];
}

export interface MasterIndicatorItem {
  id: string;
  groupId: string;
  name: string;
  description: string;
  examples: string;
  active: boolean;
}

export interface MasterStrategy {
  id: string;
  category: string; // e.g. "Regulasi Emosi", "Transisi Kelas", "Keterampilan Sosial", "Fokus Akademik"
  name: string;
  description: string;
  suggestedTier?: TierLevel;
  tierSuitability?: string[];
  steps?: string[];
}

export interface ReviewThresholdRule {
  id: string;
  name: string;
  description: string;
  suggestedFlagReason: string;
  isActive: boolean;
  thresholdValue?: number;
}

export interface SystemConfig {
  schoolName: string;
  academicYear: string;
  activeSemester: 'Ganjil' | 'Genap';
  tierDescriptions: {
    tier1: string;
    tier2: string;
    tier3: string;
  };
  reviewThresholdRules: {
    behaviorObsThresholdPerMonth: number;
    socialEmotionalEmergingCount: number;
    unresolvedFollowUpDays: number;
  };
}

export interface AuditLog {
  id: string;
  entityType: 'STUDENT' | 'BEHAVIOR_OBS' | 'SE_OBS' | 'SUPPORT_PLAN' | 'INTERVENTION_LOG' | 'PROGRESS' | 'FOLLOW_UP' | 'MTSS_REVIEW' | 'USER' | 'CONFIG';
  entityId: string;
  actionType: 'CREATE' | 'UPDATE' | 'DELETE' | 'TIER_CHANGE' | 'STATUS_CHANGE' | 'REVIEW_COMPLETED';
  description: string;
  beforeData?: any;
  afterData?: any;
  userId: string;
  userName: string;
  userRole: UserRole;
  timestamp: string;
  reason?: string;
}
