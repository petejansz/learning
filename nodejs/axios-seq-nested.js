/*
    Axios nested, sequential REST calls, each depending upon the outer/prior call
*/

const axios = require( process.env.USERPROFILE + '/AppData/Roaming/npm/node_modules/axios' )
const lib1 = require( process.env.USERPROFILE + "/Documents/bin/lib1.js" )

var host = 'cadev1'
var oauthToken = lib1.getOAuthToken( host, 'test5@yopmail.com', 'RegTest6100' )
var axiosCadev1Players = createAxiosInstance( host, oauthToken )
f1()

function createAxiosInstance( host, oauthToken )
{
    var proto = host.match( /dev/i ) ? 'http' : 'https'

    return axios.create( {
        baseURL: proto + '://' + host + '/api/v1/players/self',
        headers: { 'X-EX-SYSTEM-ID': '8', 'X-CHANNEL-ID': '2', 'X-SITE-ID': '35', "Authorization": "OAuth " + oauthToken }
    } )
}

function f1()
{
    var output = {}

    axiosCadev1Players.get( '/attributes' ).then( function ( response )
    {
        output.attributes = response.data

        axiosCadev1Players.get( '/profile' ).then( function ( response )
        {   // Depends on prior REST response...
            output.profile = response.data

            axiosCadev1Players.get( '/personal-info' ).then( function ( response )
            {   // Depends on prior REST API results...
                output.personalInfo = response.data

                console.log( JSON.stringify( output ) )

            } ).catch( function ( err ) { console.error( err.toString() ) } )
        } ).catch( function ( err ) { console.error( err.toString() ) } )
    } ).catch( function ( err ) { console.error( err.toString() ) } )
}