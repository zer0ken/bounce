export class Ball {
    constructor(stageWidth, stageHeight, radius, speed) {
        this.radius = radius
        this.vx = speed
        this.vy = speed

        const diameter = this.radius * 2
        this.x = diameter + (Math.random() * stageWidth - diameter)
        this.y = diameter + (Math.random() * stageHeight - diameter)
    }

    draw(ctx, stageWidth, stageHeight, block) {
        this.x += this.vx
        this.y += this.vy

        this.bounceWindow(stageWidth, stageHeight)
        this.bounceBlock(block)

        ctx.fillStyle = '#fdd700'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        ctx.fill()
    }

    bounceWindow(stageWidth, stageHeight) {
        const minX = this.radius
        const maxX = stageWidth - this.radius
        const minY = this.radius
        const maxY = stageHeight - this.radius

        if (this.x <= minX || this.x >= maxX) {
            this.vx *= -1
            this.x += this.vx
        } else if (this.y <= minY || this.y >= maxY) {
            this.vy *= -1
            this.y += this.vy
        }
    }

    bounceBlock(block) {
        const minX = block.x - this.radius
        const maxX = block.maxX + this.radius
        const minY = block.y - this.radius
        const maxY = block.maxY + this.radius

        if (this.x >= minX && this.x <= maxX
            && this.y >= minY && this.y <= maxY) {
            const distMinX = Math.abs(minX - this.x)
            const distMaxX = Math.abs(maxX - this.x)
            const distMinY = Math.abs(minY - this.y)
            const distMaxY = Math.abs(maxY - this.y)

            const minDistX = distMinX < distMaxX ? distMinX : distMaxX
            const minDistY = distMinY < distMaxY ? distMinY : distMaxY


            if (minDistX <= minDistY) {
                this.vx *= -1
                this.x += this.vx
            } else {
                this.vy *= -1
                this.y += this.vy
            }
        }
    }
}