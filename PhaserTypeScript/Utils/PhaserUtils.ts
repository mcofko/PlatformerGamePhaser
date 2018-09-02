module Utils {

    export class PhaserUtils {

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
        public static AddBitmapFontByAtlasMethod(): void {
            // EXTEND cache to allow bitmap fonts on another atlas﻿
            // Bind the font atlas data to the spritesheet that has the font image data...
            // In this example 'atlasImageName' is my main spritesheet, and 'fontFrameName' is the frame on that sheet with the font glyph image set.
            // 'key' is the key that you use as your font name when creating bitmap text.
            Phaser.Cache.prototype["addBitmapFontByAtlas"] = function (key: string, atlasImageName: string, fontFrameName: string,
                atlasData: any, atlasType: string, xSpacing: number, ySpacing: number) {

                var obj = {
                    font: null,
                    base: this.game.cache.getBaseTexture(atlasImageName)
                };

                if (xSpacing === undefined) { xSpacing = 0; }
                if (ySpacing === undefined) { ySpacing = 0; }

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
        }

        // -------------------------------------------------------------------------
        public static FindAtlasForTextureMethod(): void {
            Phaser.Cache.prototype["getAtlasForTexture"] = function (texturekey) {
                for (var key in this.game.cache._cache.image) {
                    if (this.game.cache._cache.image[key].frameData.getFrameByName(texturekey)) {
                        return this.game.cache._cache.image[key].key;
                    }
                }
                return null;
            };
        }
    }
}