import Particle from "@src/Particle"

const MAX_PARTICLES = 300

enum AnimationType {
    SHOWER = 'shower',
}

let particles: Particle[] = []
let canvas: HTMLCanvasElement | null
let animationType = AnimationType.SHOWER

const resizeCanvas = () => {
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

const createCanvas = () => {
    canvas = document.createElement('canvas')
    resizeCanvas()

    document.body.appendChild(canvas)

    window.addEventListener('resize', resizeCanvas, false)
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

const fire = (type: AnimationType) => {
    const context = canvas?.getContext('2d')

    animationType = type

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
