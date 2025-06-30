import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService extends SupabaseClient {
  constructor() {
    const { SUPABASE_URL, SUPABASE_ANON_KEY } = process.env;
    const hasNotSupabaseEnv = !SUPABASE_URL || !SUPABASE_ANON_KEY;

    if (hasNotSupabaseEnv) {
      throw new Error(
        'SupabaseURL and Key must be provided in environment variables',
      );
    }

    super(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
}
