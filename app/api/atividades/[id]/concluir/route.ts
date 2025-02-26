import { NextRequest, NextResponse } from 'next/server'
import { AtividadeService } from '@/services/AtividadeService'

const atividadeService = new AtividadeService()

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const atividadeAtualizada = await atividadeService.marcarComoConcluida(params.id, body.done)
    return NextResponse.json(atividadeAtualizada)
  } catch (error) {
    console.error('Erro ao marcar atividade como concluída:', error)
    return NextResponse.json(
      { error: 'Erro ao marcar atividade como concluída' },
      { status: 500 }
    )
  }
} 