interface ColumnProps {
    _id: string;
    title: string;
    avatar?: ImageProps;
    description: string;
}

interface ImageProps {
    _id?: string,
    url?: string,
    createdAt?: string
}

interface PostProps {
    _id?: string;
    title: string;
    excerpt?: string;
    content?: string;
    image?: ImageProps;
    createdAt?: string;
    column: string;
}

interface ResponseType<P = {}> {
    code: number;
    msg: string;
    data: P;
}

type RulesProp = RuleProp[]

type MessageType = 'success' | 'error' | 'default'

interface RuleProp {
    type: 'required' | 'email' | 'password' | 'custom';
    message: string;
    validator?: () => boolean
}

interface UserProps {
    isLogin: boolean;
    nickName?: string;
    _id?: string;
    column?: string;
    email?: string
}

interface GlobalDataProps {
    error: GlobalErrorProps
    token: string
    loading: boolean
    columns: ColumnProps[]
    posts: PostProps[]
    user: UserProps;
}

interface GlobalErrorProps {
    status: boolean;
    message?: string;
}

interface ResponseType<P = {}> {
    code: number;
    msg: string;
    data: P;
}

type TagType = 'input' | 'textarea'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
