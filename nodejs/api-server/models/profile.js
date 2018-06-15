'use strict'

module.exports = class Profile
{
    constructor( xPlayerId, jackpotCaptain, name )
    {
        this.playerId = xPlayerId
        this.jackpotCaptain = jackpotCaptain
        this.name = name
    }
}