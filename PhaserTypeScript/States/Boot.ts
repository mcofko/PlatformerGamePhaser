module Castlevania {

    export class Boot extends Phaser.State {
        preload() {
            this.load.image('preloadBar', 'assets/loader.png');
        }

        create() {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = false;

            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            if (this.game.device.desktop) {
                // if you have any desktop specific settings, they can go in here
            } else {
                // same goes for mobile settings
                //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
                
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.minWidth = 480;
                this.game.scale.minHeight = 260;
                this.game.scale.maxWidth = 1024;
                this.game.scale.maxHeight = 768;
                this.game.scale.forceLandscape = true;
                this.game.scale.pageAlignHorizontally = true;
                //this.game.scale.setScreenSize(true);
                
            }

            this.game.state.start('Preloader', true, false);
        }
    }

}