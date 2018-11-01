module.exports = class ScoringService {
    calculateScoreRelativeToPar(par, scores) {
        return scores.map((score => score ? score : 0)).reduce((a, b) => a + b, 0) - par;
    }
    calculateInScore(){
        //holes 1-9
    }
    calculateOutScore(){
        //holes 10-18
    }
    calculateTotalScore(){
        //total score
    }

};