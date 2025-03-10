import { sprPetBookClient } from "@lib/API/axios/axiosClient";
import AuthRequest from "@lib/API/petBookAPI/authRequest";
import { ProxyLoginRequest } from "@lib/API/petBookAPI/types/authRequest";
import localConsole from "@lib/utils/localConsole";
import CookieService from "../service/CookieService";
import { cookieKeyName } from "@lib/globalConst";
import { AxiosError } from "axios";
import setResStatus from "@lib/utils/setResStatus";

const authRequestOrigin = new AuthRequest(
  process.env.NEXT_PUBLIC_SPR_URL,
  "/api/v1",
  sprPetBookClient
);

export default class AuthController extends CookieService {
  public login = async () => {
    try {
      const { email, password, isSave } = this.nextReq
        .body as ProxyLoginRequest;

      const tokenResult = await authRequestOrigin.login({
        email,
        password,
      });

      if (tokenResult.response.data && tokenResult.response.data.token) {
        this.setCookie(
          cookieKeyName.userToken,
          tokenResult.response.data.token,
          isSave
        );
      }

      this.nextRes
        .status(tokenResult.response.status || 200)
        .json(tokenResult.response.data || null);
    } catch (err) {
      const error = err as AxiosError;

      this.nextRes
        .status(setResStatus(error.response?.status))
        .json(error.response?.data || null);
    }
  };

  public logout = () => {
    const result = this.removeCookie(cookieKeyName.userToken);
    this.nextRes.status(200).json(result);

    return result;
  };
}
