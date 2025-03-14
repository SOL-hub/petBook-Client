import Link from "next/link";
import { ArticleResponse } from "@lib/API/petBookAPI/types/articleRequest";
import DOMPurify from "isomorphic-dompurify";
import React from "react";
import { HeartOutline, HeartFilled } from "@/stories/Icon/Heart";
import { BookmarkOutline } from "@/stories/Icon/Bookmark";
import CommonInfo from "@components/community/CommonInfo";
import Pagination from "@/stories/common/Pagination";
import Skeleton from "@/stories/common/Skeleton";
import useArticleList from "./useArticleList";
import { ListDiv, Article, Text } from "./styled";

interface Props
  extends Pick<
    ReturnType<typeof useArticleList>,
    "articles" | "status" | "totalPages"
  > {
  emptyText: string;
}

const ArticleList = ({ status, articles, totalPages, emptyText }: Props) => {
  if (status === "loading") {
    return (
      <ListDiv>
        <Skeleton height="164px" borderRadius="16px" copy={20} />
      </ListDiv>
    );
  }
  if (articles.length === 0) {
    return (
      <ListDiv>
        <Text>{emptyText}</Text>
      </ListDiv>
    );
  }
  return (
    <ListDiv>
      {articles.map((article) => (
        <ArticleList.Item article={article} key={article.id} />
      ))}
      <Pagination totalPages={totalPages} buttonCntPerLine={10} />
    </ListDiv>
  );
};

// ----------------------------------------------------------------------

const Item = ({ article }: { article: ArticleResponse }) => {
  const { id, title, content, user, tags, stat, createdAt, isLike } = article;
  return (
    <Link href={`/community/list/${id}`} passHref>
      <Article>
        <h3>{title}</h3>
        <div
          className="Item_Content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />
        <div className="Item_Row">
          <div className="Item_Stats">
            <div className={isLike ? "like" : ""}>
              {isLike ? <HeartFilled /> : <HeartOutline />}
              <span>{stat.likeCount}</span>
            </div>
            <div>
              <BookmarkOutline />
              <span>0</span>
            </div>
          </div>
          <CommonInfo username={user.nickname} date={createdAt} year={1} />
        </div>
      </Article>
    </Link>
  );
};

ArticleList.Item = Item;

export default ArticleList;
