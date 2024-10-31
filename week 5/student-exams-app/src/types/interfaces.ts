export interface StudentData {
    student_id?: number;
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: number;
    created_by_user_id?: number;
}

export interface UserData {
    user_id?: number;
    role: string;
}

export interface AuthRequest extends Request {
    user?: { userId: string; role: string };
}