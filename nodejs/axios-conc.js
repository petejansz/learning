/*
    Axios concurrent REST calls, wait for all responses, promises
*/

const axios = require( process.env.USERPROFILE + '/AppData/Roaming/npm/node_modules/axios' )
var str_to_stream = require( process.env.USERPROFILE + '/AppData/Roaming/npm/node_modules/string-to-stream' )
const lib1 = require( process.env.USERPROFILE + "/Documents/bin/lib1.js" )

var host = 'cadev1'
var oauthToken = lib1.getOAuthToken( host, 'test5@yopmail.com', 'RegTest6100' )
var axiosCadev1Players = createAxiosInstance( host, oauthToken )

function createAxiosInstance( host, oauthToken )
{
    var proto = host.match( /dev/i ) ? 'http' : 'https'

    return axios.create( {
        baseURL: proto + '://' + host + '/api/v1/players/self',
        headers: { 'X-EX-SYSTEM-ID': '8', 'X-CHANNEL-ID': '2', 'X-SITE-ID': '35', "Authorization": "OAuth " + oauthToken }
    } )
}

function getAttributes()
{
    return axiosCadev1Players.get( '/attributes' )
}

function getCommunicationPreferences()
{
    return axiosCadev1Players.get( '/communication-preferences' )
}

function getNotifications()
{
    return axiosCadev1Players.get( '/notifications' )
}

function getNotificationPreferences()
{
    return axiosCadev1Players.get( '/notifications-preferences' )
}

function getProfile()
{
    return axiosCadev1Players.get( '/profile' )
}

function getPersonalInfo()
{
    return axiosCadev1Players.get( '/personal-info' )
}

var output = {}

axios.all( [getAttributes(), getCommunicationPreferences(), getNotifications(), getNotificationPreferences(), getProfile(), getPersonalInfo()] )
    .then( axios.spread( function ( attribs, communicationPreferences, notifications, notifPreferences, profile, persInfo )
    {
        output.attributes = attribs.data
        output.communicationPreferences = communicationPreferences.data
        output.notifications = notifications.data
        output.notifPreferences = notifPreferences.data
        output.profile = profile.data
        output.personalInfo = persInfo.data

        console.log( JSON.stringify( output ) )
    } ) )