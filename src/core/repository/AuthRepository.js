

import Repository from "./Repository";
import _ from "lodash";

const getPath = (path)=>{
    return `common/${path}`;
}

//API CALL for Auth flow
class AuthRepository extends Repository {
    //call user login api pass password and email as params
    login = async (params) => {
        const appVersion = _.get(window,'navigator.appVersion','');
        const vendor = _.get(window,'navigator.vendor','')
        try {
            const data = await this.postData(getPath('login'), {...params,device:vendor, browser:appVersion});
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    // verify email
    onVerifyEmail = async (params) => {
        try {
            const data = await this.postData(getPath('emailVerify'), params);
            return _.get(data, `data`);

        } catch (error) {
            return { error }
        }
    };

   
    
    //(1) call api for forgot password 
    forgotPassword = async (params) => {
        try {
            const data = await this.postData(getPath('forgot-password'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    };


      //(2) resend otp  (3 FP)
      verifyForogotPasswordAccount = async (params) => {
        try {
            const data = await this.postData(getPath(`verify-otp`), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    };

    // call api for rest password (4 FP)
    resetForgotPassword = async (params) => {
        try {
            const data = await this.postData(getPath(`reset-password`), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    };

  

    // // check login token 
    // validateToken = async () => {
    //     try {
    //         const data = await this.postData(`login/check`, {}, '');
    //         return _.get(data, `data`);
    //     } catch (error) {
    //         return { error }
    //     }
    // }
   
    // signOut user
    onSignOut = async ()=>{
        try {
            const data = await this.getData(getPath('logout'), {}, '');
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

     // call api for rest password (4 FP)
     changePassword = async (params) => {
        try {
            const data = await this.postData(getPath(`change-password`), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    };

    getAllCourseDetails = async (params) =>{
        try {
            const data = await this.getData(getPath(`detailFetch`), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    signUp = async (params) =>{
        try {
            const data = await this.postData(`student/register`, params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    verifyToken = async ()=>{
        try{
            const data = await this.getData(getPath(`token/userDetails`), {});
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

}

export default new AuthRepository("auth");
