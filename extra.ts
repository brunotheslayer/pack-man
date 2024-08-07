//% blockGap=8 block="High Score" //% color="#BD0000"
namespace HighScore {
    /**
     * Resets the best score.
     */
    //% block
    export function resetHighScore() {
        let curr = settings.readNumber("high-score");
        settings.remove("high-score");
    }
}