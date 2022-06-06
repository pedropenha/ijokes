function geraLayoutPiada(json){
    document.getElementById("piadaDia").innerHTML = ""
    json.map((piada) => {
        document.getElementById("piadaDia").innerHTML += "<div class=\"card mt-5\">" +
            "<div class=\"card-header d-flex justify-content-between align-items-center\">" +
            "   <h5 class=\"my-0\" id=\"owner\">" +
            "       De: "+piada.pessoa.nome.substr(0,1).toUpperCase() + piada.pessoa.nome.substr(1) +
            "   </h5>" +
            "   <div class=\"d-flex align-itens-center align-content-center text-center\">" +
            "       <p id=\"ranking\" class=\"d-flex align-items-center mb-0 pr-3\">Total de votos: " +
            piada.ranking +
            "       </p>" +
            "   </div>" +
            "</div>" +
            "<img src=\"https://media.discordapp.net/attachments/847178428905422878/982818048731906129/unknown.png?width=464&height=468\" class=\"card-img-top\" alt=\"...\">" +
            "<div class=\"card-body\">" +
            "   <h5 class=\"card-title\" id=\"titulo\">" +
            piada.titulo +
            "   </h5>" +
            "   <p class=\"card-text\" id=\"texto\">" +
            piada.texto +
            "   </p>" +
            "</div>" +
            "<div class=\"card-footer\" style='cursor: pointer'><a class=\"badge badge-pill badge-primary\" id=\"tag\">" +
            piada.categoria.nome +
            "</a></div>" +
            "</div>"
    })
}

const URL_TO_FETCH = "/apis/listar-piadas-usuario?id="+JSON.parse(localStorage.getItem("user")).id

fetch(URL_TO_FETCH, {
    method: 'GET',
}).then((response) => {
    return response.json()
}).then((json) => {
    geraLayoutPiada(json)
}).catch((error) => {
    console.log(error)
})

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
            window.location.reload()
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