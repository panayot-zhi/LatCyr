/*
    Description: Converts Bulgarian Cyrillic to Latin and vice versa.
    Copyright: Panayot Ivanov
    e-mail: panayot_zhi@abv.bg
    Date: 21.07.2020
*/

const mapToLatin = {
    "А": "A",
    "Б": "B",
    "В": "V",
    "Г": "G",
    "Д": "D",
    "Е": "E",
    "Ж": "ZH",
    "З": "Z",
    "И": "I",
    "Й": "Y",
    "К": "K",
    "Л": "L",
    "М": "M",
    "Н": "N",
    "О": "O",
    "П": "P",
    "Р": "R",
    "С": "S",
    "Т": "T",
    "У": "U",
    "Ф": "F",
    "Х": "H",
    "Ц": "TS",
    "Ч": "CH",
    "Ш": "SH",
    "Щ": "SHT",
    "Ъ": "A",
    "Ь": "Y",
    "Ю": "YU",
    "Я": "YA"
};

function toLatin(cyrillic) {
    let cUp = cyrillic.toUpperCase();

    let result = "";
    for (var i = 0; i < cUp.length; i++) {
        let c = cUp[i];
        let candidate = mapToLatin[c];
        if (candidate != null) {
            result += candidate;
            continue;
        }

        result += c;
    }

    return result;
}

var mapToCyrillic = {
    "A": "А",
    "B": "Б",
    "V": "В",
    "G": "Г",
    "D": "Д",
    "E": "Е",
    "K": "К",
    "L": "Л",
    "M": "М",
    "N": "Н",
    "O": "О",
    "P": "П",
    "R": "Р",
    "U": "У",
    "F": "Ф",
    "H": "Х",

    "Z": function (word, index) {
        if (word.charAt(index) !== "Z") {
            return null;
        }

        if (word.charAt(index + 1) === "H") {
            return "Ж ";
        }

        return "З";
    },

    "J": function (word, index) {
        if (word.charAt(index) !== "J") {
            return null;
        }

        if (word.charAt(index + 1) === "A") {
            return "Я ";
        }

        if (word.charAt(index + 1) === "I") {
            return "Ж ";
        }

        return "Й";
    },

    "I": function (word, index) {
        if (word.charAt(index) !== "I") {
            return null;
        }

        if (word.charAt(index + 1) === "U") {
            return "Ю ";
        }

        // only at the beginning of the word is this substitution allowed
        if (word.charAt(index + 1) === "O" && word.charAt(index - 1) == null) {
            return "ЙО";
        }

        return "И";
    },

    "C": function (word, index) {
        if (word.charAt(index) !== "C") {
            return null;
        }

        if (word.charAt(index + 1) === "H") {
            return "Ч ";
        }

        return "Ц";
    },

    "S": function (word, index) {
        if (word.charAt(index) !== "S") {
            return null;
        }

        if (word.charAt(index + 1) === "H" && word.charAt(index + 2) === "T") {
            return "Щ  ";
        }

        if (word.charAt(index + 1) === "H") {
            return "Ш ";
        }

        return "С";
    },

    "T": function (word, index) {
        if (word.charAt(index) !== "T") {
            return null;
        }

        if (word.charAt(index + 1) === "S") {
            return "Ц ";
        }

        if (word.charAt(index + 1) === "Z") {
            return "Ц ";
        }

        return "Т";
    },

    "Y": function (word, index) {
        if (word.charAt(index) !== "Y") {
            return null;
        }

        if (word.charAt(index + 1) === "U") {
            return "Ю ";
        }

        if (word.charAt(index + 1) === "A") {
            return "Я ";
        }

        return "Й";
    }
}

function toCyrillic(latin) {
    let lUp = latin.toUpperCase();

    let result = "";
    for (var i = 0; i < lUp.length; i++) {
        let c = lUp[i];
        let candidate = mapToCyrillic[c];
        if (typeof (candidate) == "string") {
            result += candidate;
            continue;
        }

        if (typeof (candidate) == "function") {
            let fnResult = candidate(lUp, i);
            if (fnResult != null) {
                let skip = fnResult.length - 1;
                result += fnResult.trim();
                i += skip;
                continue;
            }
        }

        result += c;
    }

    return result;
}