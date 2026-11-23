import { useState } from 'react'

const PRIORIDADES = ['Alta', 'Média', 'Baixa']

export default function TodoApp() {
  // State do formulário
  const [titulo, setTitulo] = useState('')
  const [prioridade, setPrioridade] = useState('Média')

  // State da lista
  const [tarefas, setTarefas] = useState([])

  /* ======================
     EVENTOS
     ====================== */

  function handleSubmit(e) {
    e.preventDefault() // evita reload da página

    if (!titulo.trim()) return

    const novaTarefa = {
      id: Date.now(),
      titulo,
      prioridade
    }

    // Atualização imutável da lista
    setTarefas([...tarefas, novaTarefa])

    // Limpa o campo
    setTitulo('')
  }

  function removerTarefa(id) {
    setTarefas(tarefas.filter(t => t.id !== id))
  }

  function limparLista() {
    setTarefas([])
  }

  return (
    <section style={{ padding: '20px' }}>
      <h2>To-Do List</h2>

      {/* FORMULÁRIO CONTROLADO */}
      <form onSubmit={handleSubmit}>
        <input
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Digite uma tarefa"
        />

        <select
          value={prioridade}
          onChange={e => setPrioridade(e.target.value)}
          style={{ marginLeft: '10px' }}
        >
          {PRIORIDADES.map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        {/* Desabilitado enquanto o campo estiver vazio */}
        <button
          type="submit"
          disabled={!titulo.trim()}
          style={{ marginLeft: '10px' }}
        >
          Adicionar
        </button>
      </form>

      {/* LISTA DINÂMICA */}
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id}>
            {tarefa.titulo} — Prioridade: {tarefa.prioridade}

            <button
              onClick={() => removerTarefa(tarefa.id)}
              style={{ marginLeft: '10px' }}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      {/* UI baseada no state */}
      <p>Total de tarefas: {tarefas.length}</p>

      <button onClick={limparLista} disabled={tarefas.length === 0}>
        Limpar Lista
      </button>
    </section>
  )
}