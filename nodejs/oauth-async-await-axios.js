const axios = require( process.env.USERPROFILE + '/AppData/Roaming/npm/node_modules/axios' )
const lib1 = require( process.env.USERPROFILE + "/Documents/bin/lib1.js" )

const clientId = 'SolSet2ndChancePortal'
var creds = { USERNAME: 'test50@yopmail.com', PASSWORD: 'Password123' }
var token = await = getLoginToken( 'cadev1', 35, clientId, creds )
console.log( token )

async function getLoginToken( host, siteId, clientId, credentials )
{
    var oauthLoginRequest =
        {
            siteId: siteId,
            clientId: clientId,
            resourceOwnerCredentials: credentials
        }
    var oauthAxiosInstance = createAxiosInstance( host )
    var resultPromise = await oauthAxiosInstance.post( '/api/v1/oauth/login', oauthLoginRequest )
    var oauthTokenRequest =
        {
            authCode: resultPromise.data[0].authCode,
            clientId: clientId,
            siteId: siteId
        }

    resultPromise = oauthAxiosInstance.post( '/api/v1/oauth/self/tokens', oauthTokenRequest )
    //console.log(resultPromise.data[1])

    return ( resultPromise )
}

function getCoffee()
{
    return new Promise( resolve =>
    {
        setTimeout( () => resolve( '☕' ), 2000 ); // it takes 2 seconds to make coffee
    } );
}

/*
*   add numbers a, b return a promise with the sum
*/
function promiseAddition( a, b )
{
    return new Promise( resolve =>
    {
        setTimeout( () => resolve( a + b ), 0 )
    }
    )
}

function createAxiosInstance( host )
{
    var proto = 'https'

    if ( host.match( /dev/ ) )
    {
        proto = 'http'
    }

    return axios.create(
        {
            baseURL: proto + '://' + host,
            headers: lib1.commonHeaders
        }
    )
}

