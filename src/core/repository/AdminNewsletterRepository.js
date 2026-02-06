import Repository from "./Repository";
import _ from "lodash";

const getPath = (path) => {
    return `${path}`;
}
//API CALL for Admin Students flow
class AdminNewsletterRepository extends Repository {

    getNewsletterList = async (param) => {
        try {
            const data = await this.postData(`newsLetter/getHistory`, param);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    getNewsletterHistory = async (param) => {
        try {
            const data = await this.postData(`newsLetter/getHistory`, param);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    getNewsletterContentList = async (param) => {
        try {
            const data = await this.postData(`newsLetter/fetchContent`, param);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    createNewsletter = async (params) => {
        try {
            const data = await this.postData(getPath('newsLetter/create'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    createNewsletterContent = async (params) => {
        try {
            const data = await this.postData(getPath('newsLetter/createContent'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    deleteNewsletter = async (params) => {
        try {
            const data = await this.putData(getPath(`newsLetter/delete/${params}`));
            console.log(getPath(`newsLetter/delete/${params}`),'pathhhhhhhhhh')
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    deleteNewsletterContent = async (params) => {
        try {
            const data = await this.postData(getPath('newsLetter/deleteContent'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }
    updateNewsletterStatus = async (params) => {
        try {
            const data = await this.putData(`newsLetter/status/${params.id}`, {is_active:params.is_active});
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    updateNewsletterContent = async (params) => {
        console.log(params,'id check')
        try {
            const data = await this.postData(`newsLetter/updateContent`, params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    updateNewsletter = async (params) => {
        console.log(params,'update paramssss')
        try {
            const data = await this.putData(`newsLetter/update/${params.id}`, params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    showNewsletterContent = async (params) => {
        try {
            const data = await this.postData(`newsLetter/showContent`, params);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }
    
}

export default new AdminNewsletterRepository("newsletter");