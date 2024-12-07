import * as Yuo from "yup"


export const SignInSchema = Yuo.object({
    email: Yuo.string().email().required("Email is Requiredss"),
    password: Yuo.string().matches(/^[A-Z][A-Za-z0-9!@#$%^&*]{6,}$/, "password must be matches Like => {Name123456}").required(),
})


