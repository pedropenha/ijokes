let formulario = document.getElementById("formulario")

formulario.addEventListener("submit", (e) => {
    const URL_TO_FETCH = '/apis/cadastrar-piada'
    e.preventDefault()

    let data
    let cat
    // selecionar para enviar
    fetch("/apis/listar-id-cat?id="+document.getElementById("categoria").value ,{
        method: 'GET',
    }).then((response) => {
        return response.text()
    }).then((text) => {
        cat = JSON.parse(text)
        console.log(JSON.parse(text))
    }).catch((error) => {
        console.log(error)
    })

    let tit = document.getElementById("titulo").value
    let text = document.getElementById("texto").value
    let key = document.getElementById("keywords").value

    data = {
        titulo: tit,
        texto: text,
        keywords: key,
        ranking: 0,
        categoria: cat
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
        window.location.href = "../../index.html"
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
        categoria = JSON.parse(text)
        console.log(JSON.parse(text))
        let aux = JSON.parse(text) 
        for (let index = 0; index < aux.length; index++) {
            categoria.innerHTML+="<option value="+aux[index].id+">"+aux[index].nome+"</option>"
        }
    }).catch((error) => {
        console.log(error)
    })