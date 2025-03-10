import loadingState from "@atoms/common/loadingState";
import writeState, {
  WriteStateType,
} from "@atoms/pageAtoms/community/writeState";
import { ArticleResponse } from "@lib/API/petBookAPI/types/articleRequest";
import localConsole from "@lib/utils/localConsole";
import React, { MouseEventHandler } from "react";
import { useSetRecoilState } from "recoil";
import useLoaderNavigate from "../common/useLoaderNavigate";
import { useSetResource } from "../common/useResource";
import { ARTICLE_CREATE } from "@lib/resources/articleResource";
import { IMG_CREATE } from "@lib/resources/commonResource";

const multipartHeader = { "Content-Type": "multipart/form-data" };

const useWriteSubmit = () => {
  const articleMutation = useSetResource(ARTICLE_CREATE);
  const imgMutation = useSetResource(IMG_CREATE);

  const setLoading = useSetRecoilState(loadingState);

  const { navigator } = useLoaderNavigate();
  const setWrite = useSetRecoilState(writeState);

  const defaultSubmit = async ({
    write,
    imgIds,
  }: {
    write: WriteStateType;
    imgIds?: number[];
  }) => {
    try {
      const mutateState = await articleMutation.mutateAsync({
        body: {
          title: write.inputTitle,
          content: write.inputContent,
          categoryId: write.selectedCategory.idx + 1,
          tags: write.inputHash,
          imgIds,
        },
      });

      const responseData = mutateState.response.data as ArticleResponse;

      localConsole?.log(mutateState.response.statusText);

      if (
        mutateState.response.status === 201 ||
        mutateState.response.statusText === "Created"
      ) {
        setLoading(false);

        navigator({
          url: `/community/list/${responseData.id}`,
        });
      }
    } catch (err) {
      setLoading(false);
      window.alert(err);
      localConsole?.error(err);
    }
  };

  const withImgSubmit = async (write: WriteStateType) => {
    try {
      const mutateState = await imgMutation.mutateAsync({
        header: multipartHeader,
        body: {
          fileList: write.inputFile as File[],
        },
      });

      if (
        mutateState.response.status === 201 ||
        mutateState.response.statusText === "Created" ||
        mutateState.response.status === 200 ||
        mutateState.response.statusText === "OK"
      ) {
        const imgIds = mutateState.response.data.map((res) => {
          return res.id;
        });

        await defaultSubmit({ write, imgIds });
      }
    } catch (err) {
      setLoading(false);
      window.alert(err);
      localConsole?.error(err);
    }
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    setLoading(true);
    setWrite((write) => {
      localConsole?.log(write);

      if (
        typeof write.inputFile !== "undefined" &&
        Array.isArray(write.inputFile)
      ) {
        withImgSubmit(write);
        return { ...write };
      }

      defaultSubmit({ write }).then(() => {
        return {
          ...write,
          inputTitle: "",
          inputContent: "",
          inputHash: [],
          inputImg: [],
        };
      });
      return { ...write };
    });
  };

  return { onClick };
};

export default useWriteSubmit;
