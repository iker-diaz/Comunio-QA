const express = require('express');
const router = express.Router();
const jugadoresController = require('../controllers/player_get_controller.js');

/**
 * @openapi
 * /api/v1/jugadores:
 *   get:
 *     tags:
 *     - "Jugadores"
 *     summary: Devuelve una lista de jugadores.
 *     description: Devuelve una lista con todos los jugadores de la base de datos.
 *     parameters:
 *       - name: campos
 *         in: query
 *         description: campos que van a ser mostrados al hacer la peticion.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista los jugadores.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_jugador:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   valor_mercado_max:
 *                     type: integer
 *                   valor_mercado_min:
 *                     type: integer
 *                   ranking_equipo:
 *                     type: integer
 *                   ranking_posicion:
 *                     type: integer
 *                   tarjeta_amarilla:
 *                     type: integer
 *                   tarjeta_roja:
 *                     type: integer
 *                   doble_tarjeta_amarilla:
 *                     type: integer
 *                   titular:
 *                     type: boolean
 *                   ranking_general:
 *                     type: integer
 *                   mejor_fichaje:
 *                     type: boolean
 *                   media_sofascore:
 *                     type: number
 *                     format: double 
 *                     example: "0.00"
 *                   media_puntos:
 *                     type: number
 *                     format: double 
 *                     example: 0.00
 *                   total_puntos:
 *                     type: number
 *                     format: double 
 *                     example: 0.00
 *                   puntos_buenos:
 *                     type: integer
 *                   oferta_minima:
 *                     type: integer
 *                   valor_mercado:
 *                     type: integer
 *                   propietario:
 *                     type: string
 *                   equipo:
 *                     type: string
 *                   posicion:
 *                     type: string
 *                   racha:
 *                     type: string
 *                   partidos_jugados:
 *                     type: string
 *                   lesion:
 *                     type: string
 *       500:
 *         description: Internal server error.
 */
router.get('/jugadores', jugadoresController.getTodosJugadores);

/**
 * @openapi
 * /api/v1/jugadores/mercado:
 *   get:
 *     tags:
 *     - "Jugadores"
 *     summary: Devuelve los jugadores del mercado
 *     description: Devuelve los jugadores del mercado
 *     parameters:
 *     responses:
 *       200:
 *         description: Todos los datos del mejor fichaje.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jugadores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_jugador:
 *                         type: integer
 *                       nombre:
 *                         type: string
 *                       propietario:
 *                         type: string
 *                       equipo:
 *                         type: string
 *                       posicion:
 *                         type: string
 *                       titular:
 *                         type: boolean
 *                       partidos_jugados:
 *                         type: string
 *                       ranking_general:
 *                         type: integer
 *                       mejor_fichaje:
 *                         type: boolean
 *                       media_sofascore:
 *                         type: number
 *                       media_puntos:
 *                         type: number
 *                       total_puntos:
 *                         type: integer
 *                       puntos_buenos:
 *                         type: null
 *                       oferta_minima:
 *                         type: null
 *                       valor_mercado:
 *                         type: integer
 *                       valor_mercado_max:
 *                         type: integer
 *                       valor_mercado_min:
 *                         type: integer
 *                       ranking_equipo:
 *                         type: integer
 *                       ranking_posicion:
 *                         type: integer
 *                       tarjeta_amarilla:
 *                         type: integer
 *                       tarjeta_roja:
 *                         type: integer
 *                       doble_tarjeta_amarilla:
 *                         type: integer
 *                       racha:
 *                         type: string
 *                       lesion:
 *                         type: string
 *                     required:
 *                       - id_jugador
 *                       - nombre
 *                       - propietario
 *                       - equipo
 *                       - posicion
 *                       - titular
 *                       - partidos_jugados
 *                       - ranking_general
 *                       - mejor_fichaje
 *                       - media_sofascore
 *                       - media_puntos
 *                       - total_puntos
 *                       - puntos_buenos
 *                       - oferta_minima
 *                       - valor_mercado
 *                       - valor_mercado_max
 *                       - valor_mercado_min
 *                       - ranking_equipo
 *                       - ranking_posicion
 *                       - tarjeta_amarilla
 *                       - tarjeta_roja
 *                       - doble_tarjeta_amarilla
 *                       - racha
 *                       - lesion
 *                   required:
 *                     - jugadores
 *       500:
 *         description: Internal server error.
 */
