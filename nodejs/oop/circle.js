'use strict'

const Shape = require( './shape' )

module.exports = class Circle extends Shape
{
    constructor( radius )
    {
        super()
        this.name = 'Circle'
        this.radius = radius
    }

    static pi() { return Math.PI }
    static circumference( radius ) { return 2 * Circle.pi() * radius }
    area() { return Math.PI * this.radius * this.radius }
    perimeter() { return Circle.circumference( this.radius ) }

    toString()
    {
        return JSON.stringify( ( super.valueOf() ) )
    }
}