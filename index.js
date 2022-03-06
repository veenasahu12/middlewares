const express = require("express");
const arr = [{
    id:1,
    Bookname:"Games Of Thrones",
},
{
    id:2,
    Bookname:"Harry Potter",
},
{
    id:3,
    Bookname:"Rich Dad Poor Dad",
}]
const app = express();

app.use(logger);

app.get("/books", logger, (req, res) => {
    console.log(arr);
  return res.send({ route: "/books", role: req.role,data:arr });
});

app.get("/admin", (req, res) => {
  return res.send({ route: "/admin", role: req.role,data:arr });
});

app.get("/products", loggedIn("seller"), (req, res) => {
  return res.send("Yes you can get the product");
});

function loggedIn(role) {
  return function logger(req, res, next) {
    if (role === "seller") {
      return next();
    }
    return res.send("Not allowed");
  };
}

function logger(req, res, next) {
  if (req.path === "/books") {
    req.role = "books";
  } else if (req.path === "/admin") {
    req.role = "admin";
  } else {
    req.role = "somebody";
  }
  console.log("called");
  next();
}

app.listen(4000, () => {
  console.log("listening on port 4000");
});

