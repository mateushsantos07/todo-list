var tarefas = [];

function addTarefa() {
    const input = document.getElementById("tarefa");
    const tarefaTexto = input.value.trim();

    if (tarefaTexto === "") {
        alert("Você tentou adicionar uma tarefa sem texto")
        return;
    }

    const novaTarefa = {
        id: Math.floor(Math.random() * 1000000),
        text: tarefaTexto,
        completed: false
    }
    tarefas.push(novaTarefa);
    localStorage.setItem("Tarefas", JSON.stringify(tarefas))
    render();
    input.value = "";
    input.focus();
}

function render() {
    const listaTarefas = document.getElementById("lista-tarefa")
    listaTarefas.innerHTML = "";

    for (var i = 0; i < tarefas.length; i++) {
        const li = document.createElement("li");

        if (tarefas[i].completed === true) {
            li.classList.add("completed");
        }

        const span = document.createElement("span")
        span.textContent = tarefas[i].text;

        const concluir = document.createElement("button")
        concluir.textContent = tarefas[i].completed ? "Desmarcar" : "Concluir";
        concluir.classList.add("check");
        concluir.setAttribute("onclick", `trocaConcluir(${tarefas[i].id})`);

        const editar = document.createElement("button")
        editar.textContent = "Editar"
        editar.classList.add("edit");
        editar.setAttribute("onclick", `editarTarefa(${tarefas[i].id})`)

        const deletar = document.createElement("button")
        deletar.textContent = "Deletar"
        deletar.classList.add("delete");
        deletar.setAttribute("onclick", `deletarTarefa(${tarefas[i].id})`)

        const div = document.createElement("div")
        div.appendChild(concluir);
        div.appendChild(editar);
        div.appendChild(deletar);

        li.appendChild(span);
        li.appendChild(div);

        listaTarefas.appendChild(li);
    }
}

function trocaConcluir(id) {
    const index = tarefas.findIndex(tarefa => tarefa.id === id);
        const valorAtual = tarefas[index].completed;
        tarefas[index].completed = !valorAtual;
        localStorage.setItem("Tarefas", JSON.stringify(tarefas))
        render();
}

function editarTarefa(id){
    const index = tarefas.findIndex(tarefa => tarefa.id === id);
    const novoTextoTarefa = prompt(`Edite a Tarefa`, tarefas[index].text);

    if(novoTextoTarefa !== null && novoTextoTarefa.trim() !== ""){
        tarefas[index].text = novoTextoTarefa;
        render();
    }
    localStorage.setItem("Tarefas", JSON.stringify(tarefas))
    render();
}

function deletarTarefa(id){
    tarefas = tarefas.filter(tarefas => tarefas.id !== id);
    localStorage.setItem("Tarefas", JSON.stringify(tarefas))
    render();
}

function addPeloEnter(event){
    if(event.key === "Enter"){
        addTarefa();
    }
}

function carregarTarefas(){
    const tarefasLocalStorage = localStorage.getItem("Tarefas");

    if(tarefasLocalStorage){
        tarefas = JSON.parse(tarefasLocalStorage);
        render();
    }
}