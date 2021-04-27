 const express=require('express')
 const app=express()
 const bodyparser=require('body-parser')
 const MongoClient = require('mongodb').MongoClient;
const { render } = require('ejs');

 var db;
 var s;
 MongoClient.connect('mongodb://localhost:27017/Movie',{ useUnifiedTopology: true },(err,database)=>{
     if (err) return console.log(err)
     db = database.db('Movie')
     app.listen(4000,()=>{
         console.log("Listening at port number 4000");
     })
 })

 
 app.set('view engine', 'ejs');
 app.use(express.static('public'))
 app.use(bodyparser.json())
 app.use(bodyparser.urlencoded({extended: true}))

 app.get('/',(req,res)=>{
    db.collection('Telugu').find().sort({"ID":1}).toArray((err,result)=>{
      if(err) return console.log(err)
      res.render('homepage.ejs',{data:result})
    })
  });

  app.get('/create',(req,res)=>{
    res.render('create.ejs');
  })
  app.get('/update_votes',(req,res)=>{
    res.render('update_votes.ejs');
  })

  app.get('/update_IMDb',(req,res)=>{
    res.render('update_IMDb.ejs');
  })
  app.get('/update_title',(req,res)=>{
    res.render('update_title.ejs');
  })
  app.get('/update_Genres',(req,res)=>{
    res.render('update_Geners.ejs');
  })
  app.get('/update_date',(req,res)=>{
    res.render('update_date.ejs');
  })
  app.get('/update_Runtime',(req,res)=>{
    res.render('update_Runtime.ejs');
  })
  app.get('/update_Director',(req,res)=>{
    res.render('update_Director.ejs');
  })

  app.get('/delete',(req,res)=>{
    res.render('delete.ejs');
  })
 
  app.post('/add',(req,res)=>{
    var id=parseInt(req.body.id);
    var votes=parseInt(req.body.votes);
    var Title=req.body.Title;
    var Runtime=parseInt(req.body.Runtime);
    var IMDb=parseFloat(req.body.IMDb);
    var geners=req.body.geners;
    var date=req.body.date;
    var director=req.body.Director;

    db.collection('Telugu').insert({
      "ID": id,
      "Title":Title,
      "Genres": geners,
      "Release_Date": date,
      "IMDb_Rating": IMDb,
      "Num_Votes": votes,
      "Runtime": Runtime,
      "Directors": director
  },{sort:{ID:-1}},(err,result)=>{
      if (err)
        return console.log(err)
      console.log(result);  
      res.redirect('/')
    })
  })

app.post('/updatevotes', (req,res)=>{
    var id=parseInt(req.body.id);
    var votes=parseInt(req.body.votes);
    db.collection('Telugu').findOneAndUpdate({'ID' : id},{
      $set:{'Num_Votes':votes}},{sort:{ID:-1}},
      (err,result)=>{
        if(err)
          return res.send(err)
        console.log(req.body.id+' got updated')
        res.redirect('/')
    })
  })
  

  app.post('/updatedate', (req,res)=>{
    var id=parseInt(req.body.id);
    var date=req.body.date;
    db.collection('Telugu').findOneAndUpdate({'ID' : id},{
      $set:{'Release_Date':date}},{sort:{ID:-1}},
      (err,result)=>{
        if(err)
          return res.send(err)
        console.log(req.body.id+' got updated')
        res.redirect('/')
    })
  }) 
  
  app.post('/updateDirector', (req,res)=>{
    var id=parseInt(req.body.id);
    var director=req.body.Director;
    db.collection('Telugu').findOneAndUpdate({'ID' : id},{
      $set:{'Directors':director}},{sort:{ID:-1}},
      (err,result)=>{
        if(err)
          return res.send(err)
        console.log(req.body.id+' got updated')
        res.redirect('/')
    })
  }) 

  app.post('/updategeners', (req,res)=>{
    var id=parseInt(req.body.id);
    var geners=req.body.geners;
    db.collection('Telugu').findOneAndUpdate({'ID' : id},{
      $set:{'Genres':geners}},{sort:{ID:-1}},
      (err,result)=>{
        if(err)
          return res.send(err)
        console.log(req.body.id+' got updated')
        res.redirect('/')
    })
  })
  app.post('/updateIMDb', (req,res)=>{
    var id=parseInt(req.body.id);
    var IMDb=parseFloat(req.body.IMDb);
    db.collection('Telugu').findOneAndUpdate({'ID' : id},{
      $set:{'IMDb_Rating':IMDb}},{sort:{ID:-1}},
      (err,result)=>{
        if(err)
          return res.send(err)
        console.log(req.body.id+' got updated')
        res.redirect('/')
    })
  })
  
  app.post('/updateRuntime', (req,res)=>{
    var id=parseInt(req.body.id);
    var Runtime=parseInt(req.body.Runtime);
    db.collection('Telugu').findOneAndUpdate({'ID' : id},{
      $set:{'Runtime':Runtime}},{sort:{ID:-1}},
      (err,result)=>{
        if(err)
          return res.send(err)
        console.log(req.body.id+' got updated')
        res.redirect('/')
    })
  })
  app.post('/updateTitle', (req,res)=>{
    var id=parseInt(req.body.id);
    var Title=req.body.Title;
    db.collection('Telugu').findOneAndUpdate({'ID' : id},{
      $set:{'Title':Title}},{sort:{ID:-1}},
      (err,result)=>{
        if(err)
          return res.send(err)
        console.log(req.body.id+' got updated')
        res.redirect('/')
    })
  })
app.post('/delete',(req,res)=>{
  var id=parseInt(req.body.id);
  db.collection('Telugu').findOneAndDelete({'ID':id},{sort:{ID:-1}},(err,result)=>{
    if (err)
      return console.log(err)
    console.log(result);  
    res.redirect('/')
  })
})      