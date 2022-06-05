function redirectAddPiada(){
    if(localStorage.getItem("user")!==null){
        if(localStorage.getItem("user").length >0){
            window.location.href = "pages/inserepiada.html"
        }
    }
    window.location.href = "pages/login.html"
}

    