export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type LeadStatus =
  | "new"
  | "researching"
  | "enriched"
  | "email_generated"
  | "sent"
  | "replied"
  | "meeting_booked"
  | "bounced";

export type EmailKind =
  | "cold_email"
  | "follow_up_1"
  | "follow_up_2"
  | "linkedin_message";

export type EmailStatus = "draft" | "queued" | "sent" | "opened" | "replied" | "bounced";

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          plan: "starter" | "growth" | "scale";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          plan?: "starter" | "growth" | "scale";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          plan?: "starter" | "growth" | "scale";
          updated_at?: string;
        };
        Relationships: [];
      };
      campaigns: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          status: "draft" | "active" | "paused" | "completed";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          status?: "draft" | "active" | "paused" | "completed";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          name?: string;
          description?: string | null;
          status?: "draft" | "active" | "paused" | "completed";
          updated_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          user_id: string;
          campaign_id: string | null;
          name: string;
          email: string;
          company: string;
          website: string | null;
          linkedin_url: string | null;
          status: LeadStatus;
          enrichment: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          campaign_id?: string | null;
          name: string;
          email: string;
          company: string;
          website?: string | null;
          linkedin_url?: string | null;
          status?: LeadStatus;
          enrichment?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          campaign_id?: string | null;
          name?: string;
          email?: string;
          company?: string;
          website?: string | null;
          linkedin_url?: string | null;
          status?: LeadStatus;
          enrichment?: Json | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      research_data: {
        Row: {
          id: string;
          user_id: string;
          lead_id: string;
          company_description: string | null;
          industry: string | null;
          company_size: string | null;
          products_services: string[];
          company_summary: string | null;
          business_overview: string | null;
          pain_points: string[];
          growth_opportunities: string[];
          business_goals: string[];
          outreach_angles: string[];
          source_url: string | null;
          raw_response: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lead_id: string;
          company_description?: string | null;
          industry?: string | null;
          company_size?: string | null;
          products_services?: string[];
          company_summary?: string | null;
          business_overview?: string | null;
          pain_points?: string[];
          growth_opportunities?: string[];
          business_goals?: string[];
          outreach_angles?: string[];
          source_url?: string | null;
          raw_response?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["research_data"]["Insert"]>;
        Relationships: [];
      };
      emails: {
        Row: {
          id: string;
          user_id: string;
          lead_id: string;
          campaign_id: string | null;
          kind: EmailKind;
          subject: string | null;
          body: string;
          status: EmailStatus;
          resend_message_id: string | null;
          tracking_token: string;
          sent_at: string | null;
          opened_at: string | null;
          replied_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          lead_id: string;
          campaign_id?: string | null;
          kind: EmailKind;
          subject?: string | null;
          body: string;
          status?: EmailStatus;
          resend_message_id?: string | null;
          tracking_token?: string;
          sent_at?: string | null;
          opened_at?: string | null;
          replied_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["emails"]["Insert"]>;
        Relationships: [];
      };
      analytics: {
        Row: {
          id: string;
          user_id: string;
          campaign_id: string | null;
          total_leads: number;
          emails_generated: number;
          emails_sent: number;
          opens: number;
          replies: number;
          meetings_booked: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          campaign_id?: string | null;
          total_leads?: number;
          emails_generated?: number;
          emails_sent?: number;
          opens?: number;
          replies?: number;
          meetings_booked?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["analytics"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
