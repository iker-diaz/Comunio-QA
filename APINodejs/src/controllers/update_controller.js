const db = require("../db_config/db.js");
const queries = require("../queries/queries.js")
const client = db.getClientForPrueba();
const fs = require('fs');
client.connect();

//Funcion para actualizar los datos de un jugador
const patchJugador = (req, res, next) => {
    const id = req.params.id;
    const {
        propietario, equipo, posicion, titular, partidos_jugados, ranking_general,
        mejor_fichaje, media_sofascore, media_puntos, total_puntos, puntos_buenos, oferta_minima,
        valor_mercado, valor_mercado_max, valor_mercado_min, ranking_equipo, ranking_posicion,
        tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion
    } = req.body;
    const values = [
        propietario, equipo, posicion, titular, partidos_jugados, ranking_general,
        mejor_fichaje, media_sofascore, media_puntos, total_puntos, puntos_buenos, oferta_minima,
        valor_mercado, valor_mercado_max, valor_mercado_min, ranking_equipo, ranking_posicion,
        tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion, id
    ];
    client.query(queries.patchJugador, values, error => {
        if (error) {
            console.error("Error executing PostgreSQL query:", error);
            res.status(500).json({ error: "Jugador no actualizado" });
            return next(error);
        }
        res.status(200).json({ mensaje: "Jugador actualizado" });
    });
};

//Funcion para insertar un jugador en la tabla de jugadores
const postJugador = (req, res, next) => {
    const {
        id, nombre, propietario, equipo, posicion, titular, partidos_jugados, ranking_general,
        ranking_equipo, ranking_posicion, media_sofascore, media_puntos, total_puntos, valor_mercado, valor_mercado_max,
        valor_mercado_min, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion
    } = req.body;
    const values = [
        id, nombre, propietario, equipo, posicion, titular, partidos_jugados, ranking_general,
        ranking_equipo, ranking_posicion, media_sofascore, media_puntos, total_puntos, valor_mercado, valor_mercado_max,
        valor_mercado_min, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion
    ]
    client.query(queries.postJugador, values, error => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Jugador no añadido" });
            return next(error);
        }
        res.json({ message: 'Jugador añadido' });
    });

};
//Funcion para insertar todos los jugadores en  la tabla de jugadores
const postJugadores = (req, res, next) => {
    fs.readFile(req.body, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            res.status(500).send('Error interno del servidor');
            return next(err);
        }
        try {
            // Parsea el contenido del archivo JSON
            const jsonData = JSON.parse(data);
            const jugadores = jsonData.jugadores;
            const jugadoresLength = jugadores.length;
            for (let index = 0; index < jugadoresLength; index++) {
                const values = [
                    $jugadores[index].id,
                    $jugadores[index].nombre,
                    $jugadores[index].propietario,
                    $jugadores[index].equipo,
                    $jugadores[index].posicion,
                    $jugadores[index].titular,
                    $jugadores[index].partidos_jugados,
                    $jugadores[index].ranking_general,
                    $jugadores[index].ranking_equipo,
                    $jugadores[index].ranking_posicion,
                    $jugadores[index].mejor_fichaje,
                    $jugadores[index].media_sofascore,
                    $jugadores[index].media_puntos,
                    $jugadores[index].total_puntos,
                    $jugadores[index].puntos_buenos,
                    $jugadores[index].oferta_minima,
                    $jugadores[index].valor_mercado,
                    $jugadores[index].valor_mercado_max,
                    $jugadores[index].valor_mercado_min,
                    $jugadores[index].tarjeta_amarilla,
                    $jugadores[index].tarjeta_roja,
                    $jugadores[index].doble_tarjeta_amarilla,
                    $jugadores[index].racha,
                    $jugadores[index].lesion
                ];
                client.query(queries.postJugadores, values, (error, results) => {
                    if (error) {
                        console.error("Error executing MySQL query:", error);
                        res.status(500).json({ error: "Jugador no añadido" });
                        return next(error);
                    }
                });
            }
            res.json({ message: 'Jugadores añadidos' });
        } catch (parseError) {
            console.error('Error al analizar el archivo JSON:', parseError);
            res.status(500).send('Error interno del servidor');
        }
    });
};

//Funcion para insertar los datos de los jugadores en la tabla de historial
const insertHistorial = (req, res) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    // day--;
    // if (day < 1) {
    //     if (month == 1 || month == 2 || month == 4 || month == 6 || month == 8 || month == 9 || month == 11) {
    //         day = 31;
    //     } else if (month == 3) {
    //         if (year % 4 == 0) {
    //             day = 29;
    //         } else {
    //             day = 28;
    //         }
    //     } else {
    //         day = 30;
    //     }
    //     month--;
    // }
    // if (month < 1) {
    //     month = 12;
    //     year--;
    // }

    let formattedDate = year + "-";
    if (month < 10) formattedDate += "0";
    formattedDate += month + "-";
    if (day < 10) formattedDate += "0";
    formattedDate += day;

    client.query(queries.getJugadores("*"), (error1, results) => {
        if (error1) {
            console.error("Error executing PostgreSQL query:", error1);
            res.status(500).json({ error1: "Error interno del servidor" });
            return;
        }

        const jugadores = results.rows;
        const jugadoresLength = jugadores.length;
        for (let index = 0; index < jugadoresLength; index++) {
            const values = [jugadores[index].id_jugador,
                jugadores[index].nombre,
                formattedDate,
                jugadores[index].equipo,
                jugadores[index].posicion,
                jugadores[index].titular,
                jugadores[index].partidos_jugados,
                jugadores[index].ranking_general,
                jugadores[index].ranking_equipo,
                jugadores[index].ranking_posicion,
                jugadores[index].media_sofascore,
                jugadores[index].media_puntos,
                jugadores[index].total_puntos,
                jugadores[index].valor_mercado,
                jugadores[index].tarjeta_amarilla,
                jugadores[index].tarjeta_roja,
                jugadores[index].doble_tarjeta_amarilla,
                jugadores[index].racha];
            client.query(queries.insertHistorial, values, (error2) => {
                if (error2) {
                    console.error("Error executing MySQL query:", error2);
                    res.status(500).json({ error2: "Internal Server Error" });
                    return;
                }
            });
        }
        res.status(200).json({ "message": "Jugadores añadidos al historial" });
    });
};

module.exports = {
    patchJugador,
    postJugador,
    postJugadores,
    insertHistorial
};

