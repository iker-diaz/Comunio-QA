const db = require("../db_config/db.js");
const queries = require('../queries/queries.js');
const client = db.getClientForPrueba();
client.connect();

// Función para obtener todos los jugadores

const getTodosJugadores = (req, res) => {
    /*let filas;
    let valores;
    let where = "";
    if (req.query.filas && req.query.valores) {
        console.log("exist");
        filas = req.query.filas.split(",");
        valores = req.query.valores.split(",");
        if (filas.length == valores.length) {
            console.log("valid");
            where = "WHERE " + filas[0] + " = '" + valores[0] + "'";
            for (let index = 1; index < filas.length; index++) {
                where += " AND " + filas[index] + " = '" + valores[index] + "'";
            }
        }
    }*/
    let campos = req.query.campos;
    if (!campos) campos = "*";
    client.query(queries.getJugadores(campos, where), (error, results) => {
        if (error) {
            console.error('Error executing PostgreSQL query:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        const jugadores = results.rows;
        res.status(200).json({ jugadores });
    });
};

//Funcion para obtener campos seleccionados de un; jugador por id
const getJugadorById = (req, res) => {
    const id = req.params.id;
    let campos = req.query.campos;
    if (!campos) campos = "*";
    const values = [id];
    client.query(queries.getJugadorByID(campos), values, (error, results) => {
        if (error) {
            console.error('Error executing PostgreSQL query:', error);
            res.status(500).json({ error: 'No se encuentra el jugador' });
            return;
        }
        const jugador = results.rows;
        res.status(200).json({ jugador });
    });
};

//Funcion para obtener campos seleccionados de jugadores con mejor fichaje
const getMejorFichaje = (req, res) => {
    let campos = req.query.campos;
    if (!campos) campos = "*";
    client.query(queries.getMejorFichaje(campos), (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugadores = results.rows;
        res.status(200).json({ jugadores });
    });
};

const getJugadorByEquipo = (req, res) => {
    let equipo = req.params.equipo
    let campos = req.query.campos;
    if (!campos) campos = "*";
    console.log(equipo);
    const values = [equipo];
    client.query(queries.getJugadorByEquipo(campos), values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "No se encuentra los jugadores del equipo especificado" });
            return;
        }
        const jugadores = results.rows;
        res.status(200).json({ jugadores });
    });
};
const getJugadoresMercado = (req, res) => {
    let campos = req.query.campos;
    if (!campos) campos = "*";
    client.query(queries.getJugadoresMercado(campos), (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugadores = results.rows;
        res.status(200).json({ jugadores });
    });
};
module.exports = {
    getTodosJugadores,
    getJugadorById,
    getMejorFichaje,
    getJugadorByEquipo,
    getJugadoresMercado
};
