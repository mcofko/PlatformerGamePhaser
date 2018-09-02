module Castlevania {

    export class MainMenu extends Phaser.State {
        background: Phaser.Sprite;
        logo: Phaser.Sprite;
        wasLoaded: boolean = false;
        button_enter: Phaser.Button;
        button_left: Phaser.Button;
        button_right: Phaser.Button;
        cleopatra: AdvAnimator.AdvanceSpriteAnimator;
        lion: AdvAnimator.AdvanceSpriteAnimator;

        create() {
            // adding FPS and DrawCalls Counter
            this.game.plugins.add(Phaser.Plugin.AdvancedTiming);
            //adding extension methods
            Utils.PhaserUtils.AddBitmapFontByAtlasMethod();
            Utils.PhaserUtils.FindAtlasForTextureMethod();

            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;

            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);

            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);

            //this.input.onDown.addOnce(this.fadeOut, this);

            //add static image from atlas
            let image: Phaser.Sprite = this.add.sprite(10, 10, 'main', 'Wild_Cleopatra.png');
            image.scale.setTo(0.4, 0.4);

            //let image2: Phaser.Sprite = this.add.sprite(10, 10, 'main', '');
            //image2.scale.setTo(0.4, 0.4);


            // add animation from atlas
            //let cleopatra_anim: Phaser.Sprite = this.add.sprite(100, 100, 'cleo_anim_0');
            //cleopatra_anim.animations.add('play', Phaser.Animation.generateFrameNames('WILD_Cleopatra_', 0, 104, '.png', 4), 15, true);
            //cleopatra_anim.animations.play('play', 15, true);

            //add buttons
            this.button_enter = this.game.add.button(250, 400, 'main', this.fadeOut, this, 'btn_paytableOpened_CLOSE_hover.png', 'btn_paytableOpened_CLOSE_normal.png',
                'btn_paytableOpened_CLOSE_down.png', 'btn_paytableOpened_CLOSE_normal.png');
            this.button_enter.onInputOver.add(function () { console.log("I am over the button!"); }, this);

            
            //add fonts
            this.game.cache["addBitmapFontByAtlas"]('MyFont', 'main', 'panel_font1_big.png', this.game.cache.getXML('font_big'), 'xml', 0, 0);
            let text = this.add.bitmapText(500, 20, 'MyFont', 'Is It Working?!?', 30);

            //add custom image between text
            this.CreateCustomText();


            //advanced sprite animator
            this.cleopatra = new AdvAnimator.AdvanceSpriteAnimator(this.game, 50, 300, ['cleo_anim_0', 'cleo_anim_1'], 'WILD_Cleopatra_0031.png',
                Phaser.Animation.generateFrameNames('WILD_Cleopatra_', 0, 104, '.png', 4), 20, true);
            //advanced sprite animator
            this.lion = new AdvAnimator.AdvanceSpriteAnimator(this.game, 250, 180, ['lion_anim_0', 'lion_anim_1', 'lion_anim_2', 'lion_anim_3', 'lion_anim_4', 'lion_anim_5'],
                'Wild_Lion_000.png', Phaser.Animation.generateFrameNames('Wild_Lion_', 0, 89, '.png', 3), 20, true);
        }

        fadeOut() {
            console.log("Fade Out!");
            this.button_enter.inputEnabled = false;

            this.add.tween(this.background).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        }

        startGame() {
            this.game.state.start('Level2', true, false);
        }

        CreateCustomText(): void {
            let font: Phaser.BitmapFont = this.cache.getBitmapFont('MyFont');
            let fontData: Phaser.BMFont = font.font;
            let charA: Phaser.BMFontChar = fontData.chars[65];

            let f: Phaser.Frame = this.cache.getFrameByName('main', 'gem_green_small.png');
            //this.game.cache.getBaseTexture('main')

            fontData.chars[5000] = {
                x: f.x,
                y: f.y,
                width: f.width,
                height: f.height,
                xOffset: 1,
                yOffset: charA.yOffset + Math.floor((charA.height - f.height) / 2),
                xAdvance: f.width + 2,
                kerning: [],
                texture: new PIXI.Texture(font.base, new PIXI.Rectangle(f.x, f.y, f.width, f.height))
            };

            let text: string = "Hi, " + String.fromCharCode(5000) + " there!";
            let bmText = new Phaser.BitmapText(this.game, 500, 60, "MyFont", text, 30);
            bmText.anchor.x = 0.5;
            this.world.add(bmText);
        }
    }

}