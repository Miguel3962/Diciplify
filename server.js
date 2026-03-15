const express = require("express")
const fs = require("fs")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const FILE = "users.json"

function readUsers(){
if(!fs.existsSync(FILE)){
fs.writeFileSync(FILE, JSON.stringify({}))
}
return JSON.parse(fs.readFileSync(FILE))
}

function saveUsers(users){
fs.writeFileSync(FILE, JSON.stringify(users,null,2))
}

app.post("/register",(req,res)=>{

const {name,email,password} = req.body

let users = readUsers()

if(users[email]){
return res.json({error:"Usuário já existe"})
}

users[email] = {name,password}

saveUsers(users)

res.json({success:true})

})

app.post("/login",(req,res)=>{

const {email,password} = req.body

let users = readUsers()

if(!users[email]){
return res.json({error:"Usuário não existe"})
}

if(users[email].password !== password){
return res.json({error:"Senha incorreta"})
}

res.json({
success:true,
name:users[email].name
})

})

app.listen(3000,()=>{
console.log("Servidor rodando em http://localhost:3000")
})