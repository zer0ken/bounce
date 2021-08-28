import {
    Ball
} from './ball.js'

import {
    Block
} from './block.js'

class App {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.pixelRatio = document.pixelRatio > 1 ? 2 : 1

        document.body.appendChild(this.canvas)

        window.addEventListener('resize', this.resize.bind(this), false)
        this.resize()

        this.block = new Block(this.stageWidth / 3, 40, this.stageWidth / 4, this.stageHeight * 3 / 10)
        this.ball = new Ball(this.stageWidth, this.stageHeight, 40, 8)

        window.requestAnimationFrame(this.animate.bind(this))
    }

    resize() {
        this.stageWidth = document.body.clientWidth
        this.stageHeight = document.body.clientHeight

        this.canvas.width = this.stageWidth * this.pixelRatio
        this.canvas.height = this.stageHeight * this.pixelRatio
        this.ctx.scale(this.pixelRatio, this.pixelRatio)

        this.block = new Block(this.stageWidth / 3, 40, this.stageWidth / 4, this.stageHeight * 3 / 10)
    }

    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this))

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

        this.block.draw(this.ctx)
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block)
    }
}

window.onload = () => {
    new App()
}