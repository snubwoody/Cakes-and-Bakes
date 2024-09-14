import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xgeaoarxkbluxxzuxyeb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnZWFvYXJ4a2JsdXh4enV4eWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMjAzMjQsImV4cCI6MjAyNzc5NjMyNH0.MvL-cDJHCodWJXVKrkHD81l9wEV2hmiukmEn0Db8qYw"

export const supabase = createClient(supabaseUrl, supabaseKey);
        