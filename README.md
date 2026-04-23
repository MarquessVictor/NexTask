# ✺ Nextask — Sua agenda pessoal

> Aplicação React para **gerenciamento de agenda pessoal**, com login via Google,
> tarefas categorizadas por prioridade e persistência por usuário.
> Desenvolvida como trabalho da disciplina **Desenvolvimento WEB e Front-end**.

<p>
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white">
  <img alt="Google OAuth" src="https://img.shields.io/badge/Auth-Google_OAuth_2.0-4285F4?logo=google&logoColor=white">
  <img alt="Licença" src="https://img.shields.io/badge/license-MIT-green">
</p>

---

## 🌐 Demo em produção

🔗 **Acesse:** **[authnextask.netlify.app](https://authnextask.netlify.app)**

> O cadastro e as tarefas ficam armazenados localmente no navegador (por conta Google).
> Nenhum dado é enviado para servidores externos — o login Google serve apenas para
> identificar o usuário e pré-preencher o cadastro.

---

## 📖 Sobre o projeto

**Nextask** é um sistema de tarefas pessoais com estilo editorial e foco em simplicidade.
A aplicação possui **quatro telas principais** com navegação funcional:

1. **Home** — ponto de entrada do sistema, com login via Google OAuth.
   Ao autenticar, armazena nome, e-mail e foto do usuário em contexto global
   para uso nas demais telas.
2. **Tarefas** (tela principal pós-login) — dashboard completo com:
   - Estatísticas (pendentes, atrasadas, concluídas, total)
   - **Agenda "Hoje + Próximos 7 dias"** — timeline visual com banner de atrasadas,
     card destacado para hoje e coluna lateral com os próximos dias
   - Criação rápida de tarefas com prioridade (Alta/Média/Baixa),
     categoria (Pessoal, Trabalho, Estudos, Saúde, Finanças, Casa, Outro)
     e data de vencimento
   - Filtros por status e categoria
   - Ordenação inteligente (prioridade → prazo → mais recente)
   - Persistência local por usuário (cada conta Google tem suas próprias tarefas)
3. **Apresentação da Dupla** — exibe os integrantes do projeto com descrição
   e lista de habilidades.
4. **Cadastro de Usuário** — formulário com campos como nome, e-mail, telefone,
   nascimento, cidade, estado, área de interesse e bio. Nome e e-mail vêm
   pré-preenchidos do Google. Ao finalizar, um **JSON estruturado** é gerado
   na tela e no console do navegador para validação.

---

## 🛠️ Tecnologias

- **React 18** — componentes funcionais + hooks
- **Vite 5** — build tool e dev server
- **React Router DOM 6** — navegação entre telas
- **Context API** — estado global (autenticação e tarefas)
- **@react-oauth/google** — integração com Google OAuth 2.0
- **jwt-decode** — decodificação do token JWT retornado pelo Google
- **CSS puro** com variáveis CSS e tipografia personalizada
  (Instrument Serif + Inter + JetBrains Mono)
- **localStorage** — persistência de sessão e tarefas

---

## 👥 Integrantes da dupla

| Nome | Descrição |
|------|-----------|
| **Victor Marques** | Cursando Engenharia de Software. Interesse em desenvolvimento de aplicações e ferramentas. Habilidades: React, Laravel, PHP, Python, SQL e Segurança da Informação. |
| **Gabriel Paiva** | Cursando Engenharia de Software. Interesse em desenvolvimento de jogos digitais e design. Habilidades: Lua, UX Design, React. |

---

## ⚙️ Como rodar localmente

### Pré-requisitos
- **Node.js 18+**
- Um **Google OAuth Client ID** (veja o passo 2)

### 1. Clonar e instalar dependências

```bash
git clone https://github.com/MarquessVictor/NexTask.git
cd NexTask
npm install
```

### 2. Criar um Google OAuth Client ID

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um novo projeto (ou selecione um existente).
3. Vá em **APIs e serviços → Credenciais**.
4. Clique em **Criar credenciais → ID do cliente OAuth**.
5. Tipo de aplicativo: **Aplicativo da Web**.
6. Em **Origens JavaScript autorizadas**, adicione `http://localhost:5173`.
7. Copie o **Client ID** gerado.

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (use o `.env.example` como base):

```env
VITE_GOOGLE_CLIENT_ID=SEU_CLIENT_ID_AQUI.apps.googleusercontent.com
```

> ⚠️ **Nunca** faça commit do arquivo `.env` — ele já está listado no `.gitignore`.

### 4. Rodar em modo de desenvolvimento

```bash
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

### 5. Build de produção

```bash
npm run build
npm run preview
```

---

## 📁 Estrutura de pastas

```text
NexTask/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── RequireAuth.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Tarefas.jsx       ← dashboard + agenda timeline
│   │   ├── Dupla.jsx
│   │   └── Cadastro.jsx
│   ├── services/
│   │   ├── AuthContext.jsx
│   │   └── TasksContext.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── LICENSE
├── README.md
├── index.html
├── package.json
└── vite.config.js
```

---

## ✅ Checklist de requisitos do trabalho

- [x] Tela Home com login Google
- [x] Armazenamento de nome, e-mail e foto do usuário autenticado
- [x] Tela de Apresentação da Dupla
- [x] Tela de Cadastro com formulário (nome, e-mail, telefone, e outros)
- [x] Pré-preenchimento automático via dados do Google
- [x] Geração de JSON ao finalizar o cadastro (tela + console)
- [x] Componentes funcionais e hooks (`useState`, `useEffect`, `useContext`, `useMemo`, `useCallback`)
- [x] Navegação com React Router
- [x] Componentes reutilizáveis
- [x] Boa usabilidade e organização visual
- [x] **Extra:** sistema funcional de gerenciamento de tarefas com persistência por usuário

---

## 💡 Funcionalidades extras

O Nextask vai além do escopo mínimo e entrega:

- **CRUD completo de tarefas** com persistência no `localStorage` por usuário
- **Agenda "Hoje + Próximos 7 dias"** — timeline visual com banner de atrasadas
- **7 categorias** (Pessoal, Trabalho, Estudos, Saúde, Finanças, Casa, Outro)
- **3 níveis de prioridade** (Alta, Média, Baixa) com visual distinto
- **Data de vencimento** com detecção automática de tarefas atrasadas
- **Dashboard com estatísticas** (pendentes, atrasadas, concluídas, total)
- **Ordenação inteligente** por prioridade + prazo
- **Filtros combinados** (status × categoria)
- **Saudação contextual** baseada na hora do dia
- **Design editorial/brutalist-clean** com tipografia serifada e acentos vibrantes

---

## 🔒 Privacidade

- O login Google é usado apenas para identificação e pré-preenchimento do cadastro.
- Os dados (cadastro, tarefas e sessão) são armazenados **exclusivamente no `localStorage`** do navegador do próprio usuário.
- Nenhum dado é enviado para servidores externos — não existe backend nesta aplicação.

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais detalhes.

---

<p align="center">Feito com ✺ por <strong>Victor Marques</strong> & <strong>Gabriel Paiva</strong></p>
