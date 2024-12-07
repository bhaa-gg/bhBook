import axios from "axios";
import { getTokens, setTokens } from "./action";


export interface ChangePassInterface {
    oldPass: string,
    newPass: string
}


interface changeUserPasswordInterface {
    error: boolean
    message: string

}


export const changePasswordUser = async (dataPay: ChangePassInterface): Promise<changeUserPasswordInterface> => {
    const token = await getTokens();
    const payload = {
        password: dataPay.oldPass,
        newPassword: dataPay.newPass
    }
    const returnedData: changeUserPasswordInterface = { error: true, message: "Error In Change Password" }
    try {
        const data = await axios.patch("https://linked-posts.routemisr.com/users/change-password", payload, {
            headers: {
                token
            }
        })
        await setTokens(data.data.token)
        returnedData.error = false;
        returnedData.message = "Password Change Successfully"

    } catch (error) {
        if (axios.isAxiosError(error)) {
            returnedData.error = true;
            returnedData.message = error?.response?.data.error + "";
        }
    }
    return returnedData
}


