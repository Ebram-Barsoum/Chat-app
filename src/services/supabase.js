import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://gtzrnmylohektnyaejlm.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0enJubXlsb2hla3RueWFlamxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMjE5NDAsImV4cCI6MjAzMTc5Nzk0MH0.ia7AZFuGaQtvAP5bcwhehFqpRABQcBxSvS6xkyCdOLE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
