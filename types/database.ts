export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          website_url: string | null;
          github_url: string | null;
          linkedin_url: string | null;
          xp: number;
          level: number;
          streak: number;
          role: "student" | "admin";
          last_activity_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & { id: string };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      courses: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          long_description: string | null;
          area: string | null;
          difficulty: string | null;
          estimated_hours: number | null;
          cover_url: string | null;
          gradient: string | null;
          icon: string | null;
          is_published: boolean;
          xp_total: number;
          prerequisites: string[] | null;
          objectives: string[] | null;
          final_project: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["courses"]["Row"]> & { title: string; slug: string };
        Update: Partial<Database["public"]["Tables"]["courses"]["Row"]>;
      };
      exercises: {
        Row: {
          id: string;
          lesson_id: string | null;
          course_id: string | null;
          type: string;
          title: string;
          instructions: string | null;
          question: string | null;
          options: Json;
          correct_answer: Json;
          expected_answer: string | null;
          expected_output: string | null;
          starter_code: string | null;
          test_cases: Json;
          explanation: string | null;
          hint: string | null;
          xp_reward: number;
          difficulty: string;
          order_index: number;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["exercises"]["Row"]> & { type: string; title: string };
        Update: Partial<Database["public"]["Tables"]["exercises"]["Row"]>;
      };
    };
  };
};
