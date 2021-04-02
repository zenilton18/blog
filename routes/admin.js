const express = require("express")
const router = express.Router()
const mongoose= require("mongoose")
require("../models/Categoria")
const Categoria= mongoose.model("categorias")

router.get('/',(req, res)=>{
    res.render('admin/index')
})

  router.get('/post', (req,res)=>{
      res.render("admin/index")
  })

  router.get('/categorias', (req,res)=>{
    res.render("admin/categorias")
})
 router.get("/categoria/add",(req,res)=>{
     res.render("admin/addcategoria")

 })
 router.post("/categorias/nova", (req,res)=>{
  
     const novaCategoria={
        nome: req.body.nome,
        slug: req.body.slug

    }
    new Categoria(novaCategoria).save().then(()=>{
      console.log("salvo ")
    }).catch((erro)=>{
        console.log("erro"+erro)
    })
 

  })
module.exports = router 