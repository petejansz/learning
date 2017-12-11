'use strict'

const Shape = require( './shape' )

module.exports = class Rectangle extends Shape
{
    constructor( height, width )
    {
        super()
        this.name = 'Rectangle'

        this.height = height
        this.width = width
    }

    area() { return this.height * this.width }
    perimeter() { return ( 2 * this.height ) + ( 2 * this.width ) }

    getHeight() { return this.height }
    setHeight( value ) { this.height = value }

    getWidth() { return this.width }
    setWidth( value ) { this.width = value }

    toString()
    {
        return JSON.stringify( ( super.valueOf() ) )
    }
}

