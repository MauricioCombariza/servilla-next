import { AuthContextProps } from "../Auth"

export interface SignupType {
    auth?: AuthContextProps
    API: string
    email: string | null
    username: string | null
    company: string | null
    password: string | null
    confirmPassword: string | null
}



const usePostSignup = async ( signupData: SignupType ) => {
    const res = await fetch(signupData.API, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${signupData.email}&username=${signupData.username}&company=${signupData.company}&password=${signupData.password}&confirmPassword=${signupData.confirmPassword}`,
    });
    const data = await res.json();
    if (res.ok) {
      await signupData.auth?.signup();
    }
    const answer = data["detail"];
    return answer;
  };
  
  export { usePostSignup };
  