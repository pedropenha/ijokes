let formulario = document.getElementById("formulario")

formulario.addEventListener("submit", (e) => {
    const URL_TO_FETCH = '/apis/cadastrar'
    e.preventDefault()

    let data = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        nivel: "USER"
    }

    fetch(URL_TO_FETCH, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json;charset=UTF-8"}
    }).then((response) => {
        return response.text()
    }).then((text) => {
        setInterval(() => {
            window.location.href="login.html"
        }, 5000)
        document.getElementById("alert").classList.remove("d-none")
        document.getElementById("alert").style.display = "block"
        document.getElementById("alert").classList.add("alert","alert-success")
        document.getElementById("alert").innerHTML = 'Usuário cadastrado com sucesso, você será redirecionado em 5 segundos para a página de login ou pode clicar no link para: <a href="../../pages/login.html">Logar-se</a>'
    }).catch((error) => {
        document.getElementById("alert").classList.remove("d-none")
        document.getElementById("alert").style.display = "block"
        document.getElementById("alert").classList.add("alert","alert-danger")
        document.getElementById("alert").innerHTML = 'Não foi possível cadastrar o usuario, contate o administrador do sistema!'
    })
})