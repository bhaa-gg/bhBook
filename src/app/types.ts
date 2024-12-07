
export type CommentType = {
    _id: string,
    content: string,
    commentCreator: UserType,
    post: undefined | string,
    createdAt: string,
}
export type UserType = {
    _id: string,
    name: string,
    photo: string,
    email?: string,
    dateOfBirth?: string,
    userPosts?: PostType[],
    loadingBtn?: boolean,
}

export type PostType = {
    _id: string,
    body: string,
    createdAt: string,
    user: UserType,
    image?: string,
    comments?: CommentType[],
}