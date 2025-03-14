import type { NextPage } from "next";
import {
  articleQueryKey,
  categoryQueryKey,
  commentQueryKey,
  hospitalQueryKey,
} from "@lib/globalConst/queryKey";
import { PageProps } from "@pages/_app";
import { QueryKey } from "@tanstack/react-query";

export type Parameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer R
) => any
  ? R
  : never;

export const createKey = <K>(name: QueryName, ...args: K[]) => {
  if (!args[0]) return [name];
  if (args.length === 0) return [name];
  return [name, args[0]] as QueryKey;
};

export type NextPageWithOptions = NextPage<PageProps> & {
  noRecoil?: boolean;
};

export type QueryName =
  | typeof hospitalQueryKey.list
  | typeof hospitalQueryKey.detail
  | typeof hospitalQueryKey.reviewList
  | typeof articleQueryKey.list
  | typeof articleQueryKey.detail
  | typeof articleQueryKey.popular
  | typeof articleQueryKey.preview
  | typeof articleQueryKey.search
  | typeof commentQueryKey.list
  | typeof categoryQueryKey.list;
