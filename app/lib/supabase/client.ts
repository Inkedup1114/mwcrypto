import { createClient } from '@supabase/supabase-js'
import { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Helper function to get the current user
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// Helper function to get user profile
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error getting user profile:', error)
    return null
  }
}

// Helper function to update user profile
export const updateUserProfile = async (userId: string, updates: Partial<Database['public']['Tables']['users']['Update']>) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating user profile:', error)
    return null
  }
}

// Helper function to get user payments
export const getUserPayments = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error getting user payments:', error)
    return null
  }
}

// Helper function to create a payment record
export const createPayment = async (payment: Database['public']['Tables']['payments']['Insert']) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert(payment)
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating payment:', error)
    return null
  }
}

// Helper function to get available slots
export const getAvailableSlots = async (startDate: string, endDate: string) => {
  try {
    const { data, error } = await supabase
      .from('available_slots')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .eq('is_available', true)
      .order('date', { ascending: true })
      .order('start_time', { ascending: true })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error getting available slots:', error)
    return null
  }
}

// Helper function to create a booking with sessions
export const createBookingWithSessions = async (
  booking: Database['public']['Tables']['bookings']['Insert'],
  sessions: Database['public']['Tables']['sessions']['Insert'][]
) => {
  try {
    const { data: bookingData, error: bookingError } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single()
    
    if (bookingError) throw bookingError

    const sessionsWithBookingId = sessions.map(session => ({
      ...session,
      booking_id: bookingData.id
    }))

    const { data: sessionsData, error: sessionsError } = await supabase
      .from('sessions')
      .insert(sessionsWithBookingId)
      .select()

    if (sessionsError) throw sessionsError

    return { booking: bookingData, sessions: sessionsData }
  } catch (error) {
    console.error('Error creating booking with sessions:', error)
    return null
  }
}

// Helper function to get user bookings with sessions
export const getUserBookingsWithSessions = async (userId: string) => {
  try {
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select(`
        *,
        sessions:sessions(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (bookingsError) throw bookingsError
    return bookings
  } catch (error) {
    console.error('Error getting user bookings with sessions:', error)
    return null
  }
}

// Helper function to update session status
export const updateSessionStatus = async (
  sessionId: string,
  status: Database['public']['Tables']['sessions']['Row']['status']
) => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .update({ status })
      .eq('id', sessionId)
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating session status:', error)
    return null
  }
}

// Helper function to update booking status
export const updateBookingStatus = async (
  bookingId: string,
  status: Database['public']['Tables']['bookings']['Row']['status']
) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', bookingId)
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating booking status:', error)
    return null
  }
}