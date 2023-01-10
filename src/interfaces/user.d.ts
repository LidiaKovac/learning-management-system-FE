interface User {
    user_id: number;
    name: string;
    last_name: string;
    email: string;
    role: string;
    pronouns: string;
    birthday: string;
    profile_picture: string;
  }
  
  interface LoggedUser {
    name: string | null;
    last_name: string | null;
    email: string | null;
    role: string | null
    status: string | null;
  }