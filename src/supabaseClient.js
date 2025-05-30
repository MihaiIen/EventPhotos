import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://frcduafbkxeyfoidghic.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyY2R1YWZia3hleWZvaWRnaGljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NjQ3MzYsImV4cCI6MjA2NDE0MDczNn0.VMYqzKnb6-JSZDlTRUHNFcnLzJRSz9Ra9HtXqDrw_-k";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
