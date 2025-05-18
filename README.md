# Biblioteca App

Um aplicativo de gerenciamento de biblioteca construído com Angular e Firebase.

## Configuração do Ambiente

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/biblioteca-app.git
cd biblioteca-app
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
   - Copie o arquivo `.env.example` para `.env`
   ```bash
   cp .env.example .env
   ```
   - Edite o arquivo `.env` e adicione suas credenciais do Firebase

4. Inicie o servidor de desenvolvimento
```bash
ng serve
```

## Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Habilite o Firestore Database
3. Obtenha as credenciais do seu projeto em Project Settings > General
4. Adicione as credenciais ao arquivo `.env`

## Estrutura do Projeto

- `src/app/components/` - Componentes da aplicação
- `src/app/services/` - Serviços e lógica de negócios
- `src/app/models/` - Interfaces e tipos
- `src/app/app.config.ts` - Configuração do Firebase

## Funcionalidades

- Adicionar novos livros
- Editar livros existentes
- Excluir livros
- Visualizar lista de livros
- Gerenciar disponibilidade dos livros

## Tecnologias Utilizadas

- Angular 17
- Firebase/Firestore
- Bootstrap 5
- TypeScript

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
