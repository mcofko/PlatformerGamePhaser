module Castlevania {

    export class Bomb extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, scaleX: number, scaleY: number) {
            super(game, x, y, 'bomb');

            this.scale.x = scaleX;
            this.scale.y = scaleY;
            this.anchor.setTo(0.5, 0.5);
            this.game.add.existing(this);
            this.game.physics.arcade.enable(this);

            this.body.immovable = true;

            this.registerToEvents();
        }

        registerToEvents() {
            GameEvents.UPDATE_SCORE.add(this.resizeBombs, this, 0);
        }

        resizeBombs() {
            this.scale = new Phaser.Point(0.8, 0.8);
        }

    }

}