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
          stripe_payment_intent_id: string | null
          stripe_payment_status: string | null
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          currency: string
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
          stripe_payment_intent_id?: string | null
          stripe_payment_status?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed'
          created_at?: string
          stripe_payment_intent_id?: string | null
          stripe_payment_status?: string | null
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          payment_id: string | null
          created_at: string
          status: 'pending' | 'confirmed' | 'cancelled'
          notes: string | null
        }
        Insert: {
          id?: string
          user_id: string
          payment_id?: string | null
          created_at?: string
          status?: 'pending' | 'confirmed' | 'cancelled'
          notes?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          payment_id?: string | null
          created_at?: string
          status?: 'pending' | 'confirmed' | 'cancelled'
          notes?: string | null
        }
      }
      sessions: {
        Row: {
          id: string
          booking_id: string
          date: string
          start_time: string
          end_time: string
          status: 'scheduled' | 'completed' | 'cancelled'
          created_at: string
          notes: string | null
        }
        Insert: {
          id?: string
          booking_id: string
          date: string
          start_time: string
          end_time: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          created_at?: string
          notes?: string | null
        }
        Update: {
          id?: string
          booking_id?: string
          date?: string
          start_time?: string
          end_time?: string
          status?: 'scheduled' | 'completed' | 'cancelled'
          created_at?: string
          notes?: string | null
        }
      }
      available_slots: {
        Row: {
          id: string
          date: string
          start_time: string
          end_time: string
          is_available: boolean
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          start_time: string
          end_time: string
          is_available?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          start_time?: string
          end_time?: string
          is_available?: boolean
          created_at?: string
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