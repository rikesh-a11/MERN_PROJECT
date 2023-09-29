const app = require("express")();
const express = require("express")
const mongoose = require("mongoose");
const { connectDatabase } = require("./database/database");
const Blog = require("./model/blogModel");

//nodeJs lai form bata ako data parser gar vaneko
app.use(express.json());
app.use(express.urlencoded({extended:true}))


//database connection function
connectDatabase()

//GET Api
app.get("/",(req,res)=>{
    res.json({
        status : 200,
        message: "Sucess"
    })
})


//CreateBlog APi
app.post("/createBlog",async(req,res)=>{

    //obj destructuring
    const {title,subTitle,description} = req.body

    // insert to database logic here
    await Blog.create({
        title ,
        subTitle ,
        description 
    })


    res.json({
        status : 201,
        message : "Blog created successfully"
    })
    //Alternative
    // res.status(200).json({
    //     message : "Blog created successfully"
    // })

})




app.listen(2000,()=>{
    console.log("NodeJs has started port at 2000")
})
