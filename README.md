# Projeto-SENAI

# Projeto Steam Achievements API

Este projeto é uma aplicação Node.js que fornece informações sobre conquistas (achievements) do Steam para um jogo específico. Ele utiliza a Steam Web API para recuperar dados sobre jogos, suas conquistas e suas informações associadas.

## Começando

Para rodar este projeto localmente, siga estas etapas:

1. Clone o repositório para a sua máquina local:

   ```bash
   git clone https://github.com/QueijoQualho/Projeto-SENAI.git
   ```

2. Instale as dependências necessárias executando:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e adicione seu token da API da Steam como `STEAMTOKEN`. Você pode obter um token da API da Steam registrando sua aplicação no site de desenvolvedores da Steam.

   ```
   STEAMTOKEN=seu-token-da-api-da-steam
   PORT=3000 # Porta em que o servidor irá ouvir
   ```

4. Inicie o servidor:

   ```bash
   npm start
   ```

   O servidor deve estar agora em execução na porta especificada (padrão é 3000).

## Pontos de Extensão

### Obter Conquistas de Jogos

- **Endpoint**: `/api/:index`
- **Método**: GET
- **Descrição**: Recupera as conquistas de um jogo com o nome fornecido.
- **Parâmetros**:
  - `index` (string): O nome do jogo para o qual deseja recuperar as conquistas.
- **Resposta**:
  - Se o jogo for encontrado, a resposta conterá uma matriz de conquistas com informações adicionais, incluindo seus nomes, descrições, ícones e percentagens de conclusão.
  - Se o jogo não for encontrado, será retornada uma resposta 404.

### Dependências

- Express.js: Um framework de aplicação web Node.js mínimo e flexível.
- Axios: Um cliente HTTP baseado em promessas para fazer requisições a APIs externas.
- body-parser: Middleware para analisar corpos de requisição recebidos.

## Uso

Você pode utilizar este projeto para obter conquistas do Steam para vários jogos, fazendo requisições GET ao endpoint apropriado. As conquistas incluirão seus nomes, descrições, ícones e percentagens de conclusão.
