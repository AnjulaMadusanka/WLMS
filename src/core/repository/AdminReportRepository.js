import Repository from "./Repository";
import _ from "lodash";

const getPath = (path)=>{
    return `admin/reports/${path}`;
}
//API CALL for Admin Students flow
class AdminReportRepository extends Repository {
    getStudentReportData = async (params) => {
        try {
            const data = await this.postData(getPath('studentReport'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };

    getPaymentReportData = async (params) => {
        try {
            const data = await this.postData(getPath('paymentReport'), params);
            return _.get(data, `data`);
        } catch (error) {
            return { error };
        }
    };
}

export default new AdminReportRepository("reports");