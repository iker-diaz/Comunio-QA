const db = require("../db_config/db.js");
const queries = require('../queries/queries.js');
const client = db.getClientForPrueba();
client.connect();

//Funcion para obtener los registros de todas las fechas del historial a traves del id del jugador
const getHistorialByID = (req, res) => {
    const id = req.params.id;
    let dias = req.query.dias;
    let campos = req.query.campos;
    if (!campos) campos = "id_jugador, nombre, equipo, posicion, titular, partidos_jugados, ranking_general, ranking_equipo, ranking_posicion, media_sofascore, media_puntos, total_puntos, valor_mercado, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha";
    campos = "fecha_registro," + campos;
    if (!dias) dias = 1;
    const values = [id, dias];
    client.query(queries.getHistorialByID(campos), values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugadores = results.rows;
        jugadores.forEach(jugador => {
            jugador.fecha_registro = jugador.fecha_registro.toISOString().substring(0, 10);
        })

        res.status(200).json({ jugadores });
    });
};

const getHistorialByDia = (req, res) => {
    const fecha = req.params.fecha;
    let query = req.query;
    let where = "";
    if(Object.keys(query).length > 0){
        where = queries.constructWhereStatement(query);
        where = " AND" + where.substring(5, where.length);
    }
    console.log("------------" + where);
    const values = [fecha];
    client.query(queries.getJugadoresByDia(where), values, (error, results) => {
        if (error) {
            console.error("Error executing PostgreSQL query:", error);
            res.status(500).json({ error: "Error interno del servidor" });
            return;
        }
        const jugadores = results.rows;
        jugadores.forEach(jugador => {
            jugador.fecha_registro = jugador.fecha_registro.toISOString().substring(0, 10);
        })

        res.status(200).json({ jugadores });
    });
};

module.exports = {
    getHistorialByID,
    getHistorialByDia
}