import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signIn} from "../service";
import { SignIn} from "../types";
import { openNotification } from "@utils";
import { saveAccesToken } from "../../../utils/token-service";


export function useSignInMutation() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (data: SignIn) => signIn(data),
        onSuccess: (response: any) => {
            openNotification('success', "Success", response?.data?.message);
            console.log(response?.access?.accesToken, "ehdefher");
            const access_token = response?.data?.data?.tokens?.access_token;
           

            const id = response.data?.data?.data?.id;
            // console.log(id, "hdejhhw");
            saveAccesToken(access_token);
            localStorage.setItem("id", id);
            navigate("/super-admin-panel");
        },
        onError: (error: any) => {
            openNotification('error', "Invalid username or password", error.data?.message,)
            console.log(error.data?.message,);

        }

        
    })
}


