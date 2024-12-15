import java.util.List;

ParticleSystem ps;

void setup() {
  size(400, 400);
  noStroke();

  ps = new ParticleSystem(
    new PVector(random(0, 400), 400),
    3,
    color(random(200, 255), random(100, 255), random(200, 255))
  );
}

void draw() {
  background(0);

  PVector gravity = new PVector(0, 0.1);
  ps.applyForce(gravity);

  ps.update();
  ps.draw();
}

class Particle {
  PVector position, velocity, acceleration;
  color col;
  float size;

  Particle() {
    this.position = new PVector(random(0, 400), 400);
    this.velocity = new PVector(0, random(-8, -5));
    this.acceleration = new PVector(0.0, 0.0);
    this.col = color(random(100, 255), random(100, 255), random(100, 255));
    this.size = 10;
  }

  void applyForce(PVector f) {
    this.acceleration.add(f);
  }

  void update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  void draw() {
    fill(this.col);
    circle(this.position.x, this.position.y, this.size);
  }

  boolean isDeath() {
    return position.y > height;
  }
  float isFalling(){
    return velocity.y;
  }
}

class ParticleSystem {
  List<Particle> particles = new ArrayList<>();
  List<Explosion> explosions = new ArrayList<>();
  PVector position;
  int num;
  color col;

  ParticleSystem(PVector position, int num, color col) {
    this.position = position;
    this.num = num;
    this.col = col;
  }

  void applyForce(PVector f) {
    for (Particle p : particles) {
      p.applyForce(f);
    }
    for (Explosion e : explosions) {
      e.applyForce(f);
    }
  }

  void update() {
    if (particles.size() < num) {
      particles.add(new Particle());
    }

    for (Particle p : particles) {
      if (abs(p.velocity.y) < 0.05) {
        explosions.add(new Explosion(p.position, 10, p.col, 60));
      }
    }
    particles.removeIf(p -> abs(p.velocity.y) < 0.05);

    for (Particle p : particles) {
      p.update();
    }
    for (Explosion e : explosions) {
      e.update();
    }

    explosions.removeIf(e -> e.isOver());
  }

  void draw() {
    for (Particle p : particles) {
      p.draw();
    }
    for (Explosion e : explosions) {
      e.draw();
    }
  }
}

class EParticle {
  PVector position, velocity, acceleration;
  color col;
  float size, lifespan;

  EParticle(PVector position, color col) {
    this.position = position.copy();
    this.velocity = new PVector(randomGaussian() * 2, randomGaussian() * 2);
    this.acceleration = new PVector(0.0, 0.0);
    this.col = col;
    this.size = 5;
    this.lifespan = 100; // Mayor tiempo de vida
  }

  void applyForce(PVector f) {
    this.acceleration.add(f);
  }

  void update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan--;
  }

  void draw() {
    fill(this.col, map(lifespan, 0, 100, 0, 255));
    circle(this.position.x, this.position.y, this.size);
  }

  boolean isDeath() {
    return lifespan <= 0;
  }
}

class Explosion {
  List<EParticle> particles = new ArrayList<>();
  PVector position;
  int num;
  color col;
  float lifespan;

  Explosion(PVector position, int num, color col, float lifespan) {
    this.position = position.copy();
    this.num = num;
    this.col = col;
    this.lifespan = lifespan;

    // Crear partículas de la explosión al inicio
    for (int i = 0; i < num; i++) {
      particles.add(new EParticle(this.position, this.col));
    }
  }

  void applyForce(PVector f) {
    for (EParticle p : particles) {
      p.applyForce(f);
    }
  }

  void update() {
    for (EParticle p : particles) {
      p.update();
    }
    particles.removeIf(p -> p.isDeath());
    lifespan--;
  }

  void draw() {
    for (EParticle p : particles) {
      p.draw();
    }
  }

  boolean isOver() {
    return lifespan <= 0 && particles.isEmpty();
  }
}
