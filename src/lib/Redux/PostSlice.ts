"use client"
import { getPosts } from "@/app/_utils/post";
import { PostType } from "@/app/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const getPostThunk = createAsyncThunk("post/getPost", async (oldData?: PostType[]) => {
    if (oldData?.length) {
        return getPosts();
    } else {
        return getPosts(oldData);
    }
})



export interface PostData {
    fetchPostsLoading: boolean,
    editPost: PostType | null,
    allPosts: PostType[] | null,
    allPostsPages: PostType[] | null,
    MyPosts: PostType[] | null,

}

const initialState: PostData = {
    fetchPostsLoading: false,
    editPost: null,
    allPosts: null,
    allPostsPages: null,
    MyPosts: null,
}
const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPosts: (state, { payload }) => {
            state.allPosts = payload
        },
        putMyPosts: (state, { payload }) => {
            state.MyPosts = payload
        },
        updateEditPost: (state, { payload }) => {
            state.editPost = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPostThunk.fulfilled, (state, { payload }) => {
            state.fetchPostsLoading = false;
            state.allPosts = payload.slice(0, 10)
            state.allPostsPages = payload;

        })
        builder.addCase(getPostThunk.pending, (state) => {
            state.fetchPostsLoading = true;
        })
    },
});


export const PostReducer = postSlice.reducer
export const { setPosts, putMyPosts, updateEditPost } = postSlice.actions