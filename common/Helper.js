export default class Helper {

    constructor(){}

    isEmptyString(string){
        if (string === null)
            return true;

        if (string.length == 0)
            return true;

        return false;
    }
}
