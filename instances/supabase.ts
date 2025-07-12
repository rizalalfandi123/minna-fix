import { createClient } from "@supabase/supabase-js";
import { Database } from "~/database.types";

const supabase = createClient<Database>(
    "http://192.168.1.216:54321",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
);

export default supabase;
