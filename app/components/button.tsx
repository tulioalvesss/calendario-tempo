'use client'

import { useAtividades } from '@/hooks/useAtividades'

interface ButtonProps {
  date: Date | null | [Date | null, Date | null]
  titulo: string
  descricao: string
  hora: string
  onSuccess: () => void
}

export default function Button({ date, titulo, descricao, hora, onSuccess }: ButtonProps) {
    const { criarAtividade } = useAtividades()
    
    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        
        if (!date || Array.isArray(date) || !titulo || !descricao) {
            alert('Por favor, preencha todos os campos')
            return
        }

        try {
            await criarAtividade({
                titulo,
                descricao,
                data: date.toLocaleDateString('pt-BR'),
                hora: hora
            })
            alert('Atividade criada com sucesso!')
            onSuccess()
        } catch (error) {
            console.error('Erro ao criar atividade:', error)
            alert('Erro ao criar atividade')
        }
    }

    return (
        <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            onClick={handleClick}
        >
            Adicionar Atividade
        </button>
    )
}
