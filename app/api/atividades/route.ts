import { NextRequest, NextResponse } from 'next/server'
import { AtividadeService } from '@/services/AtividadeService'

const atividadeService = new AtividadeService()

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const dataParam = searchParams.get('data')
    
    if (!dataParam) {
      return NextResponse.json({ error: 'Data não fornecida' }, { status: 400 })
    }

    const atividades = await atividadeService.listarPorData(dataParam)
    const todasAtividades = await atividadeService.buscarTodasAtividades()
    return NextResponse.json({ atividades, todasAtividades })
  } catch (error) {
    console.error('Erro ao listar atividades:', error)
    return NextResponse.json(
      { error: 'Erro ao listar atividades' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar dados necessários
    if (!body.titulo || !body.descricao || !body.data) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    const novaAtividade = await atividadeService.criar(body)
    return NextResponse.json(novaAtividade, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar atividade:', error)
    return NextResponse.json(
      { error: 'Erro ao criar atividade' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID não fornecido' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // Se houver data, converter para objeto Date
    if (body.data) {
      body.data = new Date(body.data)
    }

    const atividadeAtualizada = await atividadeService.atualizar(id, body)
    return NextResponse.json(atividadeAtualizada)
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar atividade' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID não fornecido' },
        { status: 400 }
      )
    }

    await atividadeService.excluir(id)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Erro ao excluir atividade:', error)
    return NextResponse.json(
      { error: 'Erro ao excluir atividade' },
      { status: 500 }
    )
  }
} 