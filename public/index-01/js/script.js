const btn = document.getElementById("enviar")
const input = document.getElementById("nomeJogo")
const ord = document.getElementById("sort-select")

/* btn.addEventListener('click', async (e) => {
    try {
        
    } catch (error) {
        
    }
})
 */
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

        const url = `/api/test/${value}`
        const response = await fetch(url)
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Ocorreu um erro:", error);
    }
})


getactiviment('input', async)
