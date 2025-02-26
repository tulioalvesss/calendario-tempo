import { db } from '@/lib/lowdb'
import { v4 as uuidv4 } from 'uuid'

export interface IAtividade {
  id?: string
  titulo: string
  descricao: string
  data: string // formato DD/MM/YYYY
  hora: string
  done: boolean
}

export class AtividadeService {
  
  async criar(data: IAtividade) {
    await db.read()
    
    const novaAtividade = {
      id: uuidv4(),
      titulo: data.titulo,
      descricao: data.descricao,
      data: data.data,
      hora: data.hora,
      done: false
    }
    
    db.data.atividades.push(novaAtividade)
    await db.write()
    
    return novaAtividade
  }

  async listarPorData(data: string) {
    await db.read()
        
    return db.data.atividades
      .filter(atividade => atividade.data === data)
      .sort((a, b) => a.hora.localeCompare(b.hora))
  }

  async marcarComoConcluida(id: string, done: boolean) {
    await db.read()
    
    const index = db.data.atividades.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Atividade não encontrada')
    
    const atividade = db.data.atividades[index]
    const atividadeAtualizada = {
      ...atividade,
      done
    }
    
    db.data.atividades[index] = atividadeAtualizada
    await db.write()
    
    return atividadeAtualizada
  }

  async atualizar(id: string, data: Partial<IAtividade>) {
    await db.read()
    
    const index = db.data.atividades.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Atividade não encontrada')
    
    const atividade = db.data.atividades[index]
    const atividadeAtualizada = {
      ...atividade,
      ...data,
    }
    
    db.data.atividades[index] = atividadeAtualizada
    await db.write()
    
    return atividadeAtualizada
  }

  async buscarTodasAtividades() {
    await db.read()
    return db.data.atividades
  }

  async excluir(id: string) {
    await db.read()
    
    const index = db.data.atividades.findIndex(a => a.id === id)
    if (index === -1) throw new Error('Atividade não encontrada')
    
    const atividade = db.data.atividades[index]
    db.data.atividades.splice(index, 1)
    await db.write()
    
    return atividade
  }
} 