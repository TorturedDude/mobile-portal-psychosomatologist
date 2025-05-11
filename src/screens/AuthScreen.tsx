import { Auth } from "../components/Auth";
import { Profile } from "../components/Profile";
import { useAuth } from "../hooks/useAuth";


export function AuthScreen() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Profile /> : <Auth />;
}