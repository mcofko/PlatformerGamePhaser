module Castlevania {
    export class ScoreCounter extends Phaser.Text {
        score: number;

        constructor(game: Phaser.Game) {
            super(game, 10, 10, 'My score: 0', { fontSize: 20, fill: '#fff' });

            this.game.add.existing(this);

            this.registerToEvents();
        }

        registerToEvents() {
            this.score = 40;
            this.updateScore();

            GameEvents.UPDATE_SCORE.add(this.updateScore, this, 0);
        }

        update() {

        }

        updateScore() {
            if (arguments.length > 0) {
                this.score += arguments[0].score as number;
            }

            this.text = "My Score: " + this.score;
        }
    }
}