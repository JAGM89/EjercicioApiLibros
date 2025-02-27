const express = require('express');
const fs = require('fs');
const { parse } = require('path');
const app = express();
const PORT=3000;

//const FILE_PATH = 'libros.json';

function reedBook(){
    const data = fs.readFileSync('libros.json','utf-8');
    return JSON.parse(data);
}

function saveBook(cbooks){
    fs.writeFileSync('libros.json',JSON.stringify(cbooks,null,2));
}

app.use(express.json());



app.get('/libros',(req, res)=>{
    const books = reedBook();
    res.json({status:200,message:'Success',books});
});

app.post('/libros',(req, res)=>{
    let libro = req.body;
    const books = reedBook();
    let findBook = books.find(book => book.id === libro.id);
    if(findBook){
        res.status(403).json({status:403,message:'Error, El libro ya existe',libro});
    }else{
        books.push(libro);
        saveBook(books);
        res.json({status:200,message:'Success',libro});
    }
});




app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});