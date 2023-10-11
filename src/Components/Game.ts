export default class Game {
    private isGameStarted: boolean

    constructor() {
        this.isGameStarted = false;
    }

    public setIsGameStarted(value: boolean) {
        this.isGameStarted = value;
    }

    public getIsGameStarted() {
        return this.isGameStarted;
    }
}