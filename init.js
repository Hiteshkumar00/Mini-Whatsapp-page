const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then((res) => {
  console.log("connection successful");
}).catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chat1 = new Chat({
  from: "hiteskumar",
  to: "arjun chaudhary",
  msg: "Hello, How are you?",
  created_at: new Date()
});

Chat.insertMany([
  {
    from: "lilyna",
    to: "muskan",
    msg: "are you come to college?",
    created_at: new Date()
  },
  {
    from: "ratnesh",
    to: "amarjeet",
    msg: "come fast for lunch.",
    created_at: new Date()
  },
  {
    from: "niharika",
    to: "komal",
    msg: "come in to my classroom.",
    created_at: new Date()
  },
  {
    from: "mansi",
    to: "dampty",
    msg: "i am teaching to students.",
    created_at: new Date()
  },
  {
    from: "nirmit",
    to: "ghansyam",
    msg: "you are good teacher in our department",
    created_at: new Date()
  },
  {
    from: "arjun",
    to: "hitesh",
    msg: "I will come tomorrow.",
    created_at: new Date()
  }
]);