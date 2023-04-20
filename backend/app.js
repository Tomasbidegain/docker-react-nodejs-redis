
const redisclient = require('./redis/index')
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())
app.use(express.json());

const CharactersRoutes = require('./routes/Characters.routes')

redisclient.connect()

redisclient.on('connect', function(){
  console.log("Conectado a redis!")
})

redisclient.on("ready", () => {
  console.log("Listo!")
});

redisclient.on("error", (err) => {
  console.log("Error en la conexión" + err)
});

// (async () => {
//     //Insertamos el valor yoda en master
//     redisclient.set('master', 'yoda')

//     //Insertamos un array de personajes en la lista "lista_key"
//     redisclient.lPush('lista_key', ['yoda', 'darth vader', 'mandooo', 'obi-wan kenobi'])
    
//     //Obtenemos el valor de master y luego lo mostramos por consola
//     const value = await redisclient.get("master")
//     console.log(value)

//     //Obtenemos los valores de lista_key y luego los mostramos por consola
//     const result = await redisclient.lRange('lista_key', 0, -1)
//     console.log(result)
// })()

app.use(CharactersRoutes)
app.listen(3001, function(){
    console.log('Aplicacion corriendo en el puerto 3001')
})