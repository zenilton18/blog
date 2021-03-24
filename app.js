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