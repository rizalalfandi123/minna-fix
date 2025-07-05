export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      letter_blocks: {
        Row: {
          created_at: string
          deleted: boolean
          description: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          description?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          description?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      letter_levels: {
        Row: {
          created_at: string
          deleted: boolean
          id: string
          letter_type_id: string
          number: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: string
          letter_type_id: string
          number: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: string
          letter_type_id?: string
          number?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "letter_levels_letter_type_id_fkey"
            columns: ["letter_type_id"]
            isOneToOne: false
            referencedRelation: "letter_types"
            referencedColumns: ["id"]
          },
        ]
      }
      letter_positions: {
        Row: {
          column: number
          created_at: string
          deleted: boolean
          id: string
          row: number
          updated_at: string
        }
        Insert: {
          column: number
          created_at?: string
          deleted?: boolean
          id?: string
          row: number
          updated_at?: string
        }
        Update: {
          column?: number
          created_at?: string
          deleted?: boolean
          id?: string
          row?: number
          updated_at?: string
        }
        Relationships: []
      }
      letter_progress: {
        Row: {
          created_at: string
          deleted: boolean
          id: string
          letter_level_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: string
          letter_level_id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: string
          letter_level_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "letter_progress_letter_level_id_fkey"
            columns: ["letter_level_id"]
            isOneToOne: false
            referencedRelation: "letter_levels"
            referencedColumns: ["id"]
          },
        ]
      }
      letter_questions: {
        Row: {
          created_at: string
          deleted: boolean
          id: string
          question: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: string
          question: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: string
          question?: Json
          updated_at?: string
        }
        Relationships: []
      }
      letter_questions_to_letter_levels: {
        Row: {
          letter_level_id: string
          letter_question_id: string
          number: number
        }
        Insert: {
          letter_level_id: string
          letter_question_id: string
          number?: number
        }
        Update: {
          letter_level_id?: string
          letter_question_id?: string
          number?: number
        }
        Relationships: [
          {
            foreignKeyName: "letter_questions_to_letter_levels_letter_level_id_fkey"
            columns: ["letter_level_id"]
            isOneToOne: false
            referencedRelation: "letter_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "letter_questions_to_letter_levels_letter_question_id_fkey"
            columns: ["letter_question_id"]
            isOneToOne: false
            referencedRelation: "letter_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      letter_types: {
        Row: {
          created_at: string
          deleted: boolean
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: string
          name?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      letters: {
        Row: {
          block_id: string
          created_at: string
          deleted: boolean
          id: string
          name: string
          position_id: string
          symbol: string
          type_id: string
          updated_at: string
        }
        Insert: {
          block_id: string
          created_at?: string
          deleted?: boolean
          id?: string
          name: string
          position_id: string
          symbol: string
          type_id: string
          updated_at?: string
        }
        Update: {
          block_id?: string
          created_at?: string
          deleted?: boolean
          id?: string
          name?: string
          position_id?: string
          symbol?: string
          type_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "letters_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "letter_blocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "letters_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "letter_positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "letters_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "letter_types"
            referencedColumns: ["id"]
          },
        ]
      }
      letters_to_letter_levels: {
        Row: {
          letter_id: string
          letter_level_id: string
        }
        Insert: {
          letter_id: string
          letter_level_id: string
        }
        Update: {
          letter_id?: string
          letter_level_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "letters_to_letter_levels_letter_id_fkey"
            columns: ["letter_id"]
            isOneToOne: false
            referencedRelation: "letters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "letters_to_letter_levels_letter_level_id_fkey"
            columns: ["letter_level_id"]
            isOneToOne: false
            referencedRelation: "letter_levels"
            referencedColumns: ["id"]
          },
        ]
      }
      unit_levels: {
        Row: {
          created_at: string
          deleted: boolean
          id: string
          number: number
          unit_question_block_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: string
          number?: number
          unit_question_block_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: string
          number?: number
          unit_question_block_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "unit_levels_unit_question_block_id_fkey"
            columns: ["unit_question_block_id"]
            isOneToOne: false
            referencedRelation: "unit_question_blocks"
            referencedColumns: ["id"]
          },
        ]
      }
      unit_progress: {
        Row: {
          created_at: string
          deleted: boolean
          id: string
          unit_level_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: string
          unit_level_id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: string
          unit_level_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "unit_progress_letter_level_id_fkey"
            columns: ["unit_level_id"]
            isOneToOne: false
            referencedRelation: "letter_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unit_progress_unit_level_id_fkey"
            columns: ["unit_level_id"]
            isOneToOne: false
            referencedRelation: "unit_levels"
            referencedColumns: ["id"]
          },
        ]
      }
      unit_question_blocks: {
        Row: {
          created_at: string
          deleted: boolean
          description: Json
          id: string
          number: number
          type: Database["public"]["Enums"]["unit_block_type"]
          unit_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          description: Json
          id?: string
          number?: number
          type?: Database["public"]["Enums"]["unit_block_type"]
          unit_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          description?: Json
          id?: string
          number?: number
          type?: Database["public"]["Enums"]["unit_block_type"]
          unit_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "unit_question_blocks_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      unit_questions: {
        Row: {
          created_at: string
          deleted: boolean
          id: string
          key: string
          question: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: string
          key: string
          question: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: string
          key?: string
          question?: Json
          updated_at?: string
        }
        Relationships: []
      }
      unit_questions_to_unit_levels: {
        Row: {
          number: number
          unit_level_id: string
          unit_question_id: string
          with_hint: boolean
        }
        Insert: {
          number?: number
          unit_level_id: string
          unit_question_id: string
          with_hint?: boolean
        }
        Update: {
          number?: number
          unit_level_id?: string
          unit_question_id?: string
          with_hint?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "unit_questions_to_unit_levels_unit_level_id_fkey"
            columns: ["unit_level_id"]
            isOneToOne: false
            referencedRelation: "unit_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unit_questions_to_unit_levels_unit_question_id_fkey"
            columns: ["unit_question_id"]
            isOneToOne: false
            referencedRelation: "unit_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          created_at: string
          deleted: boolean
          id: string
          number: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          id?: string
          number?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          id?: string
          number?: number
          updated_at?: string
        }
        Relationships: []
      }
      words: {
        Row: {
          created_at: string
          deleted: boolean
          en: string
          id: string
          key: string
          others: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted?: boolean
          en: string
          id: string
          key?: string
          others?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted?: boolean
          en?: string
          id?: string
          key?: string
          others?: Json
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      unit_block_type: "vocabulary" | "grammar"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      unit_block_type: ["vocabulary", "grammar"],
    },
  },
} as const

