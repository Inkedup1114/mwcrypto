export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          amount: number
          currency: string
          status: 'pending' | 'completed' | 'failed'
          created_at: string
          payment_method: string
          description: string | null
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          currency: string
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
          payment_method: string
          description?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
          payment_method?: string
          description?: string | null
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: 'active' | 'cancelled' | 'expired'
          current_period_start: string
          current_period_end: string
          created_at: string
          cancelled_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status?: 'active' | 'cancelled' | 'expired'
          current_period_start: string
          current_period_end: string
          created_at?: string
          cancelled_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          status?: 'active' | 'cancelled' | 'expired'
          current_period_start?: string
          current_period_end?: string
          created_at?: string
          cancelled_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}