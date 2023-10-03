const botao = document.getElementById("enviar")
botao.addEventListener('click', () => {
    const nomeJogo = document.getElementById("nomeJogo").value;
    fetch(`/api/${nomeJogo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            /* Vai ter que fazer o card aqui */
            console.log(data);
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
})
