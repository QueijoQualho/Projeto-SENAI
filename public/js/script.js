const input = document.getElementById("caixaPesquisa")
const btn = document.getElementById("icone-lupa")
const datalist = document.getElementById('options');

const card = document.getElementById("card")
const banner = document.getElementById("fazoL")


/* Tem que fazer o botão pra enviar ou algo parecido */

/* botao.addEventListener('click', async () => {
    try {
        const nomeJogo = document.getElementById("nomeJogo").value;

        const url = `/api/${nomeJogo}`
        const response = await fetch(url);

        if (!response.ok) {
            console.log("Jogo não encontrado");
            return;
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Ocorreu um erro:", error);
    }
}); */

input.addEventListener('input', async (e) => {
    try {
        const value = e.target.value;

        const url = `/api/test/${value}`;
        const response = await fetch(url);
        const data = await response.json();

        datalist.innerHTML = '';

        data.slice(0, 10).forEach((option) => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            datalist.appendChild(optionElement);
        });

    } catch (error) {
        console.error("Ocorreu um erro:", error);
    }
});


btn.addEventListener('click', async () => {

    const nomeJogo = input.value;

    const url = `/api/${nomeJogo}`
    const response = await fetch(url);

    if (!response.ok) {
        console.log("Jogo não encontrado");
        return;
    }

    const data = await response.json();

    data.achievements.forEach(element => {
        let a = document.createElement('div');
        a.className = 'nome-game'
        let zarabatana = document.createElement('div');
        zarabatana.className = 'result'

        a.innerHTML = `
        <div class="foto-jogo">
            <img src="${data.image}" alt="">
        </div>
        <div class="titulo-jogo">
            <h1>${data.name}</h1>
        </div>
        `

        zarabatana.innerHTML = `
            <div class="foto-conquista">
                <img src="${element.image}" alt="">
            </div>
            <div class="nome-conquista">
                <h1>${element.displayName}</h1>
            </div>
            <div class="porcentagem">
                <h1>${element.percent}</h1>
            </div>  
        `;

        banner.appendChild(a);
        card.appendChild(zarabatana);
    })
})

