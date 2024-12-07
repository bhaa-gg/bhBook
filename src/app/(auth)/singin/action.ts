"use server"

import axios, { AxiosError } from "axios"
import { cookies } from 'next/headers'

import { redirect } from "next/navigation"
import { isRedirectError } from "next/dist/client/components/redirect"
import { resValues, SignInValues } from "./types"


interface ErrorResponse {
    error: string;
}

export const signIn = async (datas: SignInValues): Promise<{ error: string }> => {
    const cookieStore = await cookies()

    try {
        const data = await axios.post<resValues>("https://linked-posts.routemisr.com/users/signin", datas)
        cookieStore.set("token", data.data.token,)
        return redirect("/")
    } catch (err: unknown) {
        if (isRedirectError(err)) throw err;
        else {
            const axiosError = err as AxiosError;
            return { error: (axiosError?.response?.data as ErrorResponse)?.error + "" }

        }

    }
}