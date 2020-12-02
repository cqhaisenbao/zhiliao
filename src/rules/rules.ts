//文章规则
export const titleRules: RulesProp = [
    {type: 'required', message: '文章标题不能为空'}
];
export const contentRules: RulesProp = [
    {type: 'required', message: '文章详情不能为空'}
];

//登录规则
export const emailRules: RulesProp = [
    {type: 'required', message: '电子邮箱地址不能为空'},
    {type: 'email', message: '请输入正确的电子邮箱格式'}
];

export const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const passwordRules: RulesProp = [
    {type: 'required', message: '密码不能为空'}
];

export const nameRules: RulesProp = [
    {type: 'required', message: '昵称不能为空'}
];


