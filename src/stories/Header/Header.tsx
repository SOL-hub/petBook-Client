import loadingState from "@atoms/common/loadingState";
import { sprPetBookClient } from "@lib/API/axios/axiosClient";
import { authRequest } from "@lib/API/petBookAPI";
import useUserInfo from "@lib/hooks/common/useUserInfo";
import useNavController from "@lib/hooks/header/useNavController";
import DecodedUserInfo from "@lib/types/DecodedUserInfo";
import localConsole from "@lib/utils/localConsole";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import { useSetRecoilState } from "recoil";
import {
  HeaderBox,
  HeaderDiv,
  HeaderLogoLink,
  HeaderLogoutButton,
  HeaderPersonalDiv,
  HeaderUserInfoA,
} from "./Header.style";
import { cookieKeyName } from "@lib/globalConst";
import headerImg from "@/image/headerImg";
import ResponsiveImage from "../common/ResponsiveImage";
import Menu from "./Menu";

interface Props {
  maxWidth?: string;
  position?: "fixed" | "absolute" | "relative";
}

const Header = ({ maxWidth, position }: Props) => {
  const { userData } = useUserInfo();
  localConsole?.log(userData, "userData");
  return (
    <Header.Wrap maxWidth={maxWidth} position={position}>
      <Header.Logo />
      <Header.MenuNav />
      <Header.Personal isLoggedUser={!!userData}>
        {userData ? <Header.UserInfo userData={userData} /> : <Header.Auth />}
      </Header.Personal>
    </Header.Wrap>
  );
};

const Wrap = ({
  children,
  maxWidth,
  position,
}: PropsWithChildren<{
  maxWidth?: string;
  position?: "fixed" | "absolute" | "relative";
}>) => {
  return (
    <HeaderBox className="Header__Wrap" maxWidth={maxWidth} position={position}>
      <HeaderDiv>{children}</HeaderDiv>
    </HeaderBox>
  );
};

const Logo = () => {
  return (
    <HeaderLogoLink href="/">
      <ResponsiveImage
        src={headerImg.illust_img_placeholder}
        alt="일러스트 플레이스 홀더"
        boxwidth="40px"
        boxheight="40px"
        fill
      />
      <ResponsiveImage
        src={headerImg.petbook_logo}
        alt="펫북 로고 타이틀"
        boxwidth="147.35px"
        boxheight="26.65px"
        fill
      />
    </HeaderLogoLink>
  );
};

const MenuNav = () => {
  const [isNeedNav] = useNavController();

  return <>{isNeedNav ? <Menu isHeaderMenu /> : <div />}</>;
};

interface PersonalProps {
  isLoggedUser: boolean;
}

const Personal = ({
  children,
  isLoggedUser,
}: PropsWithChildren<PersonalProps>) => {
  localConsole?.log(isLoggedUser, "isLoggedUser");

  return (
    <HeaderPersonalDiv isLoggedUser={isLoggedUser}>
      {children}
    </HeaderPersonalDiv>
  );
};

const UserInfo = ({ userData }: { userData: DecodedUserInfo }) => {
  const client = useQueryClient();
  const setLoading = useSetRecoilState(loadingState);

  const onClick = async () => {
    setLoading(true);
    if (window.confirm("로그아웃 하실건가요?")) {
      const res = await authRequest.logout();

      if (res.response.data) {
        client.setQueryData([cookieKeyName.userInfo], "");
        sprPetBookClient.defaults.headers.common.Authorization = "";
      }

      if (!res.response.data) {
        alert(
          "로그아웃 시도에 실패했습니다. 인터넷이 연결되지 않았거나 서버 응답에 문제가 있을수 있습니다. 새로고침후 다시 시도해주시기 바랍니다."
        );
      }

      setLoading(false);
    }
  };

  return (
    <>
      <HeaderUserInfoA
        className="Header__Username"
        href={`/mypage/${userData.id}`}
      >
        {userData.iss} 님
      </HeaderUserInfoA>
      <HeaderLogoutButton className="Header__Logout" onClick={onClick}>
        로그아웃
      </HeaderLogoutButton>
    </>
  );
};

const Auth = () => {
  return (
    <>
      <Link className="Header__Login" href="/login">
        로그인
      </Link>
      &nbsp;&middot;&nbsp;
      <Link className="Header__Register" href="/register">
        회원가입
      </Link>
    </>
  );
};

Header.Wrap = React.memo(Wrap);
Header.Logo = Logo;
Header.MenuNav = React.memo(MenuNav);
Header.Personal = Personal;
Header.UserInfo = UserInfo;
Header.Auth = Auth;

export default Header;
