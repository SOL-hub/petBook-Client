import React from "react";
import styled from "styled-components";
import CommunityBanner from "@components/community/CommunityBanner";
import WriteButton from "@components/community/WriteButton";
import CommunitySection from "@components/community/CommunitySection";
import HotArticleList from "@components/community/HotArticleList";
import CategoryNav from "@components/community/CategoryNav";
import ArticlePreviewList from "@components/community/ArticlePreviewList";
import QnaArticleList, {
  QNA_CATEGORY,
} from "@components/community/QnaArticleList";
import getHrefWithCategory from "@lib/utils/gerHrefWithCategory";
import Link from "next/link";
import SearchBar from "@components/common/SearchBar";

import {
  ARTICLE_LIST_PREVIEW,
  ARTICLE_POPULAR_LIST,
} from "@lib/resources/articleResource";
import commonServerSideProps from "@lib/server/commonServerSideProps";
import { CATEGORY_LIST } from "@lib/resources/commonResource";
import { NextPageWithOptions } from "@lib/queries";

const Community: NextPageWithOptions = () => {
  return (
    <Main>
      <CommunityBanner />
      <CommunitySection
        title="지금 당신의 답변을 기다리고 있어요"
        sideElement={
          <Link href={getHrefWithCategory(QNA_CATEGORY)} passHref>
            <button type="button">더보기</button>
          </Link>
        }
      >
        <QnaArticleList />
      </CommunitySection>
      <CommunitySection title="이번주 hot 인기글">
        <HotArticleList />
      </CommunitySection>
      <CommunitySection
        title="실시간 live talk"
        sideElement={
          <SearchBar
            placeholder="관심있는 내용을 검색해보세요!"
            keywordBox={false}
          />
        }
      >
        <CategoryNav />
        <ArticlePreviewList />
      </CommunitySection>
      <WriteButton />
    </Main>
  );
};

const Main = styled.main`
  width: 100%;
  max-width: 1330px;
  margin: 0 auto;
  padding: 52px 35px 0;
  margin-bottom: 100px;
`;

export const getServerSideProps = commonServerSideProps([
  CATEGORY_LIST,
  ARTICLE_POPULAR_LIST,
  ARTICLE_LIST_PREVIEW,
]);

export default Community;
// {"message":"timeout of 10000ms exceeded","name":"AxiosError","config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"transformRequest":[null],"transformResponse":[null],"timeout":10000,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{},"headers":{"Accept":"*/*","Content-Type":"application/json","Authorization":"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwZXRib29rIiwiaWQiOiIxIiwiaWF0IjoxNjgxNjMzMDkzLCJlbWFpbCI6InRlc3RAcGV0Ym9vay5jb20ifQ.fCIsSBsyMnfJaZWM8_pr7MfahVFbUCIKCkyIqhUvUis","User-Agent":"axios/0.27.2"},"method":"get","url":"https://api.petbook.site/api/v1/board/category/list"},"code":"ECONNABORTED","status":null}
