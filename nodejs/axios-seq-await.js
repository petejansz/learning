// 🔥 Node 7.6 has async/await! Here is a quick run down on how async/await works

const axios = require( process.env.USERPROFILE + '/AppData/Roaming/npm/node_modules/axios' )

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
async function go()
{
    try
    {
        const wes = await axios( 'https://api.github.com/users/wesbos' )

        var users = []
        users.push( await axios( 'https://randomuser.me/api/' ) )
        users.push( await axios( 'https://randomuser.me/api/' ) )
        users.push( await axios( 'https://randomuser.me/api/' ) )

        for ( var i = 0; i < users.length; i++ )
        {
            console.log( users[i].data.results[0].email )
        }

        // many requests should be concurrent - don't slow things down!
        // fire off three requests and save their promises
        const userPromise = axios( 'https://randomuser.me/api/' )
        const namePromise = axios( 'https://uinames.com/api/' )
        // await all three promises to come back and destructure the result into their own variables
        const [user, name] = await Promise.all( [userPromise, namePromise] )
        // console.log( user.data, name.data ); // cool, {...}, {....}
    }
    catch ( e )
    {
        console.error( e ); // 💩
    }
}

go();