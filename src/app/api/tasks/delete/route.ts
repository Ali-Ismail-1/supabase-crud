import { NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient';

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
  }

  const { error } = await supabase.from('tasks').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: 'Task deleted successfully' },
    { status: 200 }
  );
}
