let formulario = document.getElementById("formulario")

formulario.addEventListener("submit", (e) => {
    const URL_TO_FETCH = '/apis/cadastrar-piada'
    e.preventDefault()

    let data
    let categoria

    fetch("/apis/listar-with-filter?filtro="+ (new URL(document.location)).searchParams.get("filtro"), {
        method: 'GET',
    }).then((response) => {
        return response.text()
    }).then((text) => {
        categoria = JSON.parse(text)
        console.log(JSON.parse(text))
    }).catch((error) => {
        console.log(error)
    })

    data = {
        titulo: "",
        texto: "",
        keywords: "",
        ranking: "",
        categoria: {
            id: "",
            nome: ""
        }
    }

    fetch(URL_TO_FETCH, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json;charset=UTF-8"}
    }).then((response) => {
        return response.text()
    }).then((text) => {
        console.log(text)
    }).catch((error) => {
        console.log(error)
    })
})