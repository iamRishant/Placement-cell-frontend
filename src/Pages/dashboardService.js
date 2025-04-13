import axios from 'axios';
export const getAdminDashboard = async () => {
    try{
        const response = await axios.get("http://localhost:8000/api/v1/admin/dashboard", {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data;
    }catch (error){
        throw error.response?.data || error.message;
    }
};

export const getStudentDashboard = async () => {
    try{
        const response = await axios.get("http://localhost:8000/api/v1/student/dashboard", {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });
        return response.data;
    }catch (error){
        throw error.response?.data || error.message;
    }
}

export const registerCompany = async (companyData) => {
    try {
        const response = await axios.post("http://localhost:8000/api/v1/register-company", companyData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
        });
    } catch (error) {
        throw error.response?.data || error.message;
    }
}