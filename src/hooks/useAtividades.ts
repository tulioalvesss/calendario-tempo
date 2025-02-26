'use client'

import { useState, useEffect } from 'react'
import { IAtividade } from '@/services/AtividadeService'

export function useAtividades() {
  const [atividades, setAtividades] = useState<IAtividade[]>([])
  const [todasAtividades, setTodasAtividades] = useState<IAtividade[]>([])
  const [loading, setLoading] = useState(false)

  const formatarData = (date: Date): string => {
    return date.toLocaleDateString('pt-BR')
  }

  const buscarTodasAtividades = async () => {
    try {
      const response = await fetch('/api/atividades/todas')
      const dados = await response.json()
      setTodasAtividades(dados.atividades)
    } catch (error) {
      console.error('Erro ao buscar todas as atividades:', error)
    }
  }

  const buscarAtividades = async (data: Date) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/atividades?data=${formatarData(data)}`)
      const dados = await response.json()
      setAtividades(dados.atividades)
      setTodasAtividades(dados.todasAtividades)
    } catch (error) {
      console.error('Erro ao buscar atividades:', error)
    } finally {
      setLoading(false)
    }
  }

  // Buscar todas as atividades ao montar o componente
  useEffect(() => {
    buscarTodasAtividades()
  }, [])

  const criarAtividade = async (atividade: Omit<IAtividade, 'id' | 'done'>) => {
    try {
      const response = await fetch('/api/atividades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(atividade),
      })
      
      if (!response.ok) {
        throw new Error('Erro ao criar atividade')
      }
      
      const novaAtividade = await response.json()
      setAtividades(prev => [...prev, novaAtividade])
      setTodasAtividades(prev => [...prev, novaAtividade])
      return novaAtividade
    } catch (error) {
      console.error('Erro ao criar atividade:', error)
      throw error
    }
  }

  const marcarComoConcluida = async (id: string, done: boolean) => {
    try {
      const response = await fetch(`/api/atividades/${id}/concluir`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done }),
      })
      
      if (!response.ok) {
        throw new Error('Erro ao marcar atividade como concluída')
      }

      const atividadeAtualizada = await response.json()
      
      setAtividades(prev => 
        prev.map(ativ => 
          ativ.id === id ? atividadeAtualizada : ativ
        )
      )
      
      setTodasAtividades(prev =>
        prev.map(ativ =>
          ativ.id === id ? atividadeAtualizada : ativ
        )
      )
      
      return atividadeAtualizada
    } catch (error) {
      console.error('Erro ao marcar atividade como concluída:', error)
      throw error
    }
  }

  const atualizarAtividade = async (id: string, dados: Partial<IAtividade>) => {
    try {
      const response = await fetch(`/api/atividades/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      })
      
      if (!response.ok) {
        throw new Error('Erro ao atualizar atividade')
      }

      const atividadeAtualizada = await response.json()
      setAtividades(prev => 
        prev.map(ativ => 
          ativ.id === id ? atividadeAtualizada : ativ
        )
      )
      setTodasAtividades(prev =>
        prev.map(ativ =>
          ativ.id === id ? atividadeAtualizada : ativ
        )
      )
      
      return atividadeAtualizada
    } catch (error) {
      console.error('Erro ao atualizar atividade:', error)
      throw error
    }
  }

  const excluirAtividade = async (id: string) => {
    try {
      const response = await fetch(`/api/atividades/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Erro ao excluir atividade')
      }

      setAtividades(prev => prev.filter(ativ => ativ.id !== id))
      setTodasAtividades(prev => prev.filter(ativ => ativ.id !== id))
    } catch (error) {
      console.error('Erro ao excluir atividade:', error)
      throw error
    }
  }

  return {
    atividades,
    todasAtividades,
    loading,
    buscarAtividades,
    criarAtividade,
    atualizarAtividade,
    excluirAtividade,
    marcarComoConcluida,
    formatarData
  }
} 