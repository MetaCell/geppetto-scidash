export default class Helper {

    constructor(){}

    isEmptyString(string){
        if (string === null)
            return true;

        if (string.length == 0)
            return true;

        return false;
    }

    getBackground(sortKey, colorBlind){
        let sortKeyRounded = null;
        let percents = 0;
        let decreasingValue = 255;
        let growingValue = 255;

        if (typeof sortKey != "undefined"){
            sortKeyRounded = sortKey.toFixed(2);
            percents = sortKeyRounded * 100;
            decreasingValue = Math.floor(255 - (255 / 100 * percents));
            growingValue = Math.floor(255 / 100 * percents);

            if (!colorBlind){
                if (growingValue > 40)
                    growingValue = growingValue - 20;

                return "rgba("+ decreasingValue +", "+ growingValue +", 0, 1)"
            } else {
                if (decreasingValue > 40)
                    decreasingValue = decreasingValue - 20;

                return "rgba("+ decreasingValue +", "+ decreasingValue +", "+ growingValue +", 1)"
            }
        }

    }
}
