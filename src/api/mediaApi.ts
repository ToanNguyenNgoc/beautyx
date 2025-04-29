import API_3RD from "api/3rd-api";
import axios from "axios";
import { axiosClient } from "config";

class Media {
    postMedia = (formData: FormData) => {
        const url = `media`;
        return axiosClient.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
                // const progress = (progressEvent.loaded / (progressEvent.total || 1)) * 50;
                // console.log(10, progressEvent);
            },
            onDownloadProgress: (progressEvent) => {
                // const progress = 50 + (progressEvent.loaded / (progressEvent.total || 1)) * 50;
                // console.log(16, progress);
            },
        })
    };
    postMediaThirdParty = (formData: FormData) => {
        const url = `${API_3RD.API_NODE}/upload/media`;
        return axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
                // const progress = (progressEvent.loaded / (progressEvent.total || 1)) * 50;
                // console.log(10, progressEvent);
            },
            onDownloadProgress: (progressEvent) => {
                // const progress = 50 + (progressEvent.loaded / (progressEvent.total || 1)) * 50;
                // console.log(16, progress);
            },
        })
    }
}
export const mediaApi = new Media();
export default mediaApi