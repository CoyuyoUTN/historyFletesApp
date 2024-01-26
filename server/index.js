const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

function formatearFecha(fechaISO8601) {
    // Crear un objeto de fecha
    var fecha = new Date(fechaISO8601);
  
    // Obtener los componentes de la fecha
    var year = fecha.getFullYear();
    var month = fecha.getMonth() + 1; // ¡Recuerda que en JavaScript los meses van de 0 a 11!
    var day = fecha.getDate();
  
    // Formatear la fecha como "yyyy/mm/dd"
    var fechaFormateada = year + '/' + (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day;
  
    return fechaFormateada;
  }

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"fletes"

});

app.post("/create",(req,res)=>{
    const date = req.body.date;
    const description = req.body.description;
    const price = req.body.price;
    const type = req.body.type;
  
    db.query("INSERT INTO flete(date, type, description, price) VALUES(?,?,?,?)",[date,type,description,price],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});


app.get("/fletes", (req, res) => {
    const { mes, anio } = req.query;
  
    // Validar que se proporcionen mes y año
    if (!mes || !anio) {
      return res.status(400).json({ error: 'Por favor, proporciona mes y año.' });
    }
  
    // Construir y ejecutar la consulta SQL con parámetros
    const consulta = `SELECT *, DATE_FORMAT(date, '%Y-%m-%d') AS formattedDate FROM flete WHERE MONTH(date) = ? AND YEAR(date) = ?`;
  
    db.query(consulta, [mes, anio], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error en la consulta SQL.' });
      }
  
      res.send(result);
    });
  });


app.put("/update",(req,res)=>{
    const id=req.body.id;
    const date = formatearFecha(req.body.date);
    const description = req.body.description;
    const price = req.body.price;
    const type = req.body.type;

   

    db.query("UPDATE flete SET date=?, type=?, description=?, price=? WHERE id=?",[date,type,description,price,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});


app.delete("/delete/:id",(req,res)=>{
    const id= req.params.id;
   
    db.query("DELETE FROM flete WHERE id = ?", [id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});



app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001");
 }
)