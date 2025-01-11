import {useState,useEffect} from 'react'
import Index from './components/styles/Index.css'
import { ToastContainer, toast } from 'react-toastify';




function TarefasFunction() {

  const [inputTarefas,setInputTarefas] = useState('')
  const [tarefasArray, setTarefasArray] = useState([])
  const [inputHoras, setInputHoras] = useState('')
  const [horasArray, setHorasArray] = useState([])


    // Carregar tarefas e horários do localStorage
    useEffect(()=> {
    const tarefasArray = localStorage.getItem('tarefasArray')
    const horasArray = localStorage.getItem('horasArray')
    if(tarefasArray){
      setTarefasArray(JSON.parse(tarefasArray))
    }
    if(horasArray){
      setHorasArray(JSON.parse(horasArray))
    }
    }, []);




// Salvar tarefas e horários no localStorage
useEffect( ()=> {
  if(tarefasArray.length > 0){
    localStorage.setItem('@tarefasArray', JSON.stringify(tarefasArray));
  }

  if(horasArray.length > 0){
    localStorage.setItem('@horasArray', JSON.stringify(horasArray))
  }

}, [tarefasArray,horasArray]);











function onTarefas(evt){
  evt.preventDefault();

  const horarioRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

  if(!inputTarefas.trim()){
    toast.info('Preencha o campo tarefa!',{
  autoClose:1500,
theme:'colored'
    });
    return;
  }

  if(!horarioRegex.test(inputHoras.trim())){
    toast.error("Coloque o horário em formato válido (HH:MM)!",{
         autoClose:1500,
    }); 
    return;

  }  else{
    toast.success("Tarefa adicionada com sucesso!",{
      autoClose:1500
    });
  
  };


  setTarefasArray([...tarefasArray,inputTarefas])
  setHorasArray([...horasArray,inputHoras])
  setInputTarefas('')
  setInputHoras('')

}




  return (
    <div className="container">
    <header className="header">
      <h1>Minha Lista de Tarefas</h1>
      <p>Organize suas tarefas diárias de forma simples e prática.</p>
    </header>
  
    <div className="main-content">
      <form onSubmit={onTarefas} className="formulario">
        <label>Tarefa:</label>
        <input
          type="text"
          placeholder="Digite sua tarefa"
          value={inputTarefas}
          onChange={(evento) => setInputTarefas(evento.target.value)}
        />
  
        <label>Horário:</label>
        <input
          type="text"
          placeholder="Digite seu horário"
          value={inputHoras}
          onChange={(evento) => setInputHoras(evento.target.value)}
        />
  
        <button type="submit">Clique aqui</button>
      </form>
  
      <ul className="task-list">
        {tarefasArray.map((evento, index) => (
          <li key={index} className="task-list-item">
            <span className="task">{evento}</span>
            <span className="schedule">{horasArray[index]}</span>
          </li>
        ))}
      </ul>

    </div>
  
    <footer className="footer">
      <p>© 2025 Lista de Tarefas. Todos os direitos reservados.</p>
    </footer>
    <ToastContainer />

  </div>

  
  );
}

export default TarefasFunction;
