import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// Interface para a estrutura do banco de dados
interface DatabaseSchema {
  atividades: {
    id: string
    titulo: string
    descricao: string
    data: string // Datas serão armazenadas como strings ISO
    hora: string
  }[]
}

// Configurar o adaptador para o arquivo JSON
const adapter = new JSONFile<DatabaseSchema>('db.json')
const db = new Low(adapter, { atividades: [] })

// Inicializar o banco de dados
async function initDB() {
  await db.read()
  db.data ||= { atividades: [] }
  await db.write()
}

// Inicializar o banco na primeira importação
initDB()

export { db }
export type { DatabaseSchema }