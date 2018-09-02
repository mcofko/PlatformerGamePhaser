module Utils {
    export class RandomBoolBalancer {
        private _rnd: Phaser.RandomDataGenerator;
        private _lbound: number;
        private _ubound: number;
        private _currentBalance: number;

        // -------------------------------------------------------------------------
        // balancer - how many consecutive same values maximally
        public constructor(rnd: Phaser.RandomDataGenerator, balancer: number) {
            this._rnd = rnd;
            this.reset(balancer);
        }

        // -------------------------------------------------------------------------
        public reset(balancer: number): void {
            --balancer;

            let lbound = Math.ceil(balancer / 2);
            this._lbound = -lbound;
            this._ubound = balancer - lbound;

            this._currentBalance = balancer === 0 ? this._rnd.integerInRange(-1, 0) : 0;
        }

        // -------------------------------------------------------------------------
        public getBoolean(): boolean {

            let result = this._currentBalance + this._rnd.integerInRange(this._lbound, this._ubound);

            //console.log("lbound = " + (this._lbound + this._currentBalance) + ", ubound = " + (this._ubound + this._currentBalance) +
            //    ", currentBalance = " + this._currentBalance + ", value = " + (result >= 0));

            this._currentBalance += result >= 0 ? -1 : 1;

            return result >= 0;
        }
    }
}