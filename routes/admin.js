
   
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
            req.flash("error_msg","essa categoria nao existe!")

            res.redirect("/admin/categorias")
        })  
        
    })
      

    router.post("/categorias/edit",(req,res)=>{
        Categoria.findOne({_id: req.body.id}).then((categoria)=>{
            categoria.nome= req.body.nome
            categoria.slug= req.body.slug
        categoria.save().then(()=>{
            req.flash("success_msg", "msg editada  com sucesso")
            res.redirect("/admin/categorias")
        }).catch((erro)=>{
            req.flash("error_msg","erro interno ao editar ")
            res.redirect("/admin/categorias")
        })

        }).catch((erro)=>{
            req.flash("error_msg","erro ao editar ")
            res.redirect("/admin/categorias")
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
        res.render("admin/postagens")
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

        const novapostagem={
            titulo : req.body.titulo,
            slug : req.body.slug

        }

        new Postagem(novapostagem).save()

    })



module.exports = router 