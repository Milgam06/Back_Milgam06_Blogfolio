import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService extends SupabaseClient {
  private supabase: SupabaseClient;
  constructor() {
    super(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  }
  // async onModuleInit() {
  //   if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  //     throw new Error(
  //       'Supabase URL and Anon Key must be set in environment variables',
  //     );
  //   }
  // }
}
