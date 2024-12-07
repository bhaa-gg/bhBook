"use server"
import { Token } from "@/auth";
import axios from "axios"
import { cookies } from "next/headers"
import { PostType } from "../types";





export const getSinglePost = async (postId: string) => {
    const cookieStore = await cookies();
    const token: Token | undefined = cookieStore.get("token");

    return await axios.get(`https://linked-posts.routemisr.com/posts/${postId}`, {
        headers: {
            token: token?.value
        }
    }).then(({ data }) => {
        return data.post
    }).catch(() => {
        return false;
    })

}

export const getPosts = async (oldData?: PostType[]) => {
    const cookieStore = await cookies();
    const token: Token | undefined = cookieStore.get("token");

    return await axios.get("https://linked-posts.routemisr.com/posts", {
        headers: {
            token: token?.value
        }
    }).then(({ data }) => {
        let finalData: PostType[];
        if (oldData?.length) {
            const notIncludedInArr2 = data.posts.filter((item: PostType) => !oldData.some(obj => obj._id === item._id));
            finalData = [...oldData, ...notIncludedInArr2];
            return finalData;
        }

        return data.posts;
    }).catch(() => {
        return ""
    })

}


export const getUserPosts = async (userId: string, oldData?: PostType[], caption?: string): Promise<PostType[] | []> => {

    let returnedData: [] | PostType[] = [];
    const cookieStore = await cookies();
    const token: Token | undefined = cookieStore.get("token");


    await axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts`,
        {
            headers: {
                token: token?.value
            }
        }
    )
        .then(({ data }) => {
            if (oldData?.length) {
                const notIncludedInArr2: PostType = data.posts.find((item: PostType) => item.body.trim() == caption);
                console.log({ notIncludedInArr2 });

                returnedData = [notIncludedInArr2, ...oldData]
            } else {
                returnedData = data.posts
            }
        })
        .catch(() => {
            returnedData = []
        })

    return returnedData;
}

export const ceratePost = async (payload: FormData) => {
    const cookieStore = await cookies();
    const token: Token | undefined = cookieStore.get("token");

    return await axios.post("https://linked-posts.routemisr.com/posts", payload, {
        headers: {
            token: token?.value
        }
    }).then(() => {

        return "Success"
    }).catch((err) => {
        console.log(err)
        return ""
    })
}

export const addPost = async (newPost: PostType, oldData: PostType[]) => {
    const newPostss = [newPost, ...oldData];
    await new Promise((r) => setTimeout(r, 1000));
    return newPostss
}

export const deletePost = async (postId: string) => {
    const cookieStore = await cookies();
    const token: Token | undefined = cookieStore.get("token");

    axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
        headers: {
            token: token?.value
        }
    }).then(() => console.log("delete post")
    )
        .catch(() => false)

}





export interface updatePostInter {
    post: PostType | null
}
export const updatePost = async (postId: string, payload: FormData): Promise<updatePostInter> => {
    const cookieStore = await cookies();
    const token: Token | undefined = cookieStore.get("token");
    const returnedData: updatePostInter = { post: null };

    await axios.put(`https://linked-posts.routemisr.com/posts/${postId}`, payload,
        {
            headers: {
                token: token?.value
            }
        }).then(({ data }) => {
            returnedData.post = data.post
            console.log(returnedData.post)
        })



    return returnedData
}





