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
    try {
        const nomeJogo = input.value;
        const url = `/api/${nomeJogo}`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();

            if (data && data.achievements) {
                banner.textContent = "";
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
                    `;

                    banner.appendChild(zarabatana);
                });
                input.classList.remove("campo-vazio")
                banner.style.display = "block";
                banner.style.paddingBottom = "10px"
            } else {
                console.log('Nenhum dado de conquistas disponível.');
            }
        } else if (response.status === 400) {
            throw new HTTPError(400, "Solicitação inválida")
        } else if (response.status === 404) {
            throw new HTTPError(404, "Conteúdo não encontrado");
        } else {
            throw new Error(`Ocorreu um erro com o status ${response.status}`)
        }


    } catch (error) {
        console.error('An error occurred:', error);
        if (error instanceof TypeError) {
            console.error('Erro de tipo. Pode ser um erro de rede ou CORS.');
        } else if (error instanceof SyntaxError) {
            console.error('Erro de sintaxe no código.');;
        } else if (error instanceof HTTPError) {
            console.error('Erro de status HTTP:', error.status);
            casoErro(error.message)
        } else {
            console.error('Erro genérico');
        }
    }
});

function casoErro(frase) {
    banner.textContent = ''
    banner.innerHTML = `
    <div class="erro">
        <h3>${frase}</h3>
    </div>
`
    banner.style.paddingBottom = "0px";

    banner.style.display = "block"
}

class HTTPError extends Error {
    constructor(status, message) {
        super(message);
        this.name = 'HTTPError';
        this.status = status;
    }
}

