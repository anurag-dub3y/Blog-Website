const express = require('express');
const ejs = require("ejs");
const bodyParser = require('body-parser');
const app = express();
const lodash = require('lodash');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

let posts = [];

app.get('/',function(req,res){
    res.render("home",{content:homeStartingContent,data:posts});
});

app.get('/home',function(req,res){
    res.render("home",{content:homeStartingContent,data:posts});
    // res.render("home",{content:homeStartingContent}); 
});

app.get('/about',function(req,res){
    res.render("about",{content:aboutContent}); 
});
app.get('/contact',function(req,res){
    res.render("contact",{content:contactContent}); 
});

app.get('/compose',function(req,res){
    res.render("compose"); 
});

app.post("/compose",function(req,res){
    console.log(req.body.input);
    console.log(req.body.theContent);

    const values = {
        title:req.body.input,
        material:req.body.theContent
    };
    posts.push(values);
    console.log(posts);
    res.render("home",{content:homeStartingContent,data:posts});
});

app.get("/post/:topic",function(req,res){
    console.log(req.params.topic);
    var num=0;
    const requestedPost = lodash.lowerCase(req.params.topic);
    console.log(requestedPost);
    let err = {
        title:"Uh oh!",
        material:"No post has this title"
    };
    posts.forEach(function(post){
        if(lodash.lowerCase(post.title)===requestedPost){ 
            err.title = post.title;
            err.material = post.material;
        }
    });
    res.render("post",{content:err});
});

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed feugiat orci. Nam mi massa, eleifend malesuada orci at, rhoncus ullamcorper augue. Mauris faucibus nibh quis venenatis lobortis. Morbi nec nulla sed lacus interdum condimentum ut a nibh. Aliquam ullamcorper consequat dapibus. Nam ut hendrerit urna, eu placerat risus. Sed sollicitudin cursus feugiat. Etiam tempus nisi vel dui rutrum, vitae vulputate sem aliquet."

const aboutContent = "Proin hendrerit interdum erat, ac euismod lorem placerat eget. Etiam facilisis sit amet magna ullamcorper tristique. Aenean tempus vestibulum enim, ac ultrices metus vestibulum vel. Sed vitae sem nisi. Morbi ullamcorper magna nec enim cursus blandit eu in nulla. Fusce eget nisi ullamcorper, lobortis nunc eu, sagittis est. Fusce ex massa, hendrerit facilisis posuere vel, semper et libero."

const contactContent = "Vivamus porta molestie mi a suscipit. Proin tincidunt dignissim orci nec venenatis. Nullam eleifend commodo mauris at cursus. Donec facilisis lacus ut mauris venenatis euismod maximus eget tellus. Curabitur mollis lacus vel enim placerat viverra. Curabitur eu tellus in massa efficitur vestibulum."


app.set('view engine','ejs');



app.listen(3000,function(){
    console.log("We're up now!");
});


// npm init->npm i express body-parser->nodemon app.js
