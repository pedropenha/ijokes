let formLogin = document.getElementById("formulario")

formLogin.addEventListener("submit", (e) => {
    const URL_TO_FETCH = '/apis/login'
    e.preventDefault()

    let data = {
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
    }

    fetch(URL_TO_FETCH, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json;charset=UTF-8"}
    }).then((response) => {
        return response.text()
    }).then((text) => {
        localStorage.setItem('user', text)
        setInterval(() => {
            window.location.href="../../index.html"
        }, 5000)
        document.getElementById("alert").classList.remove("d-none")
        document.getElementById("alert").style.display = "block"
        document.getElementById("alert").classList.add("alert","alert-success")
        document.getElementById("alert").innerHTML = 'Login realizado com sucesso, você será redirecionado a página principal automaticamente ou pode clicar no link: <a href="../../index.html">Página principal</a>'
    }).catch((error) => {
        document.getElementById("alert").classList.remove("d-none")
        document.getElementById("alert").style.display = "block"
        document.getElementById("alert").classList.add("alert","alert-danger")
        document.getElementById("alert").innerHTML = 'Usuario ou senha incorretos, usuario não encontrado!'
    })
})