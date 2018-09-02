module Castlevania {

    export class Level1 extends Phaser.State {
        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: Castlevania.Player;
        platforms: Phaser.Group;
        star: Phaser.Sprite;
        bomb: Castlevania.Bomb;
        bombs: Array<Castlevania.Bomb>;
        scoreCounter: Castlevania.ScoreCounter;

        create(): void {
            this.background = this.add.sprite(0, 0, 'level1');
            this.music = this.add.audio('music', 1, false);
            //this.music.play();

            this.player = new Player(this.game, 130, 284);

            this.platforms = this.game.add.group();

            let platform = new Platform(this.game, this.game.world.centerX, 400, 2, 1);
            platform.visible = false;
            this.platforms.add(platform);
            this.game.physics.arcade.collide(this.player, this.platforms);


            this.spawnStar();

            this.bombs = new Array<Castlevania.Bomb>();
            this.game.time.events.add(600, this.spawnBomb, this);

            this.scoreCounter = new ScoreCounter(this.game);

            this.game.camera.flash(0xff0, 1000);
        }

        update(): void {
            this.game.physics.arcade.collide(this.player, this.platforms);

            this.game.physics.arcade.overlap(this.player, this.star, this.endGame, null, this);

            
        }

        endGame(player, star): void {
            this.star.kill();

            this.game.time.events.add(1000, this.spawnStar, this);
            //this.state.start('MainMenu', true, false);

            let value: number = Phaser.Math.random(10, 50);

            GameEvents.UPDATE_SCORE.dispatch({ score: value });
        }

        spawnStar(): void {
            let x: number = Phaser.Math.random(0, this.game.world.width);
            this.star = this.add.sprite(x, 295, 'star');
            this.game.physics.arcade.enable(this.star);
            this.star.body.immovable = true;
        }

        spawnBomb(): void {
            let x: number = Phaser.Math.random(0, this.game.world.width);
            let y: number = Phaser.Math.random(0, this.game.world.height);

            let bomb: Castlevania.Bomb = new Bomb(this.game, x, y, 2, 2);
            this.bombs.push(bomb);

            //this.game.time.events.add(1200, this.spawnBomb, this);
        }
    }

}