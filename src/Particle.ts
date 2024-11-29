import { hexToRGBA, randomValueBetweenRangeWithBias } from "./utils"

const VELOCITY_Y_START = 8
const VELOCITY_Y_MAX = 7.5
const VELOCITY_Y_MIN = 3.25
const VELOCITY_Y_BIAS = 1.3
const VELOCITY_Y_RATE = 0.1

const ROTATION_AMOUNT_MAX = 4
const ROTATION_AMOUNT_MIN = 1.5
const FADE_RATE = 0.0085
const FADE_BIAS = 0.85

type IParticleOptions = {
    canvas: HTMLCanvasElement
    height?: number
    width?: number
    colours?: string[]
    repeat?: boolean
}

class Particle {
    canvas: HTMLCanvasElement
    x: number
    y: number
    height: number
    width: number
    colour: string
    opacity: number
    rotation: number
    velocityX: number
    velocityY: number
    velocityYTarget: number
    repeat: boolean
    active: boolean
    fading: boolean

    constructor(
        {
            canvas,
            width = 16,
            height = 8,
            colours = ['#FF5733', '#33FF57', '#3357FF', '#FF33FF', '#FFFF33'],
            repeat = false,
        }: IParticleOptions
    ) {
            this.canvas = canvas
            this.x = Math.random() * canvas.width,
            this.y = Math.random() * -canvas.height / 2,
            this.width = width
            this.height = height
            this.colour = colours[Math.floor(Math.random() * colours.length)]
            this.opacity = 1
            this.rotation = Math.random() * 360
            this.velocityX = (Math.random() - 0.5) * 1
            this.velocityY = VELOCITY_Y_START
            this.velocityYTarget = randomValueBetweenRangeWithBias(VELOCITY_Y_MIN, VELOCITY_Y_MAX, VELOCITY_Y_BIAS)
            this.repeat = repeat
            this.active = true
            this.fading = false
    }

    get context() {
        return this.canvas?.getContext('2d')
    }

    get widthOffset() {
        return this.width / 2
    }

    get heightOffset() {
        return this.height / 2
    }

    get isOffScreen() {
        return (this.y - this.heightOffset) > this.canvas.height || (this.x + this.widthOffset) < 0 || (this.x - this.widthOffset) > this.canvas.width 
    }

    draw() {
        if (!this.context) return

        if (this.fading) {
            this.opacity -= FADE_RATE
        }

        // Only apply the translation and rotation changes to this confetti piece
        this.context.save()
        this.context.translate(this.x, this.y)
        this.context.rotate(this.rotation * Math.PI / 180)
        this.context.fillStyle = hexToRGBA(this.colour, this.opacity)
        this.context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
        this.context.restore()
    }

    update() {
        if (!this.context) return

        randomValueBetweenRangeWithBias(VELOCITY_Y_MIN, VELOCITY_Y_MAX, VELOCITY_Y_BIAS)

        if (this.velocityY > this.velocityYTarget) {
            this.velocityY -= VELOCITY_Y_RATE
        }

        this.x += this.velocityX
        this.y += this.velocityY 
        this.rotation += randomValueBetweenRangeWithBias(ROTATION_AMOUNT_MIN, ROTATION_AMOUNT_MAX)

        // The confetti piece has gone off the screen
        if (this.isOffScreen || this.opacity <= 0) {
            if (this.repeat) {
                this.y = 0
                this.x = Math.random() * this.canvas?.width
                this.opacity = 1
                return
            }

            this.active = false
        }

        // Check if the particle is over a third of the screen down and roll the dice to see if it should fade 
        if (this.y >= (this.canvas.height / 3) && randomValueBetweenRangeWithBias(0, 1) >= FADE_BIAS) {
            this.fading = true
        }

        this.draw()
    }
}

export default Particle
