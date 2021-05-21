
//carregando modulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require("body-parser")
    const admin = require("./routes/admin")
    const path= require ("path")
    const app = express()
    const mongoose = require ('mongoose')
    const session = require ("express-session")
    const flash = require ("connect-flash")
//config  
    //body-parser
    //sessão
    app.use(session({
        secret:"cursonode",
        resave:true,
        saveUninitialized:true
    }))
    app.use(flash())
    //middleware
    app.use((req,res,next)=>{
        res.locals.success_msg =req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })
//outros
const PORT= 8081
app.listen(PORT,()=>{
    console.log("servidor rodando na porta:"+ PORT)
})

