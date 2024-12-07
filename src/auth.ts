
"use server"

import { jwtDecode } from "jwt-decode";

import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect";

import { redirect } from "next/navigation";

export interface Token {
    value: string;
    name: string;
}



export const validationReq = async () => {
    try {
        const cookieStore = await cookies();
        const token: Token | undefined = cookieStore.get("token");
        if (!token) return redirect("/singup");
        const decode: { user: string, iat: number } = jwtDecode(token.value);
        return decode.user;
    } catch (error) {
        if (isRedirectError(error)) throw error;
        else {
            return redirect("/singup");
        }
    }
}

export const validationReqRegest = async () => {
    try {
        const cookieStore = await cookies();
        const token: Token | undefined = cookieStore.get("token");
        if (!token) return { error: true };
        const decode: { user: string, iat: number } = jwtDecode(token.value);
        if (decode.user) {
            return redirect("/");
        }
    } catch (error) {
        if (isRedirectError(error)) throw error;
        else {
            return { error: true };
        }
    }
}
