# 📰 Portal de Notícias - Node.js + Express + MongoDB

Este é um projeto de um **Portal de Notícias** dinâmico, desenvolvido com **Node.js**, **Express**, **MongoDB** e **EJS**, com foco em exibir notícias de programação, tecnologia e educação de forma moderna e responsiva.

---

## 🚀 Funcionalidades

- ✅ Sistema de cadastro e exibição de notícias (CRUD no banco MongoDB)
- ✅ Visualização de notícias por categoria
- ✅ Sistema de **contagem de views por notícia**
- ✅ Sistema de busca de notícias via campo de pesquisa
- ✅ Exibição de notícias mais lidas
- ✅ Página 404 customizada com **animação Lottie**
- ✅ Layout limpo, com design responsivo
- ✅ Cores dinâmicas por categoria com sistema de cor automática
- ✅ Separação de views com **EJS (Embedded JavaScript templates)**

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **MongoDB (Atlas)**
- **Mongoose**
- **EJS (Template Engine)**
- **Body-parser**
- **CSS3**
- **LottieFiles (para animação do 404)**


---

## 💾 Como Rodar Localmente

### Pré-requisitos:

- Node.js instalado
- MongoDB Atlas (ou local) configurado

### Instalação:

```bash
git clone https://github.com/GuilhermeSouza-he-his/News-programation.git
cd NewsWebsite
npm install
node server.js ou nodemon server.js
http://localhost:3000

---

🌐 Configuração do Banco de Dados

No arquivo server.js, atualize a conexão com seu MongoDB Atlas:

mongoose.connect('mongodb+srv://SEU_USER:SUA_SENHA@cluster.mongodb.net/NOME_DO_BANCO', {...})

🧑‍💻 Autor

| :------------------------------------------------------------------: |
|                         **Guilherme Pacheco**                        |
|         Desenvolvedor Full Stack e apaixonado por tecnologia         |

---

📃 Licença

Projeto com fins educativos. Sinta-se livre para modificar e evoluir!