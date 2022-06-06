let formulario = document.getElementById("formulario")

formulario.addEventListener("submit", (e) => {
    const URL_TO_FETCH = '/apis/cadastrar-piada'
    e.preventDefault()

    let data
    // selecionar para enviar
    fetch("/apis/listar-id-cat?id=" + document.getElementById("categoria").value,{
        method: 'GET',
    }).then((response) => {
        return response.text()
    }).then((text) => {

        data = {
            titulo: document.getElementById("titulo").value,
            texto: document.getElementById("texto").value,
            keywords: document.getElementById("keywords").value,
            ranking: 0,
            categoria: JSON.parse(text),
            pessoa: JSON.parse(localStorage.getItem("user"))
        }

        //cadastrar piada
        fetch(URL_TO_FETCH, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        }).then((response) => {
            return response.text()
        }).then((text) => {
            console.log(text)
            setInterval(() => {
                window.location.href = "../../index.html"
            }, 5000)
        }).catch((error) => {
            console.log(error)
        })
    }).catch((error) => {
        console.log(error)
    })
})

let categoria = document.getElementById("categoria")
// serve para exibir e selecionar
fetch("/apis/listar-todas-categorias", {
    method: 'GET',
}).then((response) => {
    return response.text()
}).then((text) => {
    console.log(JSON.parse(text))
    let aux = JSON.parse(text)
    for (let index = 0; index < aux.length; index++) {
        categoria.innerHTML+="<option value="+aux[index].id+">"+aux[index].nome.substr(0,1).toUpperCase()+aux[index].nome.substr(1)+"</option>"
    }
}).catch((error) => {
    console.log(error)
})