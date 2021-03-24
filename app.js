
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
//outros
const PORT= 8081
app.listen(PORT,()=>{
    console.log("servidor rodando na porta:"+PORT)
})

const mongoose = require("mongoose")
mongoose.Promise= global.Promise

mongoose.connect('mongodb://localhost:27017/teste', {useNewUrlParser: true}).then(()=>{
console.log("conectado com Sucesso ")
}).catch((error)=>{
console.log("deu erro ")
})

//model 

//definindo o model

const usuarioSchema = mongoose.Schema({
    nome:{
        type: String,
        require:true
    },
    sobrenome:{
        type: String,
        require:true
        
    },
    email:{
        type:String,
        require:true
    },
    idade:{
        type :Number,
        require:true
    }
    
})
//collection

mongoose.model('usuarios', usuarioSchema)

const zenilton = mongoose.model('usuarios')

new zenilton({
    nome: "zenilton",
    sobrenome:"sousa",
    email:"ze18.fv@gmail.com",
    idade:23
}).save().then(()=>{
    console.log("cadastrado com sucesso ")
}).catch(()=>{
    console.log("ero ao cadastrar")
})

    mongoose.model('usuarios', usuarioSchema)

    const zenilton = mongoose.model('usuarios')

    new zenilton({
        nome: "zenilton",
        sobrenome:"sousa",
        email:"ze18.fv@gmail.com",
        idade:23
    }).save().then(()=>{
        console.log("cadastrado com sucesso ")
    }).catch(()=>{
        console.log("ero ao cadastrar")
    })
