﻿//class SimpleGame {
//    constructor() {
//        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
//    }

//    game: Phaser.Game;

//    preload() {
//        this.game.load.image('logo', 'assets/phaser3-logo.png');
//    }

//    create() {
//        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
//        logo.anchor.setTo(0.5, 0.5);
//        logo.scale.setTo(0.2, 0.2);

//        this.game.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
//        //logo.anchor = Phaser.Point.set(logo, 0.5, 0.5);
//    }

//}

window.onload = () => {
    var game = new Castlevania.Game();
};