/*
http://nodesource.com/blog/understanding-object-streams/
Demonstrate how, in a stream of parsed-tokens, pipe through one stream to build an object, pipe to
another stream for additional processing
*/

var fs = require( 'fs' )
var util = require( 'util' )
var csvParse = require( process.env.USERPROFILE + '/AppData/Roaming/npm/node_modules/csv-parse' )
var through2 = require( process.env.USERPROFILE + '/AppData/Roaming/npm/node_modules/through2' )
var split2 = require( process.env.USERPROFILE + '/AppData/Roaming/npm/node_modules/split2' )

fs.createReadStream( process.env.USERPROFILE + '/Documents/pd/california/prod/exception-2ndchance-status-last_updated.csv' )
    .pipe( csvParse( { auto_parse: true } ) )
    .pipe( buildPlayerObject() )
    .pipe( convertEmailVerifiedToBoolean() )
    .pipe( formatDate() )
    .on( 'data', function ( record )
    {
        const indentSpaceCount = 4
        console.log( JSON.stringify( record, null, indentSpaceCount ) )
    } )

function buildPlayerObject()
{
    return through2.obj( function ( chunk, encoding, callback )
    {
        this.push( {
            playerId: chunk[0],
            emailVerified: chunk[1],
            lastUpdated: chunk[2],
            emailUsername: chunk[5]
        } )

        callback()
    } )
}

function formatDate()
{
    return through2.obj( function ( chunk, encoding, callback )
    {
        var player = chunk
        var dt = new Date( player.lastUpdated )
        player.lastUpdated = dt.toDateString()
        this.push( player )

        callback()
    } )
}

function convertEmailVerifiedToBoolean()
{
    return through2.obj( function ( chunk, encoding, callback )
    {
        var player = chunk
        player.emailVerified = player.emailVerified === 1 ? true : false
        this.push( player )

        callback()
    } )
}