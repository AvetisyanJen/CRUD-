const express = require('express')
const sqlite = require('sqlite3').verbose()
const app = express()
const cors=require('cors')
app.use(cors())
app.use(express.json())

const db = new sqlite.Database('hayeci.db', (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("OK")
    }
})

app.get('/', (req, res) => {
    db.all('SELECT * FROM hayeci', (err, data) => {
        res.send(data)
    })
})

app.get('/product/:id', (req, res) => {
    const id = req.params.id
    db.get('SELECT * FROM hayeci WHERE id=?', [id], (err, data) => {
        console.log(data)
        res.send(data)
    })
})


app.post('/new', (req,res) => {

    const name = req.body.name
    const img = req.body.img
    const category=req.body.category
    const price = req.body.price
    const description = req.body.info
    console.log(name)
console.log(name )
    db.run('INSERT INTO hayeci (name,img,category,price,description) values (?,?,?,?,?)', [name,img,category,price,description],(err) => {
        res.send("OOKK")
    })
})
app.delete('/delet', (req,res) => {
    
    const id = req.body.id
 console.log(id)
    db.run('DELETE FROM hayeci WHERE id=?;)', [id],(err) => {
        res.send("OOKKK")
    })
})

app.put('/update/:id', (req,res) => {
    const id = req.params.id
    const name=req.body.name
 console.log(id)
    db.run('UPDATE hayeci SET name=? WHERE id=?;)', [name,id],(err) => {
        res.send("OOKKK")
    })
})
app.listen(4000)