function ver_piada()
{
    // usar a fetch API para recuperar uma piada aleatória do banco
    // para isso termos que executar o serviço/rota a ser
    // definida no backend

    document.getElementById("verPiada").addEventListener((e) => {
        let tag = document.getElementById("verPiada")
        const URL_TO_FETCH = '/listar-todas-piadas';
        e.preventDefault(); // evita refresh da tela

        fetch(URL_TO_FETCH, {
            method: 'POST', headers:{'Authorization':`${localStorage.getItem("token")}`}
        }).then(function (response) {
            return response.text();
        }).then(function (text) {
            // result recebe a resposta do módulo dinâmico
            tag.innerHTML = text;
        }).catch(function (error) {
            console.error(error);
        });
    })
    document.getElementById("verPiada").addEventListener((e) => {
        let tag = document.getElementById("verPiada")
        const URL_TO_FETCH = '/listar-todas-piadas';
        e.preventDefault(); // evita refresh da tela

        const data = new URLSearchParams();
        for (const pair of new FormData(document.getElementById('fdados'))) {
            data.append(pair[0], pair[1]);
        }

        fetch(URL_TO_FETCH, {
            method: 'post',
            body: data
        }).then(function (response) {
            return response.text();
        }).then(function (text) {
            // result recebe a resposta do módulo dinâmico
            tag.innerHTML = text;
        }).catch(function (error) {
            console.error(error);
        });
    })

    alert("Sua Piada solicitada!");

    // fazer o eventlistener posteriormente

    function logar() {
        const URL_TO_FETCH = '/security/autenticar';
        const data = new URLSearchParams();
        for (const pair of new FormData(document.getElementById('formulario'))) {
            data.append(pair[0], pair[1]);
        }

        fetch(URL_TO_FETCH, {method: 'post', body: data })
        .then(response=>{ if(response.ok) response.text(); else throw Error("erro") })
        .then(texto => localStorage.setItem("token", texto))
        .catch(err => alert(err.message)) // redirecione para login
    }

    function acesso_com_token()
    {
        const URL_TO_FETCH = '/apis/testar-acesso';
        fetch(URL_TO_FETCH, {method: 'POST',
        headers:{'Authorization':`${localStorage.getItem("token")}`,}})
        .then(response=> response.text())
        .then(result=>{ alert(result); })
        .catch(err=> console.error(err));
    }


}