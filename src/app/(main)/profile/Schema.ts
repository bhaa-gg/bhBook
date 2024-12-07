import * as Yuo from "yup"


export const ChangePassSchema = Yuo.object({
    oldPass: Yuo.string().matches(/^[A-Z][A-Za-z0-9!@#$%^&*]{6,}$/, "password must be matches Like => {Name123456}").required(),
    newPass: Yuo.string().matches(/^[A-Z][A-Za-z0-9!@#$%^&*]{6,}$/, "password must be matches Like => {Name123456}").required(),
})


