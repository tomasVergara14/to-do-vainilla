
const ToDoListForm = document.getElementById("ToDoListForm")
const input = document.getElementById('input')
const TaskList = document.getElementById('TaskList')
const Template = document.getElementById("Template").content
const fragment = document.createDocumentFragment()

const tasks = {}

// Esperamos a que cargue el documento
document.addEventListener('DOMContentLoaded', ()=>{

    // Comenzamos con el formulario
    ToDoListForm.addEventListener('click', e=>{
        //Para evitar que se ejecute el submit y recargue
        e.preventDefault()
        // creamos la funcion para definir la tarea al cargar
        setTasks(e)
        console.log(tasks)
    })
    const setTasks=(e)=>{
        //Se revisa que el campo de input no este vacio
        if(input.value.trim() === ""){
            // Si lo esta se muestra por consola se necesita agregar una tarea
            console.log('You need to add a task')
            // El return evita que se ejecute lo siguiente si se cumple la condicion
            return
        }
        // Se crea el bosquejo de la tarea
        const task ={
            id:Date.now(),
            text: input.value,
            state: false
        }
        // Agregamnos a la tarea en la posicion de tarea.id
        tasks[task.id] = task
        //Limpiamos el formulario
        ToDoListForm.reset()
        //Con el focus vuelve a seleccionarse el campo de input
        input.focus()
        // Declaramos una nueva funcion para seleccionar tareas puntuales
        taskSelect()
    }

    const taskSelect = ()=>{

        // Primero revisamos si la lista tiene elementos
        if(Object.values(tasks).length===0){
            TaskList.innerHTML = ` <div>No Tasks</div> `
            return
        }
        // Si hay recorremos el objeto de tareas y crear un clon
        Object.values(tasks).forEach(task=>{
            
            //Limpiamos la lista para que no se vayan agregando al clon que creamos
            TaskList.innerHTML=""
            // Clonamos el template para trabajar sobre este
            const clone = Template.cloneNode(true)

            //Revisamos el estado y cambiamos la clase para que cambie el css
            if(task.state){
                clone.querySelector('.EachTask').classList.replace('warning', 'okey')
            }

            //Trabajamos sobre el clone y el contenido de su texto
            clone.querySelector('p').textContent = task.text
            // Se setean los botones para que cada uno tenga el id de la tarea seleccionada
            clone.querySelectorAll('.fas')[0].dataset.id = task.id
            clone.querySelectorAll('.fas')[1].dataset.id = task.id
            clone.querySelectorAll('.fas')[2].dataset.id = task.id
            // Se agrega al fragment el clone que recien creamos y modificamos
            fragment.appendChild(clone)

            
        })
        //Una vez se agrego al fragment se lo agregamos  al div que muestra la lista de tareas
        TaskList.appendChild(fragment)
    }

    //Sobre la lista de tareas vamos a ejecutar la funcion que realizaran los botones
    TaskList.addEventListener('click', (e)=>{
        ButtonsActions(e)
    })
    //Definimos la funcion de los botones

    const ButtonsActions = (e)=>{

        // Fijamos la condicion de estar seleccionando el boton de ok
        if(e.target.classList.contains("fa-check-circle")){
            // cambiamos el estado de la tarea seleccionada a true
            tasks[e.target.dataset.id].state = true
            //ejecutamos nuevamente la funcion para seleccionar
            taskSelect()
        }
        // Hacemos lo mismo si queremos volver al estado inicial pero lo volvemos false
        if(e.target.classList.contains("fa-undo-alt")){
            tasks[e.target.dataset.id].state = false
            //ejecutamos para que cambie
            taskSelect()
        }
        // Para eliminar seleccionamos el boton
        if(e.target.classList.contains("fa-minus-circle")){
            // Aplicamos el metodo delete de la tarea
            delete tasks[e.target.dataset.id]
            //ejecutamos
            taskSelect()
        }
        e.stopPropagation()
    }
})