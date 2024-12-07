"use server"

import { Token } from "@/auth";
import axios from "axios";
import { cookies } from "next/headers";
import { CommentType } from "../types";



export interface CommentCreateProps {

    content: string
    post: string
}



export interface CommentCreateReturnd {
    message: string
    comments: CommentType[] | []
}

export interface CommentUpdateReturnd {
    message: string
    comments: CommentType | string
}



export const createComments = async (payload: CommentCreateProps): Promise<CommentCreateReturnd> => {

    const cookieStore = await cookies();
    const token: Token | undefined = cookieStore.get("token");
    const returnedData: CommentCreateReturnd = { message: "", comments: [] }
    await axios.post("https://linked-posts.routemisr.com/comments", payload, {
        headers: { token: token?.value }
    }).then(({ data }) => {
        returnedData.comments = data.comments
        returnedData.message = data.message
    })
    return returnedData

}

export const updateComment = async (id: string, content: string): Promise<CommentUpdateReturnd> => {

    const cookieStore = await cookies();
    const token: Token | undefined = cookieStore.get("token");

    const returnedData: CommentUpdateReturnd = { message: "", comments: "" }


    await axios.put(`https://linked-posts.routemisr.com/comments/${id}`, { content }, {
        headers: { token: token?.value }
    }).then(({ data }) => {
        returnedData.comments = data.comment
        returnedData.message = data.message
    })
    return returnedData

}