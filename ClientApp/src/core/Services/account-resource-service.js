import axiosInstance from '../../Api/Api';

export default class accountResourceService {

    async getCountryCode() {
        const url = "https://ipapi.co/json";
        try {
            const response = await fetch(url);
            return response.json();
        } catch (error) {
            console.error('There was an error!', error);
        }
    }
    async getCountries() {
        try {
            const response = await axiosInstance.get("auth/countries");
            return response.data;
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    async getLanguages() {
        try {
            const response = await axiosInstance.get("auth/languages");
            return response.data;
        } catch (error) {
            console.error('There was an error!', error);
        }
    }


    //country type
    async getCompanyTypes(languagesId){
        try{
         const  response = await  axiosInstance.get(`auth/categories/${languagesId}`);
         return response.data;
        }catch(error){
          
        }
    }

    //get genders
    async getGenders (languagesId){
        try{
            const response = await axiosInstance.get(`auth/genders/${languagesId}`);
            return response.data;
        }
        catch(error){

        }
    }


}