router.get('/jugadores/mercado', jugadoresController.getJugadoresMercado);

/**
 * @openapi
 * /api/v1/jugadores/{id}:
 *   get:
 *     tags:
 *     - "Jugadores"
 *     summary: Devuelve una lista de jugadores basado en un id.
 *     description: Devuelve una lista con todos los jugadores de la base de datos.
 *     parameters:
 *       - name: id_jugador
 *         in: query
 *         description: ID del jugador
 *         required: true
 *         schema: 
 *           type: integer
 *       - name: campos
 *         in: query
 *         description: campos que van a ser mostrados al hacer la peticion.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista los jugadores.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_jugador:
 *                     type: integer
 *                     example: 3423
 *                   nombre:
 *                     example: André Ferreira
 *                   valor_mercado_max:
 *                     type: integer
 *                     example: 230000
 *                   valor_mercado_min:
 *                     type: integer
 *                     example: 200000
 *                   ranking_equipo:
 *                     type: integer
 *                     example: 7
 *                   ranking_posicion:
 *                     type: integer
 *                     example: 20
 *                   tarjeta_amarilla:
 *                     type: integer
 *                   tarjeta_roja:
 *                     type: integer
 *                   doble_tarjeta_amarilla:
 *                     type: integer
 *                   titular:
 *                     type: boolean
 *                     example: true
 *                   ranking_general:
 *                     type: integer
 *                     example: 239
 *                   mejor_fichaje:
 *                     type: boolean
 *                     example: false
 *                   media_sofascore:
 *                     type: number
 *                     format: double 
 *                     example: 7.1
 *                   media_puntos:
 *                     type: number
 *                     format: double 
 *                     example: 5
 *                   total_puntos:
 *                     type: number
 *                     format: double 
 *                     example: 15
 *                   puntos_buenos:
 *                     type: integer<
 *                     example: null
 *                   oferta_minima:
 *                     type: integer
 *                     example: null
 *                   valor_mercado:
 *                     type: integer
 *                     example: 91000
 *                   propietario:
 *                     type: string
 *                     example: David
 *                   equipo:
 *                     type: string
 *                     example: Granada
 *                   posicion:
 *                     type: string
 *                     example: "PT"
 *                   racha:
 *                     type: string
 *                     example: Mala
 *                   partidos_jugados:
 *                     type: string
 *                     example: "3/6"
 *                   lesion:
 *                     type: string
 *                     example: "NO"
 *       500:
 *         description: Internal server error.
 */
router.get('/jugadores/:id', jugadoresController.getJugadorById);

