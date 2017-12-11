'use strict'

module.exports = class Shape
{
    constructor()
    {
        this.name = 'Shape'

        if ( this.constructor === Shape )
        {
            throw new TypeError( 'Can not construct abstract class.' )
        }

        if ( this.area === Shape.prototype.area )
        {
            // Child class must implement this abstract method.
            throw new TypeError( "Please implement abstract method area." )
        }
    }

    getName() { return this.name }
    setName( value ) { this.name = value }

    area()
    {
        throw new TypeError( "Do not call abstract method area from child." )
    }

    perimeter()
    {
        throw new TypeError( "Do not call abstract method perimeter from child." )
    }
}
