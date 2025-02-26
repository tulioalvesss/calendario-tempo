import { NextResponse } from 'next/server'
import { AtividadeService } from '@/services/AtividadeService'

const atividadeService = new AtividadeService()

export async function GET() {
  try {
    const atividades = await atividadeService.buscarTodasAtividades()
    return NextResponse.json({ atividades })
  } catch (error) {
    console.error('Erro ao listar todas as atividades:', error)
    return NextResponse.json(
      { error: 'Erro ao listar todas as atividades' },
      { status: 500 }
    )
  }
} 