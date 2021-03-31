const mongoose = require ("mongoose");
const { stringify } = require("qs");
const Schema= mongoose.Schema;


const Categoria = new Schema({
    nome:{
        type: String,
        require: true
    },
    slug:{
        type:String.apply,
        require:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
mongoose.model("categorias",Categoria)