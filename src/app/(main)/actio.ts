import { Token } from "@/auth";
import axios from "axios"
import { cookies } from "next/headers";
import { cache } from "react";





export const getUserData = cache(
    async () => {
        const cookieStore = await cookies();
        const token: Token | undefined = cookieStore.get("token");

        return await axios.get("https://linked-posts.routemisr.com/users/profile-data", {
            headers: {
                token: token?.value
            }
        }).then(({ data }) => {
            return data.user;
        }).catch(() => {
            return ""
        })

    }
)



