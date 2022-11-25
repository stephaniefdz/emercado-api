const express = require("express"); // Llamar a express 
const app = express();  // Iniciamos el servidor 
const fs = require("fs/promises"); // Lee asincronamente el contenido de los distintos archivos .json
const path = require("path"); // Indicamos el uso del path para luego trabajarlo con  las rutas de nuestros archivos
const port = 3000; // Para crear un server en el puerto 3000

// Primer endpoint (localización desde que la API puede accedera los recursos que necesita para llevar a cabo su funcion)

app.get("/", (req, res) => {
  res.send("Hi, this is a API REST");
});

// Metodo GET 

// "msg": "¡Has comprado con éxito!"

app.get("/cart", async (req, res) => {
    const data = await fs.readFile(path.join(__dirname, "./cart/buy.json"));
    res.send(JSON.parse(data));
  });

  
// Categories List 

app.get("/cats", async (req, res) => {
  const data = await fs.readFile(path.join(__dirname, "./cats/cat.json"));
  res.send(JSON.parse(data));
});

// Categories id: 101 to 109

app.get("/cats_products/:id", async (req, res) => {
    const data = await fs.readFile(path.join(__dirname, `./cats_products/${req.params.id}.json`) // fs.readFile para leer el archivo, luego Utilizo path.join() para llegar al archivo contenido en la carpeta EMERCADO-API, tomando a __dirname como primer argumento seguido de su directorio "dinamico" encapsulado entre backticks con req.params.id para rescatar el id del endpoint que se manda en la peticion http://localhost:3000/ y agrego la extension del archivo json
    );
    res.send(JSON.parse(data));
  });

// Product information id: 50741 ("Oso de peluche") - 60804 ("Mesa de centro")

app.get("/products/:id", async (req, res) => {
  const data = await fs.readFile(path.join(__dirname, `./products/${req.params.id}.json`)
  );
  res.send(JSON.parse(data)); //comvertimos la cadena JSON a la data en un objeto o arreglo de JS utilizable con JSON.parse() 
});

// user comments and review according to product id 

app.get("/products_comments/:id", async (req, res) => {
  const data = await fs.readFile(path.join(__dirname, `./products_comments/${req.params.id}.json`)
  );
  res.send(JSON.parse(data));
});

// "msg": "¡Has publicado con éxito!"

app.get("/sell", async (req, res) => {
    const data = await fs.readFile(path.join(__dirname, "./sell/publish.json"));
    res.send(JSON.parse(data));
  });
  

// user cart 25801  

app.get("/user_cart/", async (req, res) => {
  const data = await fs.readFile(path.join(__dirname, "./user_cart/25801.json")
  );
  res.send(JSON.parse(data));
});


// Servidor que va a estar escuchando por el puerto 3000 

app.listen(port, () => {
  console.log(`Server started on port ${port}`); // Agrego un msje en la consola para saber si la API se activa cuando iniciamos el server
});