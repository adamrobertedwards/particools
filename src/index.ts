import Particle from "@src/Particle"

const MAX_PARTICLES = 200

let particles: Particle[] = []
let canvas: HTMLCanvasElement | null

const createCanvas = () => {
    canvas = document.createElement('canvas')
    canvas.width = window.innerHeight
    canvas.height = window.innerHeight

    document.body.appendChild(canvas)
}

const update = () => {
    const context = canvas?.getContext('2d')
    if (!context || !canvas) return

    context.clearRect(0, 0, canvas.width, canvas.height)

    for (const piece of particles) {
        piece.update()
    }

    requestAnimationFrame(() => {
        update()
    })

    particles = particles.filter((particle: Particle) => particle.active)
}

const fire = () => {
    const context = canvas?.getContext('2d')

    if (!context || !canvas) return

    for (let i = 0; i <= MAX_PARTICLES; i++) {
        const p = new Particle({ canvas, repeat: false })
        particles.push(p)
    }

    update()
}

createCanvas()

export default {
    fire
}
