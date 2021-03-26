const express = require("express")
const router = express.Router()

router.get('/',(req, res)=>{
    res.render('admin/index')
})

  router.get('/post', (req,res)=>{
      res.render("admin/index")
  })

  router.get('/categoria', (req,res)=>{
    res.send("categorias")
})
module.exports = router