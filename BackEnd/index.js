const express = require('express');
const req = require('fs');
const app = express();

const data = require('./data.json');

app.get('/news',(req, res)=>{
    res.send(data);
})


app.get('/news/search/:keyword', (req, res)=>{
    const searchResults = data.filter((item)=> item.content.includes(req.params.keyword));
    res.send(searchResults);
})

app.get('/news/single/:id', (req, res)=>{
    const News = data.filter((item)=>item.id==req.params.id);
    if(News.length>0){
        return res.send(News);
    }
    else{
        return res.send("No news with such Id");
    }
})

app.get('/news/:category', (req, res)=>{
    const categoryNews = data.filter((item)=>item.category==req.params.category);
    if(categoryNews.length>0){
        return res.send(categoryNews);
    }
    else{
        return res.send("No such category... Kindly choose among 'political', 'entertainment', 'tech', 'breaking-news'")
    }
})

app.get('/news/:category/:qty', (req, res)=>{
    const categoryNews = data.filter((item)=>item.category==req.params.category);
    if(categoryNews.length>0){
        return res.send(categoryNews.slice(0, req.params.qty));
    }
    else{
        return res.send("No such category... Kindly choose among 'political', 'entertainment', 'tech', 'breaking-news'")
    }
})



app.listen(3000, ()=>{
    console.log("Server Started On Port 3000\n");
})