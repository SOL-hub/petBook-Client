import PencilEdit from "@/stories/Icon/PencilEdit";
import Link from "next/link";
import { StyledWriteButton } from "./styled";

const WriteButton = () => {
  return (
    <Link href="/community/write" passHref>
      <StyledWriteButton>
        <PencilEdit />
        글쓰기
      </StyledWriteButton>
    </Link>
  );
};

export default WriteButton;
