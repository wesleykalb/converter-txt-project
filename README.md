# Projeto Fullstack

### Conversor TXT para Maiúsculas

Um projeto simples para converter arquivos .txt para letras maiúsculas, composto por:

Backend: API em C# (.NET 8)

Frontend: Interface web em React

Docker: Containers para fácil execução

### Como Executar

## Clone o projeto:
git clone https://github.com/seu-usuario/txt-converter.git
cd txt-converter

## Inicie os containers:
docker-compose up --build

Acesse no navegador:

Frontend: http://localhost:80

API: http://localhost:8080

### Comandos Úteis
## Comando	                Descrição
docker-compose up -d	Inicia em segundo plano
docker-compose down	    Para e remove os containers
docker-compose logs	    Mostra os logs

### ESTRUTURA DO PROJETO
txt-converter/
├── backend/          # Código da API C#
│   ├── Dockerfile
│   └── ...
├── frontend/         # Aplicação React
│   ├── Dockerfile
│   └── ...
└── docker-compose.yml # Configuração Docker

### Dica: Para desenvolvimento, edite os arquivos na pasta frontend/src e backend/ - o Docker recarregará automaticamente as mudanças.

## 📄 Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.