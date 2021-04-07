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
    Categoria.find().lean().sort({date:'desc'}).then((categorias)=>{
        res.render("admin/categorias" , {categorias: categorias}).catch((err)=>{
            req.flash("error_msg" , "erro ao listar categorias ")

            res.redirect("/admin")
            
        })  
    })
   
})
 router.get("/categoria/add",(req,res)=>{
     res.render("admin/addcategoria")

 })
 
  

  })

  router.get("/categorias/edit/:id",(req,res)=>{
      res.send("estou aki  ")

  })
module.exports = router 