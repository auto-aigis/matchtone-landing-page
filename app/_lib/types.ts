export type UserTier = 'free' | 'spark' | 'coach';

export interface User {
  id: string;
  email: string;
  display_name: string | null;
  tier: UserTier;
  created_at: string;
}

export interface SubscriptionStatus {
  status: 'active' | 'inactive';
  tier: UserTier;
  price_id: string | null;
  current_period_end: string | null;
}

export interface BioRewriteRequest {
  input_text: string;
  region: 'Indian English' | 'Philippine English' | 'Brazilian Portuguese English';
  tone: 'Warm & Playful' | 'Confident & Direct' | 'Thoughtful & Genuine';
}

export interface BioRewriteResponse {
  id: string;
  output_text: string;
  explanation: string;
  variant_b?: string;
  branding: boolean;
}

export interface OpenerRequest {
  profile_text: string;
  tone: 'Warm & Playful' | 'Confident & Direct' | 'Thoughtful & Genuine';
}

export interface OpenerResponse {
  id: string;
  openers: [string, string, string];
}

export interface CoachRequest {
  conversation_text: string;
  tone: 'Warm & Playful' | 'Confident & Direct' | 'Thoughtful & Genuine';
}

export interface CoachResponse {
  id: string;
  replies: string[];
}

export interface UsageStats {
  bio_rewrites_used: number;
  bio_rewrites_limit: number;
  opener_messages_used: number;
  opener_messages_limit: number;
  coach_replies_used: number;
  coach_replies_limit: number;
  last_opener_date: string | null;
}

export interface Rewrite {
  id: string;
  tool: 'bio' | 'opener' | 'coach';
  input_text: string;
  output_text: string;
  explanation?: string;
  region?: string;
  tone?: string;
  created_at: string;
}

export interface HistoryResponse {
  rewrites: Rewrite[];
}

export interface AnalyticsData {
  total_rewrites: number;
  tone_breakdown: Record<string, number>;
  tools_breakdown: Record<string, number>;
  improvement_summary: string;
}

export interface RegisterResponse {
  status: string;
  user_id: string;
}