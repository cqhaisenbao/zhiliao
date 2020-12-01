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
    _id: string;
    title: string;
    excerpt?: string;
    content?: string;
    image?: ImageProps;
    createdAt: string;
    column: string;
}


type RulesProp = RuleProp[]

interface RuleProp {
    type: 'required' | 'email' | 'password';
    message: string;
}

interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: string;
    columnId?: number;
}

interface GlobalDataProps {
    loading: boolean
    columns: ColumnProps[]
    posts: PostProps[]
    user: UserProps;
}
