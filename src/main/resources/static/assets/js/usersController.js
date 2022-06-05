const URL_TO_FETCH = '/apis/list-all-user'

fetch(URL_TO_FETCH, {
    method: 'GET',
}).then((response) => {
    return response.text()
}).then((text) => {
    let aux = JSON.parse(text)
    let tbody = document.querySelector("#tbody")

    let userLogged = JSON.parse(localStorage.getItem("user"))

    aux.map(({id, nome, email, nivel}) => {
        if(userLogged.id !== id){
            tbody.innerHTML += "<tr>" +
                "<th>"+id+"</th>" +
                "<th>"+nome+"</th>" +
                "<th>"+email+"</th>" +
                "<th>"+nivel+"</th>" +
                "<th><button class='btn btn-label-icon btn-outline-danger' id='"+id+"'><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash-fill\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z\"/>\n" +
                "</svg></button></th>" +
                "</tr>"
        }
    })

    let button = document.getElementsByClassName("btn-label-icon")

    for(let i = 0; i < button.length; i++){
        button[i].addEventListener("click", (e) => {
            const URL_TO_FETCH = '/apis/deleta-user'

            let data = {
                id: '',
                nome: '',
                email: '',
                senha: '',
                nivel: ''
            }

            aux.map(({id, nome, email, senha, nivel}) => {
                if(id === parseInt(button[i].id)){
                    data.id = id
                    data.nome = nome
                    data.email = email
                    data.senha = senha
                    data.nivel = nivel
                }
            })

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
        })

    }
}).catch((error) => {
    console.log(error)
})

let formulario = document.getElementById("formulario")

formulario.addEventListener("submit", (e) => {
    const URL_TO_FETCH = '/apis/cadastrar'
    e.preventDefault()

    let data = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        nivel: document.getElementById("nivel").value
    }

    fetch(URL_TO_FETCH, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json;charset=UTF-8"}
    }).then((response) => {
        return response.text()
    }).then((text) => {
        window.location.reload()
    }).catch((error) => {
        alert(error)
    })
})