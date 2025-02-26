'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-900 dark:to-zinc-800 p-6">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Bem-vindo ao Calendário de Atividades
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Organize suas atividades de forma simples e eficiente. 
          Mantenha o controle de seus compromissos e tarefas em um só lugar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 bg-white/80 dark:bg-zinc-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700">
            <svg className="w-12 h-12 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Visualização Intuitiva
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Interface limpa e organizada para melhor visualização de suas atividades diárias.
            </p>
          </div>

          <div className="p-6 bg-white/80 dark:bg-zinc-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-zinc-700">
            <svg className="w-12 h-12 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Fácil Gerenciamento
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Adicione, edite e remova atividades com poucos cliques.
            </p>
          </div>
        </div>

        <Link 
          href="/calendario" 
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Acessar Calendário
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
          Em breve: Sistema de login para maior segurança e personalização.
        </p>
      </div>
    </main>
  )
}
