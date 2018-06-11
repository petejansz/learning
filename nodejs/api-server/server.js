/**
 * Simple REST API server to mock responses, ...
 * Author: Pete Jansz
 */

var bodyParser = require( 'body-parser' )
var program = require( 'commander' )
var express = require( 'express' )
var morgan = require( 'morgan' )

program
    .version( '0.0.1' )
    .description( 'Simple REST API server' )
    .usage( 'ARGS' )
    .option( '--port [port]', 'Port number (default=8680)', parseInt )
    .parse( process.argv )

var app = express()

// configure app
app.use( morgan( 'dev' ) ) // log requests to the console

// configure body parser
app.use( bodyParser.urlencoded( { extended: true } ) )
app.use( bodyParser.json() )

var port = program.port || 8680

// Profile models lives here
var Profile = require( './models/profile.js' )

// create our router
var router = express.Router()

// middleware to use for all requests
router.use( function ( req, res, next )
{
    // do logging
    console.log( JSON.stringify( req.body ) )
    next()
} )

// test route to make sure everything is working (accessed at GET http://localhost:port/api)
router.get( '/', function ( req, res )
{
    res.json( { message: 'Welcome to our api!' } )
} )

router.get( '/v1/california-admin-rest/players/:playerId/services', function ( req, res )
{
    var playerId = req.param( 'playerId' )
    res.json( { playerId: playerId, services: [ {name: "pp", id:123, state: "SUSPENDED"}, {name: "sc", id:246, state: "ACTIVE"} ] } )
} )

router.put( '/v1/california-admin-rest/players/:playerId/services/:state', function ( req, res )
{
    var playerId = req.param( 'playerId' )
    var state = req.param( 'state' )
    var serviceId = req.param( 'serviceId' )
    var reason = req.param( 'reason' )
    res.json( { playerId: playerId, state: state, serviceId: serviceId, reason: reason } )
} )

router.get( '/v1/second-chance/players/self/profile', function ( req, res )
{
    var playerId = req.get( 'x-player-id' ) || '1234'
    var jackpotCaptain = playerId % 2
    var name = req.param( 'name', 'No Name' )
    var pro = new Profile( playerId, jackpotCaptain, name )
    res.json( { jackpot_captain: pro.jackpotCaptain } )
} )

router.get( '/v1/second-chance/players/self/profile', function ( req, res )
{
    var playerId = req.get( 'x-player-id' ) || '1234'
    var jackpotCaptain = playerId % 2
    var name = req.param( 'name', 'No Name' )
    var pro = new Profile( playerId, jackpotCaptain, name )
    res.json( { jackpot_captain: pro.jackpotCaptain } )
} )
router.put( '/v1/second-chance/players/self/profile', function ( req, res )
{
    var playerId = req.get( 'x-player-id' ) || '1234'
    var jackpotCaptain = req.param( 'jackpot_captain' )
    var pro = new Profile( playerId, jackpotCaptain, 'Jack Sparrow' )
    res.json( { jackpot_captain: pro.jackpotCaptain } )
} )

// REGISTER OUR ROUTES
app.use( '/api', router )

// START THE SERVER
app.listen( port )
console.log( 'Server listening on port ' + port )