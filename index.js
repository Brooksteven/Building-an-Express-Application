const express = require('express');
const app = express();
const port = 3000;
const path = require('path')

//ejs view engine
app.set('views',path.join(_direname,'./views'))
app.set('view engine','ejs')

app.use(express.static('./styles'))

const fs = require('fs');

app.engine("perscholas", (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err);

        const rendered = content
        .toString()
        .replaceAll('#title#', `${options.title}`)
        .replace('#content#', `${options.content}`)
      return callback(null, rendered)
    })
})

//route for home page
app.get('/',(req,res) => {
    res.render("index", {port})
})
