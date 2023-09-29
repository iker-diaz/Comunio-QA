 //get queries
const getJugadores = (where) => {return `SELECT * FROM jugadores ${where}`};
const getJugadorByID = (campos) => {return `SELECT ${campos} FROM jugadores WHERE id_jugador = $1`};    
const getJugadorByEquipo = (campos) => {return `SELECT ${campos} FROM jugadores WHERE equipo = $1`};   
const getMejorFichaje = (campos) => {return `SELECT ${campos} FROM jugadores WHERE mejor_fichaje = true `};
const getJugadoresMercado = (campos) => {return `SELECT ${campos} FROM jugadores WHERE oferta_minima IS NOT NULL`};
const getHistorialByID = (campos) => {return `SELECT ${campos} FROM historial_jugadores WHERE id_jugador = $1 ORDER BY id_historial_jugador DESC LIMIT $2;`};
const getJugadoresByDia = (where) => {return `SELECT * FROM historial_jugadores WHERE fecha_registro = $1 ${where}`};
//update queries SELECT TO_CHAR(fecha_registro, 'YYYY-MM-DD') as formatted_date FROM your_table;

const patchJugador = "UPDATE jugadores SET propietario = $1, equipo = $2, posicion = $3, titular = $4, partidos_jugados = $5, ranking_general = $6, mejor_fichaje = $7, media_sofascore = $8, media_puntos = $9, total_puntos = $10, puntos_buenos = $11, oferta_minima = $12, valor_mercado = $13, valor_mercado_max = $14, valor_mercado_min = $15, ranking_equipo = $16, ranking_posicion = $17, tarjeta_amarilla = $18, tarjeta_roja = $19, doble_tarjeta_amarilla = $20, racha = $21, lesion = $22 WHERE id_jugador = $23";
const postJugador = "INSERT INTO jugadores (id_jugador, nombre, propietario, equipo, posicion, titular, partidos_jugados, ranking_general, ranking_equipo, ranking_posicion, media_sofascore, media_puntos, total_puntos, valor_mercado, valor_mercado_max, valor_mercado_min, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)";
const postJugadores = "INSERT INTO jugadores (id_jugador, nombre, propietario, equipo, posicion, titular, partidos_jugados, ranking_general, ranking_equipo, ranking_posicion, mejor_fichaje, media_sofascore, media_puntos, total_puntos, puntos_buenos, oferta_minima, valor_mercado, valor_mercado_max, valor_mercado_min, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24);"
const insertHistorial = "INSERT INTO historial_jugadores (id_jugador, nombre, fecha_registro, equipo, posicion, titular, partidos_jugados, ranking_general, ranking_equipo, ranking_posicion, media_sofascore, media_puntos, total_puntos, valor_mercado, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18);";

function constructWhereStatement(query) {
    where = "WHERE ";
    for (const key in query) {
        if (query[key] == "null") {
            where += key + " IS NULL AND ";
        } else if (query[key] == "notNull") {
            where += key + " IS NOT NULL AND ";
        } else {
            where += key + " = '" + query[key] + "' AND ";
        }
    }
    where = where.substring(0, where.length - 5);
    
    return where;
}

/*
const campos = "";
const getJugadores = "SELECT * FROM jugadores";
const getJugadorByID = (campos) => {return `SELECT ${campos} FROM jugadores WHERE id_jugador = $1`};    
const getMejorFichaje = (campos) => {return `SELECT ${campos} FROM jugadores WHERE mejor_fichaje = true`};
const getJugadoresByDia = `SELECT * FROM historial_jugadores WHERE fecha_registro LIKE $1`;
const getHistorialByID = (campos) => {return `SELECT ${campos} FROM historial_jugadores WHERE id_jugador = $1 ORDER BY id_historial_jugador DESC LIMIT $2`};
//update queries
const patchJugador = "UPDATE jugadores SET propietario = $1, equipo = $2, posicion = $3, titular = $4, partidos_jugados = $5, ranking_general = $6, mejor_fichaje = $7, media_sofascore = $8, media_puntos = $9, total_puntos = $10, puntos_buenos = $11, oferta_minima = $12, valor_mercado = $13, valor_mercado_max = $14, valor_mercado_min = $15, ranking_equipo = $16, ranking_posicion = $17, tarjeta_amarilla = $18, tarjeta_roja = $19, doble_tarjeta_amarilla = $20, racha = $21, lesion = $22 WHERE id_jugador = $23";
const postJugador = "INSERT INTO jugadores (id, nombre, propietario, equipo, posicion, titular, partidos_jugados, ranking_general, ranking_equipo, ranking_posicion, media_sofascore, media_puntos, total_puntos, valor_mercado, valor_mercado_max, valor_mercado_min, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)";
const insertHistorial = "INSERT INTO jugadores (id_jugador, nombre, propietario, equipo, posicion, titular, partidos_jugados, ranking_general, ranking_equipo, ranking_posicion, mejor_fichaje, media_sofascore, media_puntos, total_puntos, puntos_buenos, oferta_minima, valor_mercado, valor_mercado_max, valor_mercado_min, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion) VALUES (${jugador.id}, ${jugador.nombre}, ${jugador.propietario}, ${jugador.equipo}, ${jugador.posicion}, ${jugador.titular}, ${jugador.partidos_jugados}, ${jugador.ranking_general}, ${jugador.ranking_equipo}, ${jugador.ranking_posicion}, ${jugador.mejor_fichaje}, ${jugador.media_sofascore}, ${jugador.media_puntos}, ${jugador.total_puntos}, ${jugador.puntos_buenos}, ${jugador.oferta_minima}, ${jugador.valor_mercado}, ${jugador.valor_mercado_max}, ${jugador.valor_mercado_min}, ${jugador.tarjeta_amarilla}, ${jugador.tarjeta_roja}, ${jugador.doble_tarjeta_amarilla}, ${jugador.racha}, ${jugador.lesion})";
*/
module.exports = {
    constructWhereStatement,
    getJugadores,
    getJugadorByID,
    getJugadoresByDia,
    getHistorialByID,
    getMejorFichaje,
    patchJugador,
    postJugador,
    insertHistorial,
    getJugadorByEquipo,
    postJugadores,
    getJugadoresMercado
};