module Castlevania {

    export class Player extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'simon', 0);
            this.anchor.setTo(0.5, 0);
            this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            //the sprite is added to the game world 
            this.game.add.existing(this);
            //enable physics body
            this.game.physics.arcade.enable(this);

            this.body.collideWorldBounds = true;
            this.body.gravity.y = 250;
        }

        create() {

        }

        update() {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play('walk');

                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play('walk');

                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            } else {
                this.animations.frame = 0;
            }

            //jump
            if (this.body.velocity.y == 0 && this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y = -200;
            }
        }
    }

}