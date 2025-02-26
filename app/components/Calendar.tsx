'use client'

import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Button from './button'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

interface CalendarProps {
  onDateChange: (date: Date) => void
  activities?: Array<{
    data: string
    titulo: string
    descricao: string
    hora: string
    done: boolean
  }>
  allActivities?: Array<{
    data: string
    titulo: string
    descricao: string
    hora: string
    done: boolean
  }>
}

export default function CalendarComponent({ onDateChange, activities, allActivities }: CalendarProps) {
  const [date, setDate] = useState<Value>(new Date())
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [hora, setHora] = useState('')

  const handleDayClick = (value: Value) => {
    if (value instanceof Date) {
      setDate(value)
      onDateChange(value)
    }
  }

  const handleSuccess = () => {
    // Limpa os campos do formulário
    setTitulo('')
    setDescricao('')
    setHora('')
    // Atualiza as atividades com a data atual
    if (date instanceof Date) {
      onDateChange(date)
    }
  }

  // Função para contar atividades por data
  const getActivityCount = (date: Date) => {
    const dateString = date.toLocaleDateString('pt-BR')
    return allActivities?.filter(activity => 
      activity.data === dateString && !activity.done
    ).length || 0
  }

  return (
    <div className="bg-white/80 dark:bg-zinc-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-zinc-700">
      <Calendar
        value={date}
        locale="pt-BR"
        className="rounded-lg border-none !w-full"
        tileContent={({ date }) => {
          const count = getActivityCount(date)
          return count > 0 ? (
            <div className="absolute top-0 right-1">
              <div className="flex items-center justify-center w-5 h-5 bg-red-500 dark:bg-red-600 rounded-full text-white text-xs font-bold">
                {count}
              </div>
            </div>
          ) : null
        }}
        tileClassName={({ date }) => {
          const hasActivity = getActivityCount(date) > 0
          return `relative ${hasActivity 
            ? "hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            : "hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"}`
        }}
        onChange={handleDayClick}
      />
      
      <form className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Nova Atividade
        </h3>
        
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="titulo" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Título
            </label>
            <input 
              type="text" 
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o título da atividade" 
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="descricao" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição
            </label>
            <input 
              type="text" 
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a descrição" 
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="hora" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Hora
            </label>
            <input 
              type="time" 
              id="hora"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <Button 
          date={date} 
          titulo={titulo} 
          descricao={descricao} 
          hora={hora} 
          onSuccess={handleSuccess}
        />
      </form>
    </div>
  )
} 