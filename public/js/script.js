const botao = document.getElementById("enviar")

botao.addEventListener('click', async () => {
    try {
        const nomeJogo = document.getElementById("nomeJogo").value;
        const response = await fetch(`/api/${nomeJogo}`);

        if (!response.ok) {
            console.log("Jogo não encontrado");
            return;
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Ocorreu um erro:", error);
    }
});

/* document.addEventListener('DOMContentLoaded', function () {
    const sortSelect = document.getElementById('sort-select');
    const productList = document.getElementById('product-list');

    // Dados de exemplo (substitua por seus próprios dados)
    const products = [
        { nome: 'Produto A', preco: 10.99, categoria: 'Eletrônicos' },
        { nome: 'Produto B', preco: 5.99, categoria: 'Roupas' },
        { nome: 'Produto C', preco: 25.99, categoria: 'Eletrônicos' },
        // Adicione mais produtos aqui
    ];

    // FuAddnção para renderizar a lista de produtos
    function renderProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.nome} - Preço: R$${product.preco} - Categoria: ${product.categoria}`;
            productList.appendChild(li);
        });
    }

    // Evento de mudança de seleção
    sortSelect.addEventListener('change', function () {
        const sortBy = sortSelect.value;

        // Classificar os produtos com base na opção selecionada
        if (sortBy === 'nome') {
            products.sort((a, b) => a.nome.localeCompare(b.nome));
        } else if (sortBy === 'preco') {
            products.sort((a, b) => a.preco - b.preco);
        } else if (sortBy === 'categoria') {
            products.sort((a, b) => a.categoria.localeCompare(b.categoria));
        }

        // Renderizar a lista de produtos classificados
        renderProducts(products);
    });

    // Inicialmente, renderize a lista de produtos com base na opção padrão
    renderProducts(products);
});
 */