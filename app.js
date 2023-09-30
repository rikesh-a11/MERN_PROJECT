const app = require("express")();
const express = require("express");
const mongoose = require("mongoose");
const { connectDatabase } = require("./database/database");
const Blog = require("./model/blogModel");

//nodeJs lai form bata ako data parser gar vaneko
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection function
connectDatabase();

//GET Api
app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Sucess",
  });
});

//allblogs
app.get("/blogs", async (req, res) => {
  //fetching/reading all blogs from blog Model
  const blogs = await Blog.find();

  //check if there is data or not
  if (blogs.length == 0) {
    res.status(404).json({
      // status : 404,
      message: "Empty Blogs",
    });
  } else {
    res.status(200).json({
      // status : 200,
      message: "Blog created successfully",
      data: blogs,
    });
  }
});

//Get api -> /blogs/:id  (single blog)
app.get("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  //alternative
  //    const blog = Blog.find({_id : id})

  if (blog){
    res.status(200).json({
        message: "Blog fetched successfully",
        data: blog
    })
  } else {
      res.status(404).json({
        message: "No blogs found with this id"
    })
  }
});

//Create Blog APi
app.post("/createBlog", async (req, res) => {
  //obj destructuring
  const { title, subTitle, description } = req.body;

  // insert to database logic here
  await Blog.create({
    title,
    subTitle,
    description,
  });

  res.json({
    status: 201,
    message: "Blog created successfully",
  });
  //Alternative
  // res.status(200).json({
  //     message : "Blog created successfully"
  // })
});

app.listen(2000, () => {
  console.log("NodeJs has started port at 2000");
});
