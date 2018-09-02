module Castlevania {

    export class Preloader extends Phaser.State {
        preloadBar: Phaser.Sprite;

        preload() {

            //set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //load fonts
            this.load.xml('font_big', 'assets/fonts/panel_font1_big.xml')

            // load our actual game assets
            this.load.image('titlepage', 'assets/titlepage.jpg');
            this.load.image('logo', 'assets/logo.png');
            this.load.image('level1', 'assets/level1.png');
            this.load.image('platform', 'assets/platform.png');
            this.load.image('star', 'assets/star.png');
            this.load.image('bomb', 'assets/bomb.png');
            this.load.audio('music', 'assets/title.mp3', true);
            this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);

            //load atlas
            this.load.atlas('main', 'assets/atlas/cleopatra_assets.png', 'assets/atlas/cleopatra_assets.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
            // cleopatra
            this.load.atlas('cleo_anim_0', 'assets/atlas/cleopatra_anim-0.png', 'assets/atlas/cleopatra_anim-0.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
            this.load.atlas('cleo_anim_1', 'assets/atlas/cleopatra_anim-1.png', 'assets/atlas/cleopatra_anim-1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

            this.load.atlas('lion_anim_0', 'assets/atlas/lion_anim-0.png', 'assets/atlas/lion_anim-0.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
            this.load.atlas('lion_anim_1', 'assets/atlas/lion_anim-1.png', 'assets/atlas/lion_anim-1.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
            this.load.atlas('lion_anim_2', 'assets/atlas/lion_anim-2.png', 'assets/atlas/lion_anim-2.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
            this.load.atlas('lion_anim_3', 'assets/atlas/lion_anim-3.png', 'assets/atlas/lion_anim-3.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
            this.load.atlas('lion_anim_4', 'assets/atlas/lion_anim-4.png', 'assets/atlas/lion_anim-4.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
            this.load.atlas('lion_anim_5', 'assets/atlas/lion_anim-5.png', 'assets/atlas/lion_anim-5.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

            //load fonts
            //this.load.xml('font_big', 'assets/fonts/panel_font1_big.xml');

            //this.RegisterExtensions();
        }

        create() {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }

        startMainMenu() {
            this.game.state.start('MainMenu', true, false);
        }

        RegisterExtensions(): void {
            Utils.PhaserUtils.AddBitmapFontByAtlasMethod();
            Utils.PhaserUtils.FindAtlasForTextureMethod();
        }
    }

}