interface ColumnProps {
    id: number;
    title: string;
    avatar?: string;
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
