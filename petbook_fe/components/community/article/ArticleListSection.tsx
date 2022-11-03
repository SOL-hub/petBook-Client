import styled from "styled-components";
import CommunitySection from "../CommunitySection";
import ArticleList from "./ArticleList";
import PaginationButton from "./PaginationButton";
import CategoryFilter from "./CategoryFilter";
import SortFilter from "./SortFilter";

const ArticleListSection = () => {
  return (
    <CommunitySection
      title="Live talk"
      description="실시간 업로드되는 유저들의 이야기"
    >
      <ArticleListSectionDiv>
        <ArticleListSection.CategoryFilter /> {/** categoryState atom 공유 */}
        <ArticleListSection.SortFilter />
      </ArticleListSectionDiv>
      <ArticleListSection.List /> {/** categoryState atom 공유 */}
      <ArticleListSection.ButtonBox />
    </CommunitySection>
  );
};

ArticleListSection.CategoryFilter = CategoryFilter;
ArticleListSection.SortFilter = SortFilter;
ArticleListSection.List = ArticleList;
ArticleListSection.ButtonBox = PaginationButton;

const ArticleListSectionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export default ArticleListSection;
