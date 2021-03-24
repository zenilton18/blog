//carregando modulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require("body-parser")
const { getPriority } = require('node:os')
    const app = express()
    //const mongoose = require ('mongoose')
//config

//rotas
//

var= getPriority;
//outros
const PORT= 8081
app.listen(PORT,()=>{
    console.log("servidor rodando na porta:"+PORT)
})