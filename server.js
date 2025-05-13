const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// Destino dos arquivos, servidor local (notebook)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "D:/uplouds/");
  },
  filename: (req, file, cb) => {
    const nomeUnico = Date.now() + "-" + file.originalname;
    cb(null, nomeUnico);
  },
});

const upload = multer({ storage });

// Rota
app.post("/upload", upload.single("arquivo"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Nenhum arquivo enviado.");
  }
  res.send({ mensagem: "Arquivo salvo com sucesso!", nome: req.file.filename });
});

app.listen(3000, () => {
  console.log("servidor rodando na porta 3000");
});
