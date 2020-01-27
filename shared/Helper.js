/* eslint-disable no-prototype-builtins */
import Config from "./Config";

export default class Helper {
  constructor () {}

  isEmptyString (string) {
    let isEmpty = false;

    if (
      string === null
      || string === undefined
      || (string != undefined && string.length == 0)
    ) {
      isEmpty = true;
    }

    return isEmpty;
  }

  getBackground (sortKey, colorBlind) {
    let sortKeyRounded = null;
    let percents = 0;
    let decreasingValue = 255;
    let growingValue = 255;

    if (typeof sortKey != "undefined" && !isNaN(sortKey)) {
      sortKeyRounded = sortKey.toFixed(2);
      percents = sortKeyRounded * 100;
      decreasingValue = Math.floor(255 - (255 / 100) * percents);
      growingValue = Math.floor((255 / 100) * percents);

      if (!colorBlind) {
        if (growingValue > 40) {
          growingValue = growingValue - 20;
        }

        return "rgba(" + decreasingValue + ", " + growingValue + ", 0, 1)";
      } else {
        if (decreasingValue > 40) {
          decreasingValue = decreasingValue - 20;
        }

        return (
          "rgba("
          + decreasingValue
          + ", "
          + decreasingValue
          + ", "
          + growingValue
          + ", 1)"
        );
      }
    }
  }

  getOSIconClass (osName = null) {
    switch (osName) {
    case "OSX":
    case "Darwin":
      return "fa-apple";
    case "Linux":
      return "fa-linux";
    case "Windows":
      return "fa-windows";
    default:
      return "";
    }
  }

  generateId (max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  generateHash (string) {
    let hash = 0,
      i,
      chr;
    if (string.length === 0) {
      return hash;
    }
    for (i = 0; i < string.length; i++) {
      chr = string.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  generateHashId (model) {
    let saltedName = `${model.name}_${this.generateId(2000, 100000)}`;

    let hash = Math.abs(this.generateHash(saltedName));
    let id = this.generateId(1000000, 9999999);

    return `${hash}_${id}`;
  }

  capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  noneIfEmptyString (string = "") {
    return this.isEmptyString(string) ? "None" : string;
  }

  noneIfEmptyArray (array = []) {
    return array.length == 0 ? "None" : array;
  }

  noneIfEmptyObject (object = {}) {
    return Object.keys(object).length == 0 ? "None" : object;
  }

  noneIfEmptyMap (object = {}) {
    return object.size == 0 ? "None" : object;
  }

  parseBuildInfo (string) {
    let buildInfoRegex = /(.+)(\/)(\w+)/;
    let buildInfoResult = null;
    let iconClass = "";

    if (buildInfoRegex.test(string)) {
      buildInfoResult = buildInfoRegex.exec(string);
      iconClass = this.getOSIconClass(buildInfoResult[3]);
    }

    return {
      text: string,
      icon: iconClass
    };
  }

  isEmpty (obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  static getNamespaceFromKey (key, namespace) {
    switch (key) {
    case "owner": return Config.globalNamespace;
    case "timestamp_from": return Config.globalNamespace;
    case "timestamp_to": return Config.globalNamespace;
    default: return namespace;
    }
  }
}
