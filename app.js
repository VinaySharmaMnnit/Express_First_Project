const express=require('express');
const hbs = require('hbs');

const port = process.env.PORT||'3000';
var app=express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    console.log(now);
    next();
})
const users=[
    {'name':'Vinay','age':21},
    {'name':'Om','age':22}
]



const posts=[
    {title:'Bank',
     description:'Here people can put there money'
    },
    {title:'Sea',
     desription:'75% of World oxygen comes from sea plants'   
}
]

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        PageTitle:'Home Page',
        siteName:'Tutorial',
        name:'Vinay'
    })
});

app.get('/users',(req,res)=>{
    res.send(users);
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        PageTitle: 'About Page',
        currentYear:new Date().getFullYear(),
        name:'Vinay'
    });
})

app.get('/users/:name',(req,res)=>{
    console.log(req.params);
    const {name}= req.params;
    const user=users.find((user)=>user.name===name);
    if(user)res.status(200).send(user);
    else res.status(404).send("Not found");
})

app.get('/posts/:title',(req,res)=>{
    console.log(req.query);
}
);

app.get('/posts',(req,res)=>{
    res.send(posts);
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})