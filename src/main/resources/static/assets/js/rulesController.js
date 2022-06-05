let navBarLogadoUser = "<ul class=\"navbar-nav mr-auto\">" +
    "<li class=\"nav-item active\">" +
    "<a class=\"nav-link\" href=\"../index.html\">Página principal <span class=\"sr-only\">(current)</span></a>" +
    "</li>" +
    "<li class=\"nav-item\">" +
    "<a class=\"nav-link\" href=\"#\">Piadas</a>" +
    "</li>" +
    "</ul>" +
    "<a class=\"btn btn-outline-danger my-2 my-sm-0\" href=\"../pages/sair.html\">Sair</a>";

let navBarLogadoAdmin = "<ul class=\"navbar-nav mr-auto\">" +
    "<li class=\"nav-item active\">" +
    "<a class=\"nav-link\" href=\"../index.html\">Página principal <span class=\"sr-only\">(current)</span></a>" +
    "</li>" +
    "<li class=\"nav-item\">" +
    "<a class=\"nav-link\" href=\"#\">Piadas</a>" +
    "</li>" +
    "<li class=\"nav-item\">" +
    "<a class=\"nav-link\" href=\"/pages/users.html\">Usuarios</a>" +
    "</li>" +
    "</ul>" +
    "<a class=\"btn btn-outline-danger my-2 my-sm-0\" href=\"../pages/sair.html\">Sair</a>";

let navBarNaoLogado = "<ul class=\"navbar-nav mr-auto\">" +
    "<li class=\"nav-item active\">" +
    "<a class=\"nav-link\" href=\"../index.html\">Página principal <span class=\"sr-only\">(current)</span></a>" +
    "</li>" +
    "<li class=\"nav-item\">" +
    "<a class=\"nav-link\" href=\"#\">Piadas</a>" +
    "</li>" +
    "</ul>" +
    "<a class=\"btn btn-outline-primary my-2 my-sm-0\" href=\"../pages/login.html\">Entrar</a>" +
    "<a class=\"btn btn-outline-info my-2 my-sm-0 ml-2\" href=\"../pages/register.html\">Cadastre-se</a>";

let navBar

if(window.location.href.includes("sair.html") && localStorage.getItem("user") !== null){
    localStorage.removeItem("user")
    window.location.href = "../../index.html"
}else{
    navBar = document.querySelector("#navbarSupportedContent")
    if(localStorage.getItem("user") !== null){

        let user = JSON.parse(localStorage.getItem("user"))
        console.log(user.nivel)
        if(user.nivel === "USER"){
            navBar.innerHTML = navBarLogadoUser
        }else{
            navBar.innerHTML = navBarLogadoAdmin
        }

        if(window.location.href.includes("login.html") || window.location.href.includes("register.html")){
            window.location.href = "../../index.html"
        }
    }else{
        navBar.innerHTML = navBarNaoLogado
    }
}