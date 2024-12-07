// "use server"

import axios, { AxiosError } from "axios"

import { redirect } from "next/navigation"
import { isRedirectError } from "next/dist/client/components/redirect"
import { SignUpValues } from './types';


interface ErrorResponse {
    error: string;
}

export const signUp = async (data: SignUpValues): Promise<{ error: string }> => {
    const as = { ...data, gender: "male", dateOfBirth: "2000-01-01" }

    try {
        await axios.post<{ error: string }>("https://linked-posts.routemisr.com/users/signup", as)
        return redirect("/singin")
    } catch (err) {
        if (isRedirectError(err)) throw err;
        else {
            const axiosError = err as AxiosError;
            return { error: (axiosError?.response?.data as ErrorResponse)?.error + "" }
        }
    }
}