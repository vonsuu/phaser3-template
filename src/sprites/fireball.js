export default class Fireball extends Phaser.GameObjects.Sprite {
  constructor(config) 
  { 
    super(config.scene, config.x, config.y,'atlas', 'fireball');
    config.scene.physics.world.enable(this);
    this.scene = config.scene;
    this.direction = config.direction;
    this.damage = 1;
    this.sound = this.scene.sound.add('fireballSFX');
    this.sound.setVolume(.2);
    this.sound.play();
    this.wallSound = this.scene.sound.add('fireballWallSFX');
    this.wallSound.setVolume(.2);
    this.enemySound = this.scene.sound.add('fireballEnemySFX');
    this.enemySound.setVolume(.2);
    this.scene.add.existing(this);
    this.moveFireball();
    this.particles = this.scene.add.particles('atlas', 'whiteParticle');
    this.emitter = this.particles.createEmitter();
    this.emitter.setPosition(this.x, this.y);
    this.emitter.setSpeed(16);
    this.emitter.setBlendMode(Phaser.BlendModes.ADD);
  }

  moveFireball() {
    if (this.direction === 0) {
      this.scene.physics.moveTo(this, this.x, 10);
    } else if (this.direction === 1) {
      this.scene.physics.moveTo(this, this.x + 10, this.y - 10);
    } else if (this.direction === 2) {
      this.scene.physics.moveTo(this, this.x + 10, this.y);
    } else if (this.direction === 3) {
      this.scene.physics.moveTo(this, this.x + 10, this.y + 10);
    } else if (this.direction === 4) {
      this.scene.physics.moveTo(this, this.x, -10);
    } else if (this.direction === 5) {
      this.scene.physics.moveTo(this, this.x - 10, this.y + 10);
    } else if (this.direction === 6) {
      this.scene.physics.moveTo(this, this.x - 10, this.y);
    } else if (this.direction === 7) {
      this.scene.physics.moveTo(this, this.x - 10, this.y - 10);
    }
  }

  update(time, delta) 
  {
    this.emitter.setPosition(this.x, this.y);
  }

  wallCollide () 
  {
    this.emitter.explode( 64, this.x, this.y );
    this.wallSound.play();
    this.destroy();
  }

  fireballCollide () 
  {
    this.emitter.explode( 64, this.x, this.y );
    this.wallSound.play();
    this.destroy();
  }

  enemyCollide (enemy) 
  {
    this.emitter.explode( 32, this.x, this.y );
    this.enemySound.play();
    enemy.damage(this.damage);
    this.destroy();
  }
  
}