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
 router.post("/categorias/nova", (req,res)=>{

    var erros=[]

    if(!req.body.nome ||typeof req.body.nome == undefined || req.body.slug==null){

        erros.push({texto:"nome invalido "})
    }

    if(!req.body.slug ||typeof req.body.slug == undefined || req.body.slug==null){

        erros.push({texto:"slug invalido "})
    }
    if(req.body.nome.length <2){
        erros.push({texto:"nome pequeno "})
    }
     if (erros.length >0){
         res.render("admin/addcategoria",{erros: erros })
     }
     else{
        const novaCategoria={
            nome: req.body.nome,
            slug: req.body.slug
    
        }
        new Categoria(novaCategoria).save().then(()=>{
            req.flash("success_msg","Mensagem salva com Sucesso ")
          res.redirect("/admin/categorias")
        }).catch((erro)=>{
            req.flash("error_msg","Erro ao Salvar,Tente novamente mais tarde !")

            res.redirect("/admin")
        })

     }
  

  })

  router.get("/categorias/edit/:id",(req,res)=>{
      res.send("estou aki kkkkkkk ")

  })
module.exports = router 