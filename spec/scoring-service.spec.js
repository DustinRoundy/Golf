let ScoringService  = require("../js/scoring-service");
describe('ScoringService', () => {
    let scoringService;
    beforeEach(() => {
        scoringService = new ScoringService();
    });
    describe('calculateScoreRelativeToPar', () => {
        it('calculate under par score correctly', () => {
            let par = 72;
            let playerScores = Array(18).fill(3, 0, 18);
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
            expect(scoreRelativeToPar).toEqual(-18);
        });
        it('calculates over par score correctly', () => {
            let par = 72;
            let playerScores = Array(18).fill(5, 0, 18);
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
            expect(scoreRelativeToPar).toEqual(18);
        });
        it('returns a number', () => {
            let par = 72;
            let playerScores = Array(18).fill(3, 0, 18);
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
            expect(typeof scoreRelativeToPar).toEqual('number');
        });
        it('calculates when no scores', () => {
            let par = 72;
            let playerScores = Array(18);
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
            expect(scoreRelativeToPar).toEqual(-72);
        });

    });
    describe('calculateOutScore', () => {
        it('calculate Out Score Correctly', () => {
            let par = 72;
            let playerScores = Array(18).fill(3, 0, 18);
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
            expect(scoreRelativeToPar).toEqual(-18);
        });
        it('returns a number', () => {
            let par = 72;
            let playerScores = Array(18).fill(3, 0, 18);
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
            expect(scoreRelativeToPar).toEqual(-18);
        });
    });
    describe('calculateInScore', () => {
        it('calculate in score correctly correctly', () => {
            let par = 72;
            let playerScores = Array(18).fill(3, 0, 18);
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
            expect(scoreRelativeToPar).toEqual(-18);
        });
        it('returns a number', () => {
            let par = 72;
            let playerScores = Array(18).fill(3, 0, 18);
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
            expect(scoreRelativeToPar).toEqual(-18);
        });
    });
    describe('calculateTotalScore', () => {
        it('calculate total score correctly', () => {
            let par = 72;
            let playerScores = Array(18).fill(3, 0, 18);
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
            expect(scoreRelativeToPar).toEqual(-18);
        });
        it('returns a number', () => {
            let par = 72;
            let playerScores = Array(18).fill(3, 0, 18);
            let scoreRelativeToPar = scoringService.calculateScoreRelativeToPar(par, playerScores);
            expect(scoreRelativeToPar).toEqual(-18);
        });
    });
});