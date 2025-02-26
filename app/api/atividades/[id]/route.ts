import { NextRequest, NextResponse } from 'next/server'
import { AtividadeService } from '@/services/AtividadeService'

const atividadeService = new AtividadeService()

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Se houver data, converter para objeto Date
    if (body.data) {
      body.data = new Date(body.data)
    }

    const atividadeAtualizada = await atividadeService.atualizar(params.id, body)
    return NextResponse.json(atividadeAtualizada)
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar atividade' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await atividadeService.excluir(params.id)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Erro ao excluir atividade:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir atividade' },
      { status: 500 }
    )
  }
} 