// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xxxxx.supabase.co' // Ganti dengan URL yang kalian buat 
const supabaseKey = 'public-anon-key' // Ganti dengan anon yang kalian buat

export const supabase = createClient(supabaseUrl, supabaseKey)
