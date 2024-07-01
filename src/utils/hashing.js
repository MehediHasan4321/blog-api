const bycrpt = require("bcryptjs");

const generateHash = async (payload,saltRound=10) => {
    const salt = await bycrpt.genSalt(saltRound)
  return bycrpt.hash(payload, salt);
};

const hashMatched = async(raw,hash)=>{
    const result = await bycrpt.compare(raw,hash)

    return result
}

module.exports = {
    generateHash,
    hashMatched
}