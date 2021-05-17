const express = require("express")
const router = express.Router()
const mongoose= require("mongoose")
require("../models/Categoria")
const Categoria= mongoose.model("categorias")
require("../models/Postagem")
const Postagem =mongoose.model("postagens")





    router.get('/',(req, res)=>{
        res.render('admin/index')
    })

  router.get('/post', (req,res)=>{
      res.render("admin/index")
  })

  router.get('/categorias', (req,res)=>{
    Categoria.find().lean().sort({date:'desc'}).then((categorias)=>{
        res.render("admin/categorias" , {categorias: categorias})

    }).catch((erro)=>{
            req.flash("error_msg" , "erro ao listar categorias ")

            res.redirect("/admin")
            
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
        Categoria.findOne({_id : req.params.id}).lean().then((categoria)=>{
        res.render("admin/editcategorias", {categoria:categoria})  
        }).catch((erro)=>{
            req.flas
        }) 
    })

    router.post("/categorias/deletar",(req,res)=>{

    Categoria.deleteOne({_id: req.body.id}).then(()=>{
        req.flash("success_msg","categoria deletada com sucesso ")
        res.redirect("/admin/categorias")
    }).catch((erro)=>{
        req.flash("error_msg","erro ao deletar ")
        res.redirect("/admin/categorias")

        })
    })
    router.get("/postagens",(req,res)=>{
        Postagem.find().lean().populate("categoria").sort({date:"desc"}).then((postagens)=>{
            res.render("admin/postagens",{postagens:postagens})
        }).catch((erro)=>{
            req.flash("error_msg","erro ao listar postagens")
            res.render("admin/postagens")
        })  
        
    })
    


    router.get("/postagens/add",(req,res)=>{
        Categoria.find().lean().then((categorias)=>{
            res.render("admin/addpostagem",{categorias:categorias})
        }).catch((erro)=>{
            req.flash("error_msg", "erro ao carregar formulario")
            res.redirect("/admin")
            
        })

    })
    router.post("/postagens/nova",(req,res)=>{


       var  erros= []
       if(req.body.categoria== "0"){
           erros.push({texto: "registre 1 categoria"})
       }
       if(erros.length > 0){
           res.render("admin/addpostagem",{erros:erros})

       }else{
            const novaPostagem={ 
            titulo: req.body.titulo,
            descricao:req.body.descricao,
            conteudo :req.body.conteudo,
            categoria:req.body.categorias,
            slug:req.body.slug
        
            }
            new Postagem(novaPostagem).save().then(()=>{
                req.flash("success_msg","Mensagem salva com Sucesso ")
            res.redirect("/admin/postagens")
            }).catch((erro)=>{
                req.flash("error_msg","Erro ao Salvar,Tente novamente mais tarde !")

                res.redirect("/admin/postagens")
            })
            }
    })
    
    router.get("/postagens/edit/:id",(req,res)=>{
        Postagem.findOne({id: req.params.body}).lean().then((postagem)=>{
            Categoria.find().lean().then((categorias)=>{
                res.render("admin/editpostagens", {categorias:categorias, postagem:postagem})

            }).catch((error)=>{
                req.flash("error_msg","erro ao encontar categoria ")
                res.redirect("/admin/postagens")
            })

        }).catch((erro)=>{
            req.flash("error_msg","erro ao carregar formulario de ediçao ")
            res.redirect("/admin/postagens")
        })

        
    })





        

    



module.exports = router 