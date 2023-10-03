const botao = document.getElementById("enviar")


botao.addEventListener('click', () => {
    const nomeJogo = document.getElementById("nomeJogo").value;
    fetch(`\\api\\${nomeJogo}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch()
})