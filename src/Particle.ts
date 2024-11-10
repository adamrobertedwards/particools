const VELOCITY_Y_MAX = 7

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
    rotation: number
    velocityX: number
    velocityY: number
    repeat: boolean
    active: boolean

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
            this.y = Math.random() * -canvas.height / 4,
            this.width = width
            this.height = height
            this.colour = colours[Math.floor(Math.random() * colours.length)]
            this.rotation = Math.random() * 360
            this.velocityX = (Math.random() - 0.5) * 1
            this.velocityY = Math.random() * VELOCITY_Y_MAX
            this.repeat = repeat
            this.active = true
    }

    get context() {
        return this.canvas?.getContext('2d')
    }

    get isOffScreen() {
        const positionX = this.x + (this.width / 2) 
        const positionY = this.y + (this.height / 2)
        return positionY > this.canvas.height || positionX < 0 || positionX > this.canvas.width 
    }

    draw() {
        if (!this.context) return

        // Only apply the translation and rotation changes to this confetti piece
        this.context.save()
        this.context.translate(this.x, this.y)
        this.context.rotate(this.rotation * Math.PI / 180)
        this.context.fillStyle = this.colour
        this.context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
        this.context.restore()
    }

    update() {
        if (!this.context) return

        this.x += this.velocityX
        this.y += this.velocityY
        this.rotation += 1.5

        // The confetti piece has gone off the screen
        if (this.isOffScreen) {
            if (this.repeat) {
                this.y = 0
                this.x = Math.random() * this.canvas?.width
                return
            }

            this.active = false
        }

        this.draw()
    }
}

export default Particle
