// Sketch p5.js para visualização interativa

let p5Instance;
let particles = [];
let attractors = [];

function sketch(p) {
    p.setup = function() {
        const container = document.getElementById('p5-container');
        if (container) {
            const width = container.clientWidth;
            const height = 300;
            let canvas = p.createCanvas(width, height);
            canvas.parent('p5-container');

            // Inicializar partículas
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(p, p.random(width), p.random(height)));
            }

            // Inicializar atratores
            attractors.push(new Attractor(p, width / 2, height / 2));
        }
    };

    p.draw = function() {
        p.background(255, 10);
        p.noStroke();

        // Desenhar atratores
        attractors.forEach(attractor => {
            attractor.display(p);
        });

        // Atualizar e desenhar partículas
        particles.forEach(particle => {
            // Aplicar força dos atratores
            attractors.forEach(attractor => {
                let force = attractor.attract(particle);
                particle.applyForce(force);
            });

            particle.update();
            particle.display(p);
        });
    };

    p.windowResized = function() {
        const container = document.getElementById('p5-container');
        if (container && p.parent() === container) {
            const width = container.clientWidth;
            p.resizeCanvas(width, 300);
        }
    };

    p.mouseMoved = function() {
        // Atualizar posição do atrator para a posição do mouse
        if (attractors.length > 0) {
            attractors[0].x = p.mouseX;
            attractors[0].y = p.mouseY;
        }
    };
}

class Particle {
    constructor(p, x, y) {
        this.p = p;
        this.position = p.createVector(x, y);
        this.velocity = p.createVector(0, 0);
        this.acceleration = p.createVector(0, 0);
        this.mass = p.random(0.5, 2);
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(2);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        // Bounce nas bordas
        if (this.position.x < 0 || this.position.x > this.p.width) {
            this.velocity.x *= -1;
            this.position.x = this.p.constrain(this.position.x, 0, this.p.width);
        }
        if (this.position.y < 0 || this.position.y > this.p.height) {
            this.velocity.y *= -1;
            this.position.y = this.p.constrain(this.position.y, 0, this.p.height);
        }
    }

    display(p) {
        p.fill(102, 126, 234, 200);
        p.ellipse(this.position.x, this.position.y, 5);
    }
}

class Attractor {
    constructor(p, x, y) {
        this.p = p;
        this.x = x;
        this.y = y;
        this.mass = 20;
    }

    attract(particle) {
        let force = p5.Vector.sub(
            this.p.createVector(this.x, this.y),
            particle.position
        );
        let distance = force.mag();
        distance = this.p.constrain(distance, 5, 25);

        let strength = (this.p.G * this.mass * particle.mass) / (distance * distance);
        force.setMag(strength);

        return force;
    }

    display(p) {
        p.fill(240, 147, 251, 150);
        p.ellipse(this.x, this.y, 20);
        p.noFill();
        p.stroke(240, 147, 251);
        p.strokeWeight(2);
        p.circle(this.x, this.y, 40);
    }
}

// Constante gravitacional
p5.prototype.G = 1;

// Inicializar sketch quando o documento estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        p5Instance = new p5(sketch);
    });
} else {
    p5Instance = new p5(sketch);
}