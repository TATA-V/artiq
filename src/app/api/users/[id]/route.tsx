import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest, { params } : { params: {id: string} }) {
  if (Number(params.id) > 10) {
    return NextResponse.json({ error: 'User Not Found' }, { status: 404 });
  }
  return NextResponse.json({ id: 1, name: 'tata' });
}
