import { jwtDecode } from 'jwt-decode';
import { json } from "react-router-dom";

export async function loginUser(creds) {
    const res = await fetch(`https://hospital-scan-arhive-sys.onrender.com/auth/login`,
        {
            method: 'post',
            body: JSON.stringify(creds),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const resData = await res.json();

    if (!res.ok && resData.error) {
        return {
            statusCode: resData.statusCode,
            message: resData.message,
            error: resData.error,
            path: resData.path
        }
    }

    // Decode token and get the payload
    const decodedToken = jwtDecode(JSON.stringify(resData.accessToken));
    console.log('Decoded Token: \n', decodedToken);

    const data = {
        ...resData,
        ...decodedToken
    }

    return data;
}