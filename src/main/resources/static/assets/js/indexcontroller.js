function redirectAddPiada(){
    if(localStorage.getItem("user")!==null){
        if(localStorage.getItem("user").length > 0){
            window.location.href = "pages/inserepiada.html"
        }else{
            window.location.href = "pages/login.html"
        }
    }else{
        window.location.href = "pages/login.html"
    }
}

let piada = []
var auxJson

// traz uma piada aleatoria do banco
    fetch("/apis/listar-todas-piadas", {
        method: 'GET',
    })
    .then((response) => {
    return response.json()
    })
    .then((json) => {
        piada.push(json[Math.floor(Math.random() * (json.length-1))])

        auxJson = piada

        document.getElementById("tituloHead").innerHTML = "Piada do dia"

        geraLayoutPiada(piada)
    })
    .catch((error) => {
    console.log(error)
})

// traz a lista de categorias do banco
    fetch("/apis/listar-todas-categorias", {
        method: 'GET',
    })
    .then((response) => {
        return response.json()
    })
    .then((json) => {
    let arrClass = ['badge-primary', 'badge-info', 'badge-success', 'badge-warning', 'badge-danger']
    json.map(({nome, id}) => {
        document.getElementById("tags").innerHTML += '<a id="'+id+'" title="'+nome+'" class="categorias badge badge-pill ml-2 '+arrClass[Math.floor(Math.random() * (arrClass.length-1))]+'" style=\'cursor: pointer\'>'+nome+'</a>'
    })

    let link = document.getElementsByClassName("categorias")

    for(let i = 0; i < link.length; i++){
        link[i].addEventListener("click", (e) => {
            e.preventDefault()
            const URL_TO_FETCH = '/apis/listar-piadas-categoria'

            let categoria = {
                id: parseInt(link[i].id),
                nome: link[i].title
            }

            document.getElementById("tituloHead").innerHTML = "Categoria "+ link[i].title.substr(0,1).toUpperCase() + link[i].title.substr(1)

            fetch(URL_TO_FETCH, {
                method: 'POST',
                body: JSON.stringify(categoria),
                headers: {"Content-type": "application/json;charset=UTF-8"}
            }).then((response) => {
                return response.json()
            }).then((json) => {
                document.getElementById("piadaDia").innerHTML = ""

                geraLayoutPiada(json)
                auxJson = json
                vota()

            }).catch((error) => {
                console.log(error)
            })
        })
    }
}).catch((error) => {
    console.log(error)
})

function vota(id){
    // let like = document.getElementsByClassName("like")

    // for(let i = 0; i < like.length; i++){
    //     like[i].addEventListener("click", (e) => {
    //         const URL_TO_FETCH = "/apis/vota-ranking?id="
    //
    //         console.log(like[i].id)
    //
    //         fetch(URL_TO_FETCH + like[i].id, {
    //             method: 'GET',
    //         }).then((response) => {
    //             return response.json()
    //         }).then((json) => {
    //             auxJson.map((i) => {
    //                 if(i.id === json.id)
    //                     i.ranking = json.ranking
    //             })
    //             geraLayoutPiada(auxJson)
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    //     })
    // }

    const URL_TO_FETCH = "/apis/vota-ranking?id="


    fetch(URL_TO_FETCH +id, {
        method: 'GET',
    }).then((response) => {
        return response.json()
    }).then((json) => {
        auxJson.map((i) => {
            if(i.id === json.id)
                i.ranking = json.ranking
        })
        geraLayoutPiada(auxJson)
    }).catch((error) => {
        console.log(error)
    })
}

function geraLayoutPiada(json){
    document.getElementById("piadaDia").innerHTML = ""
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
            "       <a id='"+piada.id+"' onclick='vota("+piada.id+")' class=\"btn btn-primary like\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-emoji-smile-upside-down\" viewBox=\"0 0 16 16\"><path d=\"M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0-1a8 8 0 1 1 0 16A8 8 0 0 1 8 0z\"/><path d=\"M4.285 6.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 4.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 3.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 9.5C7 8.672 6.552 8 6 8s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5z\"/></svg></a>" +
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

// busca piada pelo search
let pesquisa = document.getElementById("formulario")

pesquisa.addEventListener("submit", (e) => {
    e.preventDefault()

    const URL_TO_FETCH = "/apis/listar-piadas-filtro?filter="

    document.getElementById("tituloHead").innerHTML = "Pesquisa: " + document.getElementById("inputSearch").value

    fetch(URL_TO_FETCH + document.getElementById("inputSearch").value, {
        method: 'GET',
    }).then((response) => {
        return response.json()
    }).then((json) => {
        auxJson = json
        geraLayoutPiada(json)
    }).catch((error) => {
        console.log(error)
    })
})