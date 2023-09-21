const express = require('express');
const app = express();
const { Client } = require('pg');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(morgan('dev'));

// Connect to the "comunio" database
const client = new Client({
    host: '10.228.64.234',
    port: 5432,
    database: 'prueba',
    user: 'postgres',
    password: 'fBA!VSSGw!8af^&2',
});
  
client.connect();

// Get de todos los jugadores
app.get('/api/v1/jugadores', (req, res) => {
    const query = 'SELECT * FROM jugadores';
    client.query(query, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugadores = results.rows;
        res.status(200).json({ jugadores });
    });
});


// Devuelve todos los datos de un jugador buscado por su ID
app.get('/api/v1/jugador/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * 
                FROM jugadores 
                WHERE id_jugador = $1`;

    const values = [id]
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugador = results.rows;
        res.status(200).json({ jugador });
    });
});

// Devuelve los datos generales de un jugador buscando por su ID
app.get("/api/v1/jugador/:id/general", (req, res) =>{
    const id = req.params.id;
    const query = "SELECT nombre, propietario, equipo, posicion, titular, partidos_jugados, mejor_fichaje, racha, lesion FROM jugadores WHERE id_jugador = $i;";
    const values = [id];
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugador = results.rows;
        res.status(200).json({ jugador });
    })
})

// Devuelve los campos relativos al mercado del jugador buscado por ID.
app.get('/api/v1/jugador/:id/infoMercado', (req, res) => {
    const id = req.params.id;
    const query = `SELECT nombre, oferta_minima, valor_mercado, valor_mercado_max, valor_mercado_min
                FROM jugadores
                WHERE id_jugador = $1`;
    const values = [id]
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugador = results.rows;
        res.status(200).json({ jugador });
    })
})

// Devuelve un dato concreto de un jugador buscando por su ID
app.get("/api/v1/jugador/:id/:campo", (req, res) =>{
    const id = req.params.id;
    const campo = req.params.campo;
    const query = "SELECT nombre, propietario, equipo, posicion, titular, partidos_jugados, mejor_fichaje, racha, lesion FROM jugadores WHERE id_jugador = $i;";
    const values = [id];
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugador = results.rows;
        res.status(200).json({ jugador });
    })
})

// Actualiza la información del jugador que coincida con su ID
app.patch('/api/v1/jugador/:id/actualizar', (req, res) => {
    const id = req.params.id;
    const {
        propietario, equipo, posicion, titular, partidos_jugados, ranking_general,
        mejor_fichaje, media_softscore, media_puntos, total_puntos, puntos_buenos, oferta_minima,
        valor_mercado, valor_mercado_max, valor_mercado_min, ranking_equipo, ranking_posicion,
        tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion
    } = req.body;

    const query = `
        UPDATE jugadores 
        SET propietario = $1, equipo = $2, posicion = $3, titular = $4, partidos_jugados = $5,
        ranking_general = $6, mejor_fichaje = $7, media_softscore = $8, media_puntos = $9, total_puntos = $10,
        puntos_buenos = $11, oferta_minima = $12, valor_mercado = $13, valor_mercado_max = $14,
        valor_mercado_min = $15, ranking_equipo = $16, ranking_posicion = $17, tarjeta_amarilla = $18,
        tarjeta_roja = $19, doble_tarjeta_amarilla = $20, racha = $21, lesion = $22
        WHERE id_jugador = $23`;

    const values = [
        propietario, equipo, posicion, titular, partidos_jugados, ranking_general,
        mejor_fichaje, media_softscore, media_puntos, total_puntos, puntos_buenos, oferta_minima,
        valor_mercado, valor_mercado_max, valor_mercado_min, ranking_equipo, ranking_posicion,
        tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion, id
    ];

    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing PostgreSQL query:", error);
            res.status(500).json({ error: "Error interno del servidor" });
            return;
        }
        res.status(200).json({ mensaje: "Jugador actualizado" });
    });
});


/*
app.put('/api/v1/jugadores/editar/:id', (req, res) => {
    const { nombre, propietario, equipo, posicion, titular, partidos_jugados, once_ideal, evolucion_semanal, ranking_general, mejor_fichaje, puntuaje, media_softscore, media_puntos, total_puntos, puntos_buenos, oferta_minima, valor_mercado, valor_mercado_max, valor_mercado_min, ranking_equipo, ranking_posicion, goles, asistencias, paradas, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla } = req.body;
    const id = req.params.id;
    const query = `UPDATE jugadores 
                    SET nombre = '${nombre}', propietario = '${propietario}', equipo = '${equipo}', posicion = '${posicion}', titular = '${titular}', partidos_jugados = '${partidos_jugados}', once_ideal = '${once_ideal}', evolucion_semanal = '${evolucion_semanal}', ranking_general = '${ranking_general}', mejor_fichaje = '${mejor_fichaje}', puntuaje = '${puntuaje}', media_softscore = '${media_softscore}', media_puntos = '${media_puntos}', total_puntos = '${total_puntos}', puntos_buenos = '${puntos_buenos}', oferta_minima = '${oferta_minima}', valor_mercado = '${valor_mercado}', valor_mercado_max = '${valor_mercado_max}', valor_mercado_min = '${valor_mercado_min}', ranking_equipo = '${ranking_equipo}', ranking_posicion = '${ranking_posicion}', goles = '${goles}', asistencias = '${asistencias}', paradas = '${paradas}', tarjeta_amarilla = '${tarjeta_amarilla}', tarjeta_roja = '${tarjeta_roja}', doble_tarjeta_amarilla = '${doble_tarjeta_amarilla}'
                    WHERE id = ${id}`;

    client.query(query, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugador = results;
        res.status(200).json({ jugador });
    });
});
*/

// Conseguir id con nombre de jugador
/*
app.get('/api/v1/jugadores/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const query = `SELECT jugador_id
                 FROM jugadores 
                 WHERE nombre = ${nombre}`;

    client.query(query, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugador = results;
        res.status(200).json({ jugador });
    });
});

// Buscar jugadores por id
app.get('/api/v1/jugadores/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM jugadores WHERE id_jugador = ${id}`;
    client.query(query, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugador = results;
        res.status(200).json({ jugador });
    });
});




// // // Buscar jugadores por nombre
// // app.get('/api/v1/jugadores/:nombre', (req, res) => {
// //     const { nombre } = req.params;
// //     const query = `SELECT * FROM jugadores WHERE nombre = '${nombre}'`;
// //     connection.query(query, (error, results) => {
// //         if (error) {
// //             console.error("Error executing MySQL query:", error);
// //             res.status(500).json({ error: "Internal Server Error" });
// //             return;
// //         }
// //         const jugador = results;
// //         res.status(200).json({ jugador });
// //     });
// // });

// app.post('/api/v1/jugadores', (req, res) => {
//     const { id, nombre, precio, puntos_totales, equipo } = req.body;
//     const query = `INSERT INTO jugadores ( id, nombre, precio, puntos_totales, equipo) VALUES ('${id}', '${nombre}', '${precio}', '${puntos_totales}', '${equipo}')`;
//     connection.query(query, (error, results) => {
//         if (error) {
//             console.error("Error executing MySQL query:", error);
//             res.status(500).json({ error: "Internal Server Error" });
//             return;
//         }
//         const jugador = results;
//         res.status(200).json({ id: id, nombre: nombre, precio: precio });
//     });
// });

*/
app.listen(80, () => {
    console.log(`Server running on port ${80}`);
});