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
