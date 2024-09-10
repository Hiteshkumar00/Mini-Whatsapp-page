const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");

const methodOverride = require('method-override')

const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

main().then((res) => {
  console.log("connection successful");
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

app.get("/", (req, res) => {
  res.send("root is working...");
});

//Index route

app.get("/chat", async (req, res)=>{
  let chats = await Chat.find({});
  chats.reverse();
  res.render("index.ejs", {chats});
});

//Create new chat form

app.get("/chat/new", (req, res) => {
  res.render("new.ejs");
});

//crated chat save to db

app.post("/chat",(req, res)=>{
  let {from, msg, to} = req.body;

  let chat = new Chat({
    from,
    msg,
    to,
    created_at: new Date()
  });

  chat.save().then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  });

  res.redirect("/chat");
});

//edit chat form 
app.get("/chat/:id/edit",async (req, res)=>{
  let {id} = req.params;
  let chat = await Chat.findById(id);
  console.log(chat);
  res.render("edit.ejs", {chat});
});

//update chat

app.patch("/chat/:id",async (req, res)=>{
  let {id} = req.params;
  let {msg} = req.body;

  await Chat.findByIdAndUpdate(id, {msg});

  res.redirect("/chat");
});

//delete chat

app.delete("/chat/:id/delete",async (req, res) =>{
  let {id} = req.params;
  let delChat = await Chat.findByIdAndDelete(id);
  console.log(delChat);
  res.redirect("/chat");
});

app.listen(port, ()=>{
  console.log(`server is listining on port ${port}.`);
});