import { NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient';

export async function PUT(request: Request) {
  const { id, completed } = await request.json();
  const { data, error } = await supabase
    .from('tasks')
    .update({ completed })
    .eq('id', id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 200 });
}
