export interface LoginData {
    email: String
    password: String
}

export interface JoinData {
    name: String
    last_name: String
    birthday: String
    pronouns: String
    role: String
    email: String
    password: String
}

export interface JoinData_w_conf extends JoinData {
    password_conf: String
}