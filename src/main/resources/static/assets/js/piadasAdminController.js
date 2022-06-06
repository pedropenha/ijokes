function geraLayoutPiada(json){
    document.getElementById("piadaDia").innerHTML = ""

    let vetorImgs = ['../../assets/img/cute-sea-otter.gif', '../../assets/img/michael-scott.gif', '../../assets/img/otter-shock.gif', '../../assets/img/raccoon-disappear.gif', '../../assets/img/the-office-ouch.gif']

    if(json.length > 0){
        json.map((piada) => {
            document.getElementById("piadaDia").innerHTML += "<div class=\"card mt-5\">" +
                "<div class=\"card-header d-flex justify-content-between align-items-center\">" +
                "   <h5 class=\"my-0\" id=\"owner\">" +
                "       De: "+piada.pessoa.nome.substr(0,1).toUpperCase() + piada.pessoa.nome.substr(1) +
                "   </h5>" +
                "   <div class=\"d-flex align-itens-center align-content-center text-center\">" +
                "       <p id=\"ranking\" class=\"d-flex align-items-center mb-0 pr-3\">" +
                piada.ranking +
                "       </p>" +
                "       <a id='"+piada.id+"' class=\"btn btn-outline-danger deletar\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z\"/>\n" +
                "</svg></a>" +
                "   </div>" +
                "</div>" +
                "<img src='"+vetorImgs[Math.floor(Math.random() * (vetorImgs.length))]+"' class=\"card-img-top\" alt=\"...\">" +
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
    }else{
        document.getElementById("piadaDia").innerHTML = "<h3 class='text-white text-center'>Nenhuma piada encontrada! :(</h3>"
    }

    let deletar = document.getElementsByClassName("deletar")

    for(let i = 0; i < deletar.length; i++){
        deletar[i].addEventListener("click", () => {
            const URL_TO_FETCH = "/apis/delete-piada?id=" + deletar[i].id

            fetch(URL_TO_FETCH, {
                method: 'GET',
            }).then((response) => {
                return response.text()
            }).then((text) => {
                window.location.reload()
            }).catch((error) => {
                console.log(error)
            })
        })
    }
}

const URL_TO_FETCH = "/apis/listar-todas-piadas"


fetch(URL_TO_FETCH, {
        method: 'GET',
    }).then((response) => {
        return response.json()
    }).then((json) => {
        geraLayoutPiada(json)
    }).catch((error) => {
        console.log(error)
    })

let submit = document.getElementById("formulario")

submit.addEventListener("submit", (e) => {
    e.preventDefault()

    let data = {
        nome: document.getElementById("categoriaPiada").value
    }

    fetch("/apis/cadastrar-categoria", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json;charset=UTF-8"}
    }).then((response) => {
        return response.json()
    }).then((json) => {
        console.log(json)
    }).catch((error) => {
        console.log(error)
    })
})