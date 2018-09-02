module Castlevania {

    export class Platform extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, scaleX: number, scaleY: number) {
            super(game, x, y, 'platform');

            this.scale.x = scaleX;
            this.scale.y = scaleY;
            this.anchor.setTo(0.5, 0.5);
            this.game.add.existing(this);
            this.game.physics.arcade.enable(this);

            this.body.immovable = true;
        }


    }

}