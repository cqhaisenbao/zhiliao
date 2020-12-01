interface ColumnProps {
    _id: string;
    title: string;
    avatar?: ImageProps;
    description: string;
}

interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: number;
}

interface RuleProp {
    type: 'required' | 'email' | 'password';
    message: string;
}

interface ImageProps {
    _id?: string,
    url?: string,
    createdAt?: string
}

type RulesProp = RuleProp[]

interface PostProps {
    id: number;
    title: string;
    content: string;
    image?: string;
    createdAt: string;
    columnId: number;
}

interface UserProps {
    isLogin: boolean;
    name?: string;
    id?: string;
    columnId?: number;
}

interface GlobalDataProps {
    columns: ColumnProps[]
    posts: PostProps[]
    user: UserProps;
}
