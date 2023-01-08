import ArticleList from "@components/community/ArticleList";
import CategoryNav from "@components/community/CategoryNav";
import {
  CategoryNavDiv,
  CategoryNavButton,
} from "@components/community/CategoryNav/styled";
import WriteButton from "@components/community/WriteButton";
import { sprPetBookClient } from "@lib/API/axios/axiosClient";
import { articleRequest, categorySprRequest } from "@lib/API/petBookAPI";
import { CategoryItem } from "@lib/API/petBookAPI/types/categoryRequestSpr";
import useActiveCategory from "@lib/hooks/article/useActiveCategory";
import { createResource } from "@lib/hooks/common/useResource";
import { getHttpOnlyCookie } from "@lib/utils/httpOnlyCookie";
import { NextPage, NextPageContext } from "next";
import { useEffect } from "react";
import styled from "styled-components";

const ARTICLE_LIST = createResource({
  key: ["ARTICLE_LIST"],
  fetcher: articleRequest.article_list,
});

export const createArticleListResource = ({
  category,
  page,
}: {
  category: CategoryItem;
  page: number;
}) => {
  return {
    key: [...ARTICLE_LIST.key, category.name, page],
    fetcher: () =>
      ARTICLE_LIST.fetcher({
        categoryId: category.id === 0 ? "" : category.id,
        page: page - 1,
        size: 20,
      }),
  };
};

export const CATEGORY_LIST = createResource({
  key: ["CATEGORY_LIST"],
  fetcher: categorySprRequest.category_list,
});

type PetBookPage = NextPage<{
  token: string | null;
}> & {
  requiredResources?: [
    ReturnType<typeof createArticleListResource>,
    typeof CATEGORY_LIST
  ];
};

const ArticleListPage: PetBookPage = ({ token }) => {
  useEffect(() => {
    if (token) {
      sprPetBookClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [token]);
  const { categoryName } = useActiveCategory();
  return (
    <Main>
      <h1>{categoryName}</h1>
      <CategoryNav />
      <ArticleList />
      <WriteButton />
    </Main>
  );
};

ArticleListPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<{ token: string | null }> => {
  const token = await getHttpOnlyCookie({ ctx, key: "petBookUser" });
  if (token) {
    sprPetBookClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  const { query } = ctx;
  const page = Number(query.page);
  const [name, id] = (query.category as string).split("_");
  ArticleListPage.requiredResources = [
    createArticleListResource({
      category: { id: Number(id), name },
      page: Number.isNaN(page) ? 1 : page,
    }),
    CATEGORY_LIST,
  ];
  return {
    token: token === undefined || token === "" ? null : token,
  };
};

const Main = styled.main`
  max-width: 1330px;
  width: 100%;
  margin: 0 auto;
  padding: 52px 35px;
  h1 {
    color: var(--black_01);
    font-weight: 700;
    line-height: 50px;
    font-size: 34px;
    margin-bottom: 20px;
  }
  ${CategoryNavDiv} {
    gap: 8px;
  }
  ${CategoryNavButton} {
    width: 110px;
    height: 44px;
  }
`;

export default ArticleListPage;
