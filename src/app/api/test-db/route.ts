// Exemplo para App Router (src/app/api/test-db/route.ts)
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    // No seu arquivo src/app/api/test-db/route.ts
    try {
    const result = await query({
        query: 'SELECT 1 + 1 AS result',
    });
    return NextResponse.json({ success: true, data: result });
    } catch (error: unknown) { // Mudança de any para unknown
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ 
        success: false, 
        message: "Falha na conexão", 
        error: errorMessage 
    }, { status: 500 });
    }
}