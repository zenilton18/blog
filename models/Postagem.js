
const { Mongoose } = require("mongoose");
const mongose = require ("mongose") 
const Schema = mongose.Shema;

const Postagem = new Schema ({

    titulo:{
        type: String,
        required:true
    },
    slug:{
        type:String,
        required: true
    },
    descricao:{
        type:String,
        required:true
    
    },
    conteudo:{
        type:String,
        required:true
    },
    categoria:{
        type: Schema.Types.objectId,
        ref:"categorias",
        required:true
    },
     data:{
         type:Date,
         default: Date.now()
     }

    
})
Mongoose.model("postagens", Postagem)