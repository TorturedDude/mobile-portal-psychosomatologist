export interface IUserEdit{
    email: string,
    password: string,
}

export interface IUser{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
}

export interface IUserCreate extends IUser{
    password: string,
}

export interface IPostCreate {
    title: string,
    description: string,
    publishDate: Date
}

export interface IPost extends IPostCreate{
    id: number,
}

export interface ICourseCreate{
    title: string,
    description: string,
    duration: number,
    price: number,
    startDate: Date,
}

export interface ICourse extends ICourseCreate {
    id: number,
}