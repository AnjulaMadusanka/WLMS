import Repository from "./Repository";
import _ from "lodash";

const getPath = (path) => {
    return `${path}`;
}
class DocumentRepository extends Repository {

    getDocumentList = async (param) => {
        console.log(param,'paramnhjhkdfhdfjhsdfhd')
        try {
            const data = await this.getData(`documents/list/${param}`);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }
    addDocument = async (param) => {
        try {
            const data = await this.uploadForm(`documents/upload`,param);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }

    deleteDocument = async (param) => {
        try {
            const data = await this.deleteData(`documents/delete/${param}`);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }
    updateDocumentStatus= async (param) => {
        try {
            const data = await this.postData(`documents/status/change`,param);
            return _.get(data, `data`);
        } catch (error) {
            return { error }
        }
    }
    
}

export default new DocumentRepository("document");