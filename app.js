const express = require('express')
const app = express()


app.use(express.static(__dirname, { dotfiles: 'allow' } ));

app.use(express.static("./public"))

app.use(express.static("./well-known"))


app.listen(80 , ()=>{

    console.log("server running... 80");
})
app.listen(443 , ()=>{

    console.log("server running... 443");
})