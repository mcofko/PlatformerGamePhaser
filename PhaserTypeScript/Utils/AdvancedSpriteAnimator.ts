module AdvAnimator {
    export class AdvanceSpriteAnimator extends Phaser.Sprite {
        static_texture: PIXI.Texture;
        atlas_textures: Array<PIXI.Texture>;
        anim_frames: Array<string>;
        atlas_names: Array<string>;
        frame_data: Array<Phaser.FrameData>;
        cache: Phaser.Cache;
        anim_frame_collection = [];
        current_atlas_index: number = 0;
        frame_rate: number = 20;
        loop: boolean = false;
        main_animation: Phaser.Animation;

        constructor(game: Phaser.Game, x: number, y: number, atlas_names?: Array<string>, static_frame?: string | number, anim_frames?: Array<string>, frameRate?: number, loop?: boolean) {
            super(game, x, y, atlas_names[0], static_frame);

            //list of texture atlas names in which are animation sprites
            this.atlas_names = atlas_names;
            this.anim_frames = anim_frames;
            this.frame_rate = frameRate || this.frame_rate;
            this.loop = loop || this.loop;
            // saving static texture - used when we're not animating
            this.static_texture = this.texture;
            // adding Sprite to the world
            this.game.add.existing(this);

            this.cache = this.game.cache;
            // keeping all texture references of texture atlases
            this.CacheAtlasTexturesAndFrameData();
            this.CreateAnimFrameCollection();
            this.SortByFrameNameIndex();

            var outputFrames: Array<number> = [];
            var newFrameData = this.RecreateFrameData(outputFrames);

            // set the correct initial texture atlas - atlas which containes first frame of the animation
            this.current_atlas_index = this.anim_frame_collection[0].atlas_index;
            this.loadTexture(this.atlas_names[this.current_atlas_index]);
            // create our internal animation
            this.main_animation = new Phaser.Animation(this.game, this, 'animate', newFrameData, outputFrames, this.frame_rate, this.loop);

            this.main_animation.enableUpdate = true;
            this.main_animation.onUpdate.add(this.onUpdate, this);
            this.main_animation.play();
        }

        create() {

        }

        onUpdate(anim: Phaser.Animation, frame: Phaser.Frame) {
            let anim_index = anim.currentFrame.index;
            if (anim_index >= this.anim_frame_collection.length) anim_index = 0;

            if (this.anim_frame_collection[anim_index].atlas_index !== this.current_atlas_index) {
                this.current_atlas_index = this.anim_frame_collection[anim_index].atlas_index;                
                this.setTexture(this.atlas_textures[this.current_atlas_index]);
                this.main_animation.updateCurrentFrame(false, true);                

                //console.log("******************************************")
                //console.log("Switching to " + this.atlas_names[this.current_atlas_index] + " atlas on animation frame index: " + anim_index);
                //console.log("Sprite name: " + this.anim_frame_collection[anim_index].frame_name + ", indexing: " + this.anim_frame_collection[anim_index].frames.index);
                //console.log("******************************************")
            }            
        }

        update() {
            
        }

        private SortByFrameNameIndex(): void {
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
        }

        private CacheAtlasTexturesAndFrameData(): void {
            this.atlas_textures = [];
            this.frame_data = [];
            let image;
            for (var i = 0; i < this.atlas_names.length; i++) {
                image = this.cache.getImage(this.atlas_names[i], true);
                this.atlas_textures[i] = new PIXI.Texture(image.base);
                this.frame_data[i] = image.frameData;
            }
        }

        private CreateAnimFrameCollection() {
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
        }

        private RecreateFrameData(outputFrames: Array<number>): Phaser.FrameData {
            let frame_data = new Phaser.FrameData();

            for (var i = 0; i < this.anim_frame_collection.length; i++) {
                var frame1 = this.anim_frame_collection[i];
                outputFrames[i] = i;
                frame1.frames.index = i;
                frame_data["_frames"][i] = frame1.frames;
            }

            return frame_data;
        }

        //if(this.game.cache._cache.image[key].frameData.getFrameByName(texturekey)) {
        //    return this.game.cache._cache.image[key].key;
        //}

    }
}