const {_saveQuestion, _saveQuestionAnswer} = require("../resource/_DATA");

describe('_saveQuestion', () => {
    test('Success save data', async() => {
        var result = await _saveQuestion({author: 'sarahedo',optionOneText: 'opt1', optionTwoText: 'opt2' });
        expect(result.optionOne.text).toEqual('opt1');
        expect(result.optionTwo.text).toEqual('opt2');
    });

    test('Fail to save data', async() => {
        await expect(_saveQuestion({author: 'sarahedo', optionTwoText: 'opt2' })).rejects.toEqual('Please provide optionOneText, optionTwoText, and author')
    });
});

describe("_saveQuestionAnswer", () => {
    it("should return true for correct parameters", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "sarahedo",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne"
        });

        expect(response).toBeTruthy();
    });

    it("should return error for false parameters", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "sarahedo",
            qid: undefined,
            answer: "optionOne"
        }).catch(e => e);

        expect(response).toBe("Please provide authedUser, qid, and answer");
    });
});
