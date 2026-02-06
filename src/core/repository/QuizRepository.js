

import Repository from "./Repository";
import _ from "lodash";


const getStudentPath = (path)=>{
    return `student/${path}`;
}
//API CALL for Admin Dashboard flow
class QuizRepository extends Repository {
    stdgetQuizlist = async (params) => {
       if(!params){
        params=''
       }
        try {
            const data = await this.getData(getStudentPath(`quiz/list/`+params));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    stdstartQuiz = async (params) => {
        try {
            const data = await this.postData(getStudentPath('quiz/start'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    stdgetQuestion = async (params) => {
        try {
            const data = await this.getData(getStudentPath('quiz/listWithQuestions/'+params));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    stdgetquizAttempts = async (params) => {
        try {
            const data = await this.getData(getStudentPath('quiz/viewMarks/'+params));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    stdAssessmentQuestionNReason = async (params) => {
        try {
            const data = await this.postData(getStudentPath('quiz/questionWiseAssessment'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };
        
    setStudentAnswer = async (params) =>{
        try {
            const data = await this.postData(getStudentPath('quiz/answer'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    }

    stdquizComplted = async (params) =>{
        try {
            const data = await this.postData(getStudentPath('quiz/complete'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    }

    stdgetAQuizQuestion = async ({quizId,qId}) => {
        // console.log(quizId,qId,'quizzzzz idssssss')
        try {
            const data = await this.getData(getStudentPath(`quiz/fetchQuizQuestion/${quizId}/${qId}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    getStudentQuizState = async (quizId) => {
        try {
            const data = await this.getData(getStudentPath(`quiz/checkQuizStartOrFetch/${quizId}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    getGraphData = async (quizId) => {
        try {
            const data = await this.getData(getStudentPath(`quiz/resultsGraph/${quizId}`));
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

}

export default new QuizRepository("quiz");
