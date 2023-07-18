import styled from "styled-components";

export const TagWrap = styled.div`
  display: inline;

  margin-right: 0.5rem;

  .tagText {
    padding: 0.25rem 1rem;

    border-radius: 2.5rem;

    background-color: var(--bg_white_02);

    font-size: 0.875rem;
    color: var(--black_03);
  }
`;

export const BoxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 24px;

  margin-top: 1.5625rem;

  background-color: var(--bg_white_01);
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2rem 1.5rem 1.25rem;

  border-radius: 16px;
  p {
    font-weight: bold;
    font-size: 1.125rem;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;

    color: gray;
  }

  background-color: white;
`;

export const RecommendContent = styled.div`
  .Content_Wrap {
    margin-bottom: 2.5rem;

    font-size: 1.125rem;
    color: var(--black_01);
  }
`;