/**
 * @openapi
 * /api/v1/mejor-fichaje:
 *   get:
 *     tags:
 *     - "Jugadores"
 *     summary: Devuelve el jugador considerado mejor fichaje esa jornada.
 *     description: Devuelve el jugador considerado mejor fichaje esa jornada a través de un boolean.
 *     responses:
 *       200:
 *         description: Todos los datos del mejor fichaje.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jugadores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_jugador:
 *                         type: integer
 *                       nombre:
 *                         type: string
 *                       propietario:
 *                         type: string
 *                       equipo:
 *                         type: string
 *                       posicion:
 *                         type: string
 *                       titular:
 *                         type: boolean
 *                       partidos_jugados:
 *                         type: string
 *                       ranking_general:
 *                         type: integer
 *                       mejor_fichaje:
 *                         type: boolean
 *                       media_sofascore:
 *                         type: number
 *                       media_puntos:
 *                         type: number
 *                       total_puntos:
 *                         type: integer
 *                       puntos_buenos:
 *                         type: null
 *                       oferta_minima:
 *                         type: null
 *                       valor_mercado:
 *                         type: integer
 *                       valor_mercado_max:
 *                         type: integer
 *                       valor_mercado_min:
 *                         type: integer
 *                       ranking_equipo:
 *                         type: integer
 *                       ranking_posicion:
 *                         type: integer
 *                       tarjeta_amarilla:
 *                         type: integer
 *                       tarjeta_roja:
 *                         type: integer
 *                       doble_tarjeta_amarilla:
 *                         type: integer
 *                       racha:
 *                         type: string
 *                       lesion:
 *                         type: string
 *                     required:
 *                       - id_jugador
 *                       - nombre
 *                       - propietario
 *                       - equipo
 *                       - posicion
 *                       - titular
 *                       - partidos_jugados
 *                       - ranking_general
 *                       - mejor_fichaje
 *                       - media_sofascore
 *                       - media_puntos
 *                       - total_puntos
 *                       - puntos_buenos
 *                       - oferta_minima
 *                       - valor_mercado
 *                       - valor_mercado_max
 *                       - valor_mercado_min
 *                       - ranking_equipo
 *                       - ranking_posicion
 *                       - tarjeta_amarilla
 *                       - tarjeta_roja
 *                       - doble_tarjeta_amarilla
 *                       - racha
 *                       - lesion
 *                   required:
 *                     - jugadores
 *       500:
 *         description: Internal server error.
 */
router.get('/mejor-fichaje', jugadoresController.getMejorFichaje);

/**
 * @openapi
 * /api/v1/equipo/{equipo}:
 *   get:
 *     tags:
 *     - "Jugadores"
 *     summary: Devuelve los jugadores de un equipo
 *     description: Devuelve los jugadores de un equipo especificado
 *     parameters:
 *     responses:
 *       200:
 *         description: Todos los datos del mejor fichaje.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jugadores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_jugador:
 *                         type: integer
 *                       nombre:
 *                         type: string
 *                       propietario:
 *                         type: string
 *                       equipo:
 *                         type: string
 *                       posicion:
 *                         type: string
 *                       titular:
 *                         type: boolean
 *                       partidos_jugados:
 *                         type: string
 *                       ranking_general:
 *                         type: integer
 *                       mejor_fichaje:
 *                         type: boolean
 *                       media_sofascore:
 *                         type: number
 *                       media_puntos:
 *                         type: number
 *                       total_puntos:
 *                         type: integer
 *                       puntos_buenos:
 *                         type: null
 *                       oferta_minima:
 *                         type: null
 *                       valor_mercado:
 *                         type: integer
 *                       valor_mercado_max:
 *                         type: integer
 *                       valor_mercado_min:
 *                         type: integer
 *                       ranking_equipo:
 *                         type: integer
 *                       ranking_posicion:
 *                         type: integer
 *                       tarjeta_amarilla:
 *                         type: integer
 *                       tarjeta_roja:
 *                         type: integer
 *                       doble_tarjeta_amarilla:
 *                         type: integer
 *                       racha:
 *                         type: string
 *                       lesion:
 *                         type: string
 *                     required:
 *                       - id_jugador
 *                       - nombre
 *                       - propietario
 *                       - equipo
 *                       - posicion
 *                       - titular
 *                       - partidos_jugados
 *                       - ranking_general
 *                       - mejor_fichaje
 *                       - media_sofascore
 *                       - media_puntos
 *                       - total_puntos
 *                       - puntos_buenos
 *                       - oferta_minima
 *                       - valor_mercado
 *                       - valor_mercado_max
 *                       - valor_mercado_min
 *                       - ranking_equipo
 *                       - ranking_posicion
 *                       - tarjeta_amarilla
 *                       - tarjeta_roja
 *                       - doble_tarjeta_amarilla
 *                       - racha
 *                       - lesion
 *                   required:
 *                     - jugadores
 *       500:
 *         description: Internal server error.
 */
router.get('/equipo/:equipo', jugadoresController.getJugadorByEquipo);

module.exports = router;
