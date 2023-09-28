const express = require('express');
const router = express.Router();
const jugadoresController = require('../controllers/update_controller.js');

/**
 * @openapi
 * /api/v1/historial-jugadores/{id}/actualizar:
 *   patch:
 *     tags:
 *     - "Gestion de jugadores"
 *     summary: Actualiza un jugador a traves de su id.
 *     description: Actualiza un jugador a traves de su id.
 *     responses:
 *       200:
 *         description: Jugador actualizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id_jugador:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 fecha_registro:
 *                   type: date
 *                 equipo:
 *                   type: string
 *                 ranking_general:
 *                   type: integer
 *                 ranking_equipo:
 *                   type: integer
 *                 ranking_posicion:
 *                   type: integer
 *                 tarjeta_amarilla:
 *                   type: integer
 *                 tarjeta_roja:
 *                   type: integer
 *                 doble_tarjeta_amarilla:
 *                   type: integer
 *                 titular:
 *                   type: boolean
 *                 mejor_fichaje:
 *                   type: boolean
 *                 media_sofascore:
 *                   type: number
 *                   format: double
 *                   example: "0.00"
 *                 media_puntos:
 *                   type: number
 *                   format: double
 *                   example: 0.00
 *                 total_puntos:
 *                   type: number
 *                   format: double
 *                   example: 0.00
 *                 puntos_buenos:
 *                   type: integer
 *                 oferta_minima:
 *                   type: integer
 *                 valor_mercado:
 *                   type: integer
 *                 propietario:
 *                   type: string
 *                 posicion:
 *                   type: string
 *                 racha:
 *                   type: string
 *                 partidos_jugados:
 *                   type: string
 *                 lesion:
 *                   type: string
 *       500:
 *         description: Internal server error.
 */
router.patch("/jugadores/:id/actualizar", jugadoresController.patchJugador);

/**
 * @openapi
 * /api/v1/jugadores/insertar:
 *   post:
 *     tags:
 *     - "Gestion de jugadores"
 *     summary: Crea a un jugador.
 *     description: Crea a un jugador.
 *     responses:
 *       200:
 *         description: Jugador actualizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id_jugador:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 fecha_registro:
 *                   type: date
 *                 equipo:
 *                   type: string
 *                 ranking_general:
 *                   type: integer
 *                 ranking_equipo:
 *                   type: integer
 *                 ranking_posicion:
 *                   type: integer
 *                 tarjeta_amarilla:
 *                   type: integer
 *                 tarjeta_roja:
 *                   type: integer
 *                 doble_tarjeta_amarilla:
 *                   type: integer
 *                 titular:
 *                   type: boolean
 *                 mejor_fichaje:
 *                   type: boolean
 *                 media_sofascore:
 *                   type: number
 *                   format: double
 *                   example: "0.00"
 *                 media_puntos:
 *                   type: number
 *                   format: double
 *                   example: 0.00
 *                 total_puntos:
 *                   type: number
 *                   format: double
 *                   example: 0.00
 *                 puntos_buenos:
 *                   type: integer
 *                 oferta_minima:
 *                   type: integer
 *                 valor_mercado:
 *                   type: integer
 *                 propietario:
 *                   type: string
 *                 posicion:
 *                   type: string
 *                 racha:
 *                   type: string
 *                 partidos_jugados:
 *                   type: string
 *                 lesion:
 *                   type: string
 *       500:
 *         description: Internal server error.
 */
router.post("/jugadores/insertar", jugadoresController.postJugador);

/**
 * @openapi
 * /api/v1/jugadores:
 *   post:
 *     tags:
 *     - "Gestion de jugadores"
 *     summary: Crea todos los jugadores en la tabla de jugadores en la base de datos a traves del JSON del Webscraping.
 *     description: Crea todos los jugadores en la base de datos a traves del JSON del Webscraping.
 *     responses:
 *       200:
 *         description: Jugador actualizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id_jugador:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 fecha_registro:
 *                   type: date
 *                 equipo:
 *                   type: string
 *                 ranking_general:
 *                   type: integer
 *                 ranking_equipo:
 *                   type: integer
 *                 ranking_posicion:
 *                   type: integer
 *                 tarjeta_amarilla:
 *                   type: integer
 *                 tarjeta_roja:
 *                   type: integer
 *                 doble_tarjeta_amarilla:
 *                   type: integer
 *                 titular:
 *                   type: boolean
 *                 mejor_fichaje:
 *                   type: boolean
 *                 media_sofascore:
 *                   type: number
 *                   format: double
 *                   example: "0.00"
 *                 media_puntos:
 *                   type: number
 *                   format: double
 *                   example: 0.00
 *                 total_puntos:
 *                   type: number
 *                   format: double
 *                   example: 0.00
 *                 puntos_buenos:
 *                   type: integer
 *                 oferta_minima:
 *                   type: integer
 *                 valor_mercado:
 *                   type: integer
 *                 propietario:
 *                   type: string
 *                 posicion:
 *                   type: string
 *                 racha:
 *                   type: string
 *                 partidos_jugados:
 *                   type: string
 *                 lesion:
 *                   type: string
 *       500:
 *         description: Internal server error.
 */
router.post("/jugadores", jugadoresController.postJugadores);

/**
 * @openapi
 * /api/v1/historial-jugadores:
 *   post:
 *     tags:
 *     - "Gestion de jugadores"
 *     summary: Crea todos los jugadores en la tabla de historial en la base de datos a traves del JSON del Webscraping.
 *     description: Crea todos los jugadores en la tabla de historial en la base de datos a traves del JSON del Webscraping.
 *     responses:
 *       200:
 *         description: Jugador actualizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id_jugador:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 fecha_registro:
 *                   type: date
 *                 equipo:
 *                   type: string
 *                 ranking_general:
 *                   type: integer
 *                 ranking_equipo:
 *                   type: integer
 *                 ranking_posicion:
 *                   type: integer
 *                 tarjeta_amarilla:
 *                   type: integer
 *                 tarjeta_roja:
 *                   type: integer
 *                 doble_tarjeta_amarilla:
 *                   type: integer
 *                 titular:
 *                   type: boolean
 *                 mejor_fichaje:
 *                   type: boolean
 *                 media_sofascore:
 *                   type: number
 *                   format: double
 *                   example: "0.00"
 *                 media_puntos:
 *                   type: number
 *                   format: double
 *                   example: 0.00
 *                 total_puntos:
 *                   type: number
 *                   format: double
 *                   example: 0.00
 *                 puntos_buenos:
 *                   type: integer
 *                 oferta_minima:
 *                   type: integer
 *                 valor_mercado:
 *                   type: integer
 *                 propietario:
 *                   type: string
 *                 posicion:
 *                   type: string
 *                 racha:
 *                   type: string
 *                 partidos_jugados:
 *                   type: string
 *                 lesion:
 *                   type: string
 *       500:
 *         description: Internal server error.
 */
router.post("/historial-jugadores", jugadoresController.insertHistorial);

module.exports = router;