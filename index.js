const express = require("express");

const app = express();
const port = 3000; 
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let message = "";

const pokedex = [];

app.get("/", (req, res) => {
  setTimeout(() => {
    message = ""; }, 1000);
    
    res.render("index", {pokedex:pokedex, message});
    
  });

app.get("/cadastro", (req, res) => {

    res.render("cadastro"); 

  });

app.get("/detalhes", (req, res) => {

    res.render("detalhes", {pokedex:pokedex}); 

  });

app.post("/subscription", (req, res) => {

    const { nome, numero, tipo, imagem, descricao, altura, peso, categoria, habilidade  } = req.body;
    pokedex.push({numero:numero, nome:nome, tipo:tipo, imagem:imagem, descricao:descricao, altura:altura, peso:peso, categoria:categoria, habilidade:habilidade})
    message = `Parabéns! O pokemon: ${nome} foi cadastrado com sucesso!`;

    res.redirect("/");

  });

app.get("/detalhes/:id", function (req, res) {
    const id = req.params.id;
    const poked = pokedex[id];

    res.render("detalhes", { poked, pokedex:pokedex });

  });

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));