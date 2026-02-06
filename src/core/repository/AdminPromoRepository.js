import Repository from "./Repository";
import _ from "lodash";


const getPath = (path)=>{
    return `admin/${path}`;
}
class AdminPromoRepository extends Repository {
   getAdminPromo = async (params) => {
        try {
            const data = await this.getData(getPath('promoCode/fetch'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };


    createAdminPromo = async (params) => {
        try{
            const data = await this.postData(getPath('promoCode/create'), params); 
            return _.get(data, `data`);
        }catch(error){
            return {error};
        }
    }

    updateAdminPromo = async (params) => {
        try{
            const data = await this.putData(getPath('promoCode/update'), params); 
            return _.get(data, `data`);
        }catch(error){
            return {error};
        }
    }

    updatePromoStatus = async (params) => {
        try{
            const data = await this.putData(getPath('promoCode/activate_deactivate'), params); 
            return _.get(data, `data`);
        }catch(error){
            return {error};
        }
    }
}

export default new AdminPromoRepository("promo");