const input = document.getElementById("caixaPesquisa")
const btn = document.getElementById("icone-lupa")
const datalist = document.getElementById('options');
const banner = document.getElementById("fazoL");


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
    const url = `/api/${nomeJogo}`;
    const response = await fetch(url);

    if (!response.ok) {
        console.log("Jogo não encontrado");
        return;
    }

    const data = await response.json();

    if (data && data.achievements) {
        banner.textContent = ""
        let a = document.createElement('div');

        a.className = 'nome-game';
        a.style.backgroundImage = `url(${data.image})`;


        banner.appendChild(a);

        data.achievements.forEach(element => {

            let zarabatana = document.createElement('div');
            zarabatana.className = 'result';

            zarabatana.innerHTML = `
            <div class="foto-conquista">
                <img src="${element.image}" alt="">
            </div>
            <div class="text">
                <div class="achieveFill" style="width: ${element.percent.toFixed(0)}%;"></div>
                <div class="nome-conquista">
                    <h1>${element.displayName}</h1>
                </div>
                <div class="porcentagem">
                    <h1>${element.percent.toFixed(2)}%</h1>
                </div>
                <div style="clear: both;"></div>
            </div>
            `;


            banner.appendChild(zarabatana)

        });
        banner.style.display = "block"
    } else {
        console.log('Nenhum dado de conquistas disponível.');
    }

});


