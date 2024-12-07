"use server"
import { getUserData } from "../actio";
import { UserType } from "@/app/types";
import { cookies } from "next/headers";
import { Token } from "@/auth";
import axios from "axios";


export const getTokens = async () => {
    const cookieStore = await cookies();
    const token: Token | undefined = cookieStore.get("token");
    return token?.value;
}

export const setTokens = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set("token", token)
}



export const changeUserPicture = async (payload: FormData): Promise<UserType | false> => {
    const cookieStore = await cookies();
    const token: Token | undefined = cookieStore.get("token");
    let returnedData = false

    await axios.put(`https://linked-posts.routemisr.com/users/upload-photo`, payload, {
        headers: {
            token: token?.value
        },
    })
        .then(async () => {
            returnedData = await getUserData()
        })

    return returnedData;

}



