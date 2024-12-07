import * as Yuo from "yup"


export const SignUpSchema = Yuo.object({
    name: Yuo.string().min(5).max(10).required(),
    email: Yuo.string().email().required("Email is Requiredss"),
    password: Yuo.string().matches(/^[A-Z][A-Za-z0-9!@#$%^&*]{6,}$/, "password must be matches Like => {Name123456}").required(),
    rePassword: Yuo.string().oneOf([Yuo.ref("password")], "Password and repassword Not Match").required(),
})


