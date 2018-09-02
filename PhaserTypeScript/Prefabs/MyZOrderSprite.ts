module Castlevania {
    export class MyZOrderSprite extends Phaser.Sprite {
        private _parentTransform: Phaser.Group;

        constructor(aGame: Phaser.Game, x: number, y: number, key: string, parentTransform: Phaser.Group) {
            super(aGame, x, y, key);

            this._parentTransform = parentTransform;
        }

        public updateTransform(): void {
            if (!this.visible) return;

            this.displayObjectUpdateTransform(this._parentTransform);
        }
    }
}