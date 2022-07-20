const request = require('request')
const path=require('path')
const hbs =require('hbs')
const express = require('express')
const app = express()
const public = path.join(__dirname,'./public')
const viewsPath = path.join(__dirname,'./views')
const partials = path.join(__dirname,'./partials')



const port = process.env.PORT || 3000
app.use(express.static(public))
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partials)

const URL="https://newsapi.org/v2/top-headlines?country=eg&apiKey=4ee66f9280804f57919c881d6db7e0e3"
 app.get('/news',(req,res)=>{
    request(
        {
          url: URL,
          json: true,
          headers: {
            "User-Agent": "frist app",
          },
          
        },
        (error, response) => {
          if (error) {
            console.log("Error")
          } 
          else if (response.body.message) {
            console.log(response.body.message)
          } 
          else if (response.body.totalResults == 0) {
            console.log("No Data found")
          } 
          else {
            res.render("index", {
              data: response.body.articles
            
            })
          }
        }
      );

 })
 app.listen(port, () => {
    console.log(`the news app on port ${port}`)
  })
    