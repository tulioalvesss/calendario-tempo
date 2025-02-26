'use client'

import { useState, useEffect } from 'react'
import Calendar from '../components/Calendar'
import { useAtividades } from '@/hooks/useAtividades'

export default function CalendarioPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { atividades, loading, buscarAtividades, todasAtividades, marcarComoConcluida } = useAtividades()

  // Buscar atividades na montagem do componente
  useEffect(() => {
    buscarAtividades(selectedDate)
  }, []) // Executa apenas na montagem

  // Atualizar atividades quando a data for alterada
  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    buscarAtividades(date)
  }

  const handleToggleDone = async (id: string, currentDone: boolean) => {
    try {
      await marcarComoConcluida(id, !currentDone)
    } catch (error) {
      console.error('Erro ao marcar atividade:', error)
      alert('Erro ao marcar atividade como concluída')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-900 dark:to-zinc-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Meu Calendário de Atividades
          </h1>
          <a 
            href="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Calendar 
              onDateChange={handleDateChange} 
              activities={atividades}
              allActivities={todasAtividades}
            />
          </div>
          
          <section className="bg-white/80 dark:bg-zinc-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-zinc-700">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Atividades do Dia
            </h2>
            
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : atividades.length > 0 ? (
                atividades.map((atividade) => (
                  <div 
                    key={atividade.id}
                    className={`p-4 bg-white dark:bg-zinc-700 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-zinc-600 ${
                      atividade.done ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold text-gray-800 dark:text-white ${
                        atividade.done ? 'line-through' : ''
                      }`}>
                        {atividade.titulo}
                      </h3>
                      <button
                        onClick={() => atividade.id && handleToggleDone(atividade.id, atividade.done)}
                        className={`p-1 rounded-full transition-colors ${
                          atividade.done 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400'
                        }`}
                      >
                        <svg className="w-5 h-5 group" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d={atividade.done 
                              ? "M5 13l4 4L19 7" 
                              : "M9 12l2 2 4-4"
                            }
                            className={atividade.done ? "group-hover:hidden" : ""}
                          />
                          {atividade.done && (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round" 
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                              className="hidden group-hover:block text-red-500"
                            />
                          )}
                        </svg>
                      </button>
                    </div>
                    <p className={`text-sm text-gray-600 dark:text-gray-300 mt-2 ${
                      atividade.done ? 'line-through' : ''
                    }`}>
                      {atividade.descricao}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {atividade.data}
                      </span>
                      {atividade.hora && (
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {atividade.hora}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400 mt-4">
                    Nenhuma atividade para este dia
                  </p>
                </div>
              )}
            </div>
          </section>
          <section className="bg-white/80 dark:bg-zinc-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-zinc-700">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Todas as Atividades
            </h2>
            <div className="space-y-4 overflow-y-auto max-h-[300px]">
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                todasAtividades.map((atividade) => (
                  <div 
                    className={`text-sm text-gray-600 dark:text-gray-300 mt-2 bg-white dark:bg-zinc-700 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-zinc-600 p-4 ${
                      atividade.done ? 'opacity-50' : ''
                    }`}
                    key={atividade.id}
                  >
                    <span className={atividade.done ? 'line-through' : ''}>
                      {atividade.titulo} - {atividade.data} {atividade.hora ? ' - ' + atividade.hora : ''}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 