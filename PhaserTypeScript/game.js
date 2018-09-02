//class SimpleGame {
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
window.onload = function () {
    var game = new Castlevania.Game();
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Castlevania;
(function (Castlevania) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 800, 600, Phaser.AUTO, 'content', null) || this;
            _this.state.add('Boot', Castlevania.Boot, false);
            _this.state.add('Preloader', Castlevania.Preloader, false);
            _this.state.add('MainMenu', Castlevania.MainMenu, false);
            _this.state.add('Level1', Castlevania.Level1, false);
            _this.state.add('Level2', Castlevania.Level2, false);
            _this.state.start('Boot');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    Castlevania.Game = Game;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Bomb = /** @class */ (function (_super) {
        __extends(Bomb, _super);
        function Bomb(game, x, y, scaleX, scaleY) {
            var _this = _super.call(this, game, x, y, 'bomb') || this;
            _this.scale.x = scaleX;
            _this.scale.y = scaleY;
            _this.anchor.setTo(0.5, 0.5);
            _this.game.add.existing(_this);
            _this.game.physics.arcade.enable(_this);
            _this.body.immovable = true;
            _this.registerToEvents();
            return _this;
        }
        Bomb.prototype.registerToEvents = function () {
            Castlevania.GameEvents.UPDATE_SCORE.add(this.resizeBombs, this, 0);
        };
        Bomb.prototype.resizeBombs = function () {
            this.scale = new Phaser.Point(0.8, 0.8);
        };
        return Bomb;
    }(Phaser.Sprite));
    Castlevania.Bomb = Bomb;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Platform = /** @class */ (function (_super) {
        __extends(Platform, _super);
        function Platform(game, x, y, scaleX, scaleY) {
            var _this = _super.call(this, game, x, y, 'platform') || this;
            _this.scale.x = scaleX;
            _this.scale.y = scaleY;
            _this.anchor.setTo(0.5, 0.5);
            _this.game.add.existing(_this);
            _this.game.physics.arcade.enable(_this);
            _this.body.immovable = true;
            return _this;
        }
        return Platform;
    }(Phaser.Sprite));
    Castlevania.Platform = Platform;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            var _this = _super.call(this, game, x, y, 'simon', 0) || this;
            _this.anchor.setTo(0.5, 0);
            _this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            //the sprite is added to the game world 
            _this.game.add.existing(_this);
            //enable physics body
            _this.game.physics.arcade.enable(_this);
            _this.body.collideWorldBounds = true;
            _this.body.gravity.y = 250;
            return _this;
        }
        Player.prototype.create = function () {
        };
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play('walk');
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play('walk');
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
            else {
                this.animations.frame = 0;
            }
            //jump
            if (this.body.velocity.y == 0 && this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y = -200;
            }
        };
        return Player;
    }(Phaser.Sprite));
    Castlevania.Player = Player;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var ScoreCounter = /** @class */ (function (_super) {
        __extends(ScoreCounter, _super);
        function ScoreCounter(game) {
            var _this = _super.call(this, game, 10, 10, 'My score: 0', { fontSize: 20, fill: '#fff' }) || this;
            _this.game.add.existing(_this);
            _this.registerToEvents();
            return _this;
        }
        ScoreCounter.prototype.registerToEvents = function () {
            this.score = 40;
            this.updateScore();
            Castlevania.GameEvents.UPDATE_SCORE.add(this.updateScore, this, 0);
        };
        ScoreCounter.prototype.update = function () {
        };
        ScoreCounter.prototype.updateScore = function () {
            if (arguments.length > 0) {
                this.score += arguments[0].score;
            }
            this.text = "My Score: " + this.score;
        };
        return ScoreCounter;
    }(Phaser.Text));
    Castlevania.ScoreCounter = ScoreCounter;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = false;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            if (this.game.device.desktop) {
                // if you have any desktop specific settings, they can go in here
            }
            else {
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
        };
        return Boot;
    }(Phaser.State));
    Castlevania.Boot = Boot;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Level1 = /** @class */ (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level1.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'level1');
            this.music = this.add.audio('music', 1, false);
            //this.music.play();
            this.player = new Castlevania.Player(this.game, 130, 284);
            this.platforms = this.game.add.group();
            var platform = new Castlevania.Platform(this.game, this.game.world.centerX, 400, 2, 1);
            platform.visible = false;
            this.platforms.add(platform);
            this.game.physics.arcade.collide(this.player, this.platforms);
            this.spawnStar();
            this.bombs = new Array();
            this.game.time.events.add(600, this.spawnBomb, this);
            this.scoreCounter = new Castlevania.ScoreCounter(this.game);
            this.game.camera.flash(0xff0, 1000);
        };
        Level1.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.overlap(this.player, this.star, this.endGame, null, this);
        };
        Level1.prototype.endGame = function (player, star) {
            this.star.kill();
            this.game.time.events.add(1000, this.spawnStar, this);
            //this.state.start('MainMenu', true, false);
            var value = Phaser.Math.random(10, 50);
            Castlevania.GameEvents.UPDATE_SCORE.dispatch({ score: value });
        };
        Level1.prototype.spawnStar = function () {
            var x = Phaser.Math.random(0, this.game.world.width);
            this.star = this.add.sprite(x, 295, 'star');
            this.game.physics.arcade.enable(this.star);
            this.star.body.immovable = true;
        };
        Level1.prototype.spawnBomb = function () {
            var x = Phaser.Math.random(0, this.game.world.width);
            var y = Phaser.Math.random(0, this.game.world.height);
            var bomb = new Castlevania.Bomb(this.game, x, y, 2, 2);
            this.bombs.push(bomb);
            //this.game.time.events.add(1200, this.spawnBomb, this);
        };
        return Level1;
    }(Phaser.State));
    Castlevania.Level1 = Level1;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Level2 = /** @class */ (function (_super) {
        __extends(Level2, _super);
        function Level2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Level2.prototype.create = function () {
        };
        return Level2;
    }(Phaser.State));
    Castlevania.Level2 = Level2;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var MainMenu = /** @class */ (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.wasLoaded = false;
            return _this;
        }
        MainMenu.prototype.create = function () {
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
            var image = this.add.sprite(10, 10, 'main', 'Wild_Cleopatra.png');
            image.scale.setTo(0.4, 0.4);
            //let image2: Phaser.Sprite = this.add.sprite(10, 10, 'main', '');
            //image2.scale.setTo(0.4, 0.4);
            // add animation from atlas
            //let cleopatra_anim: Phaser.Sprite = this.add.sprite(100, 100, 'cleo_anim_0');
            //cleopatra_anim.animations.add('play', Phaser.Animation.generateFrameNames('WILD_Cleopatra_', 0, 104, '.png', 4), 15, true);
            //cleopatra_anim.animations.play('play', 15, true);
            //add buttons
            this.button_enter = this.game.add.button(250, 400, 'main', this.fadeOut, this, 'btn_paytableOpened_CLOSE_hover.png', 'btn_paytableOpened_CLOSE_normal.png', 'btn_paytableOpened_CLOSE_down.png', 'btn_paytableOpened_CLOSE_normal.png');
            this.button_enter.onInputOver.add(function () { console.log("I am over the button!"); }, this);
            //add fonts
            this.game.cache["addBitmapFontByAtlas"]('MyFont', 'main', 'panel_font1_big.png', this.game.cache.getXML('font_big'), 'xml', 0, 0);
            var text = this.add.bitmapText(500, 20, 'MyFont', 'Is It Working?!?', 30);
            //add custom image between text
            this.CreateCustomText();
            //advanced sprite animator
            this.cleopatra = new AdvAnimator.AdvanceSpriteAnimator(this.game, 50, 300, ['cleo_anim_0', 'cleo_anim_1'], 'WILD_Cleopatra_0031.png', Phaser.Animation.generateFrameNames('WILD_Cleopatra_', 0, 104, '.png', 4), 20, true);
            //advanced sprite animator
            this.lion = new AdvAnimator.AdvanceSpriteAnimator(this.game, 250, 180, ['lion_anim_0', 'lion_anim_1', 'lion_anim_2', 'lion_anim_3', 'lion_anim_4', 'lion_anim_5'], 'Wild_Lion_000.png', Phaser.Animation.generateFrameNames('Wild_Lion_', 0, 89, '.png', 3), 20, true);
        };
        MainMenu.prototype.fadeOut = function () {
            console.log("Fade Out!");
            this.button_enter.inputEnabled = false;
            this.add.tween(this.background).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level2', true, false);
        };
        MainMenu.prototype.CreateCustomText = function () {
            var font = this.cache.getBitmapFont('MyFont');
            var fontData = font.font;
            var charA = fontData.chars[65];
            var f = this.cache.getFrameByName('main', 'gem_green_small.png');
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
            var text = "Hi, " + String.fromCharCode(5000) + " there!";
            var bmText = new Phaser.BitmapText(this.game, 500, 60, "MyFont", text, 30);
            bmText.anchor.x = 0.5;
            this.world.add(bmText);
        };
        return MainMenu;
    }(Phaser.State));
    Castlevania.MainMenu = MainMenu;
})(Castlevania || (Castlevania = {}));
var Castlevania;
(function (Castlevania) {
    var Preloader = /** @class */ (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            //set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            //load fonts
            this.load.xml('font_big', 'assets/fonts/panel_font1_big.xml');
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
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        Preloader.prototype.RegisterExtensions = function () {
            Utils.PhaserUtils.AddBitmapFontByAtlasMethod();
            Utils.PhaserUtils.FindAtlasForTextureMethod();
        };
        return Preloader;
    }(Phaser.State));
    Castlevania.Preloader = Preloader;
})(Castlevania || (Castlevania = {}));
var AdvAnimator;
(function (AdvAnimator) {
    var AdvanceSpriteAnimator = /** @class */ (function (_super) {
        __extends(AdvanceSpriteAnimator, _super);
        function AdvanceSpriteAnimator(game, x, y, atlas_names, static_frame, anim_frames, frameRate, loop) {
            var _this = _super.call(this, game, x, y, atlas_names[0], static_frame) || this;
            _this.anim_frame_collection = [];
            _this.current_atlas_index = 0;
            _this.frame_rate = 20;
            _this.loop = false;
            //list of texture atlas names in which are animation sprites
            _this.atlas_names = atlas_names;
            _this.anim_frames = anim_frames;
            _this.frame_rate = frameRate || _this.frame_rate;
            _this.loop = loop || _this.loop;
            // saving static texture - used when we're not animating
            _this.static_texture = _this.texture;
            // adding Sprite to the world
            _this.game.add.existing(_this);
            _this.cache = _this.game.cache;
            // keeping all texture references of texture atlases
            _this.CacheAtlasTexturesAndFrameData();
            _this.CreateAnimFrameCollection();
            _this.SortByFrameNameIndex();
            var outputFrames = [];
            var newFrameData = _this.RecreateFrameData(outputFrames);
            // set the correct initial texture atlas - atlas which containes first frame of the animation
            _this.current_atlas_index = _this.anim_frame_collection[0].atlas_index;
            _this.loadTexture(_this.atlas_names[_this.current_atlas_index]);
            // create our internal animation
            _this.main_animation = new Phaser.Animation(_this.game, _this, 'animate', newFrameData, outputFrames, _this.frame_rate, _this.loop);
            _this.main_animation.enableUpdate = true;
            _this.main_animation.onUpdate.add(_this.onUpdate, _this);
            _this.main_animation.play();
            return _this;
        }
        AdvanceSpriteAnimator.prototype.create = function () {
        };
        AdvanceSpriteAnimator.prototype.onUpdate = function (anim, frame) {
            var anim_index = anim.currentFrame.index;
            if (anim_index >= this.anim_frame_collection.length)
                anim_index = 0;
            if (this.anim_frame_collection[anim_index].atlas_index !== this.current_atlas_index) {
                this.current_atlas_index = this.anim_frame_collection[anim_index].atlas_index;
                this.setTexture(this.atlas_textures[this.current_atlas_index]);
                this.main_animation.updateCurrentFrame(false, true);
                //console.log("******************************************")
                //console.log("Switching to " + this.atlas_names[this.current_atlas_index] + " atlas on animation frame index: " + anim_index);
                //console.log("Sprite name: " + this.anim_frame_collection[anim_index].frame_name + ", indexing: " + this.anim_frame_collection[anim_index].frames.index);
                //console.log("******************************************")
            }
        };
        AdvanceSpriteAnimator.prototype.update = function () {
        };
        AdvanceSpriteAnimator.prototype.SortByFrameNameIndex = function () {
            for (var i = 0; i < this.anim_frame_collection.length - 1; i++) {
                for (var j = 1; j < this.anim_frame_collection.length; j++) {
                    var firstObj = this.anim_frame_collection[i];
                    var secondObj = this.anim_frame_collection[j];
                    if (firstObj.frame_name_index > secondObj.frame_name_index) {
                        var temp = secondObj;
                        this.anim_frame_collection[j] = firstObj;
                        this.anim_frame_collection[i] = secondObj;
                    }
                }
            }
        };
        AdvanceSpriteAnimator.prototype.CacheAtlasTexturesAndFrameData = function () {
            this.atlas_textures = [];
            this.frame_data = [];
            var image;
            for (var i = 0; i < this.atlas_names.length; i++) {
                image = this.cache.getImage(this.atlas_names[i], true);
                this.atlas_textures[i] = new PIXI.Texture(image.base);
                this.frame_data[i] = image.frameData;
            }
        };
        AdvanceSpriteAnimator.prototype.CreateAnimFrameCollection = function () {
            for (var i = 0; i < this.anim_frames.length; i++) {
                for (var atl_idx = 0; atl_idx < this.atlas_names.length; atl_idx++) {
                    if (this.frame_data[atl_idx].getFrameByName(this.anim_frames[i])) {
                        this.anim_frame_collection[i] = {
                            frame_name: this.anim_frames[i],
                            frame_name_index: this.anim_frames[i].split('_')[1].split('.')[0],
                            atlas_index: atl_idx,
                            frames: this.frame_data[atl_idx].getFrameByName(this.anim_frames[i])
                        };
                    }
                }
            }
        };
        AdvanceSpriteAnimator.prototype.RecreateFrameData = function (outputFrames) {
            var frame_data = new Phaser.FrameData();
            for (var i = 0; i < this.anim_frame_collection.length; i++) {
                var frame1 = this.anim_frame_collection[i];
                outputFrames[i] = i;
                frame1.frames.index = i;
                frame_data["_frames"][i] = frame1.frames;
            }
            return frame_data;
        };
        return AdvanceSpriteAnimator;
    }(Phaser.Sprite));
    AdvAnimator.AdvanceSpriteAnimator = AdvanceSpriteAnimator;
})(AdvAnimator || (AdvAnimator = {}));
var Castlevania;
(function (Castlevania) {
    var GameEvents = /** @class */ (function () {
        function GameEvents() {
        }
        GameEvents.UPDATE_SCORE = new Phaser.Signal();
        GameEvents.ADD_STAR = new Phaser.Signal();
        return GameEvents;
    }());
    Castlevania.GameEvents = GameEvents;
})(Castlevania || (Castlevania = {}));
var Utils;
(function (Utils) {
    var PhaserUtils = /** @class */ (function () {
        function PhaserUtils() {
        }
        // -------------------------------------------------------------------------
        //public static AddBitmapFontAddMethod(): void {
        //    Phaser.Cache.prototype["addBitmapFontFromImage"] = function addBitmapFont(key: string, url: string,
        //        imageName: string, atlasData: any, atlasType: string, xSpacing?: number, ySpacing?: number): void {
        //        var img = this.getImage(imageName, true);
        //        var obj = {
        //            url: url,
        //            data: img.data,
        //            font: null,
        //            base: img.base
        //        };
        //        if (xSpacing === undefined) { xSpacing = 0; }
        //        if (ySpacing === undefined) { ySpacing = 0; }
        //        if (atlasType === 'json') {
        //            obj.font = Phaser.LoaderParser.jsonBitmapFont(atlasData, obj.base, xSpacing, ySpacing, null, 1);
        //        }
        //        else {
        //            obj.font = Phaser.LoaderParser.xmlBitmapFont(atlasData, obj.base, xSpacing, ySpacing, null, 1);
        //        }
        //        this._cache.bitmapFont[key] = obj;
        //        this._resolveURL(url, obj);
        //    }
        //}
        // -------------------------------------------------------------------------
        PhaserUtils.AddBitmapFontByAtlasMethod = function () {
            // EXTEND cache to allow bitmap fonts on another atlas﻿
            // Bind the font atlas data to the spritesheet that has the font image data...
            // In this example 'atlasImageName' is my main spritesheet, and 'fontFrameName' is the frame on that sheet with the font glyph image set.
            // 'key' is the key that you use as your font name when creating bitmap text.
            Phaser.Cache.prototype["addBitmapFontByAtlas"] = function (key, atlasImageName, fontFrameName, atlasData, atlasType, xSpacing, ySpacing) {
                var obj = {
                    font: null,
                    base: this.game.cache.getBaseTexture(atlasImageName)
                };
                if (xSpacing === undefined) {
                    xSpacing = 0;
                }
                if (ySpacing === undefined) {
                    ySpacing = 0;
                }
                // bind the atlas data to the frame on the 'sheet'
                var frameData = this.game.cache.getFrameByName(atlasImageName, fontFrameName);
                // only works with XML for now
                var xml = atlasData;
                var info = xml.getElementsByTagName('info')[0];
                var common = xml.getElementsByTagName('common')[0];
                var letters = xml.getElementsByTagName('char');
                for (var i = 0; i < letters.length; i++) {
                    var x = parseInt(letters[i].getAttribute('x'), 10);
                    var y = parseInt(letters[i].getAttribute('y'), 10);
                    letters[i].setAttribute('x', x + frameData.x);
                    letters[i].setAttribute('y', y + frameData.y);
                }
                if (atlasType === 'json') {
                    obj.font = Phaser.LoaderParser.jsonBitmapFont(atlasData, obj.base, xSpacing, ySpacing, null, 1);
                }
                else {
                    obj.font = Phaser.LoaderParser.xmlBitmapFont(atlasData, obj.base, xSpacing, ySpacing, null, 1);
                }
                this._cache.bitmapFont[key] = obj;
            };
        };
        // -------------------------------------------------------------------------
        PhaserUtils.FindAtlasForTextureMethod = function () {
            Phaser.Cache.prototype["getAtlasForTexture"] = function (texturekey) {
                for (var key in this.game.cache._cache.image) {
                    if (this.game.cache._cache.image[key].frameData.getFrameByName(texturekey)) {
                        return this.game.cache._cache.image[key].key;
                    }
                }
                return null;
            };
        };
        return PhaserUtils;
    }());
    Utils.PhaserUtils = PhaserUtils;
})(Utils || (Utils = {}));
var Utils;
(function (Utils) {
    var RandomBoolBalancer = /** @class */ (function () {
        // -------------------------------------------------------------------------
        // balancer - how many consecutive same values maximally
        function RandomBoolBalancer(rnd, balancer) {
            this._rnd = rnd;
            this.reset(balancer);
        }
        // -------------------------------------------------------------------------
        RandomBoolBalancer.prototype.reset = function (balancer) {
            --balancer;
            var lbound = Math.ceil(balancer / 2);
            this._lbound = -lbound;
            this._ubound = balancer - lbound;
            this._currentBalance = balancer === 0 ? this._rnd.integerInRange(-1, 0) : 0;
        };
        // -------------------------------------------------------------------------
        RandomBoolBalancer.prototype.getBoolean = function () {
            var result = this._currentBalance + this._rnd.integerInRange(this._lbound, this._ubound);
            //console.log("lbound = " + (this._lbound + this._currentBalance) + ", ubound = " + (this._ubound + this._currentBalance) +
            //    ", currentBalance = " + this._currentBalance + ", value = " + (result >= 0));
            this._currentBalance += result >= 0 ? -1 : 1;
            return result >= 0;
        };
        return RandomBoolBalancer;
    }());
    Utils.RandomBoolBalancer = RandomBoolBalancer;
})(Utils || (Utils = {}));
