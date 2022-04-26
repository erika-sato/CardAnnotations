import './global.css'
import './main.css'
import './aside.css'
import './app.css'
import Notes from './Components/Notes'
import {useState, useEffect} from 'react'
import api from './services/api'
import RadioButton from './Components/RadioButton'

function App() {

  const [selectedValue, setSelectedValue] = useState('all')
  const [title, setTitles] = useState('')
  const [notes, setNotes] = useState('')
  const [allNotes, setAllNotes] = useState([])

useEffect(() => {

  getAllNotes()
}, [])

async function getAllNotes() {
  const response = await api.get('/annotations')
  setAllNotes(response.data)
}


async function loadNotes(option) {
  const params = {priority: option};
  const response = await api.get('/priorities', {params})

  if(response) {
    setAllNotes(response.data)
  }
}

//ao clicar em qualquer radiobutton, a variável é selecionada (all, false, true) e faz verificação
//se for all, executa getAllNotes() e retorna todas as notas
//se for true, executará loadNotes(), retornando apenas as notas prioritárias
function handleChange(e) {
  setSelectedValue(e.value)

  if(e.checked && e.value != 'all') {
    loadNotes(e.value)
  } else {
    getAllNotes()
  }
}


async function handleDelete(id) {
  const deletedNote = await api.delete(`/annotations/${id}`)  //restarão no array todas as notes que forem diferentes da note que contém o id informado. Assim, como o id informado foi deletado, a pág será atualizada contendo somente as demais notes
  if(deletedNote) {
    setAllNotes(allNotes.filter(note => note._id != id))
  }
}


async function handleChangePriority(id) {
  const note = await api.post(`/priorities/${id}`)

  if(note && selectedValue != 'all') {
    loadNotes(selectedValue)
  } else if (note) {
    getAllNotes()
  }
}


  async function handleSubmit(e) {
    e.preventDefault()

  const response = await api.post('/annotations', {
    title,
    notes,
    priority: false
  })
  setTitles('')
  setNotes('')

if(selectedValue != 'all') {
  getAllNotes()
} else {
  setAllNotes([...allNotes, response.data])  //ao adicionar uma nova tarefa, esta é adicionada à aplicação/visualização sem necessidade de dar refresh
}
  setSelectedValue('all')
  
}

useEffect(() => {
  function enableSubmitButton() {
    let btn = document.getElementById('btn_submit')
    btn.style.background = '#ffd3ca'
    if(title && notes) {
      btn.style.background = '#eb8f7a'
    }
  }
  enableSubmitButton()
}, [title, notes])

  return (
    <div id="app">

      <aside>

        <strong>Caderno de Notas</strong>

        <form onSubmit={handleSubmit}>
          <div className="input_block">
            <label htmlFor="title">Título da Anotação</label>
            <input
            required
            maxLength="30"
            value={title}
            onChange = { e => setTitles(e.target.value)} 
            />

          </div>


          <div className="input_block">
            <label htmlFor="nota">Anotações</label>
            <textarea
            required
            value={notes}
            onChange = { e => setNotes(e.target.value)} 
            />

          </div>

          <button id="btn_submit" type="submit">Salvar</button>
        </form>
        <RadioButton 
        selectedValue={selectedValue}
        handleChange={handleChange}
          />
      </aside>


      <main>
          <ul>
            {allNotes.map(data => (

              <Notes 
              data={data}
              key={data._id}
              handleDelete={handleDelete} 
              handleChangePriority={handleChangePriority}
              />
            
            ))}
           
          </ul>
      </main>

    </div>
  )
}

export default App
