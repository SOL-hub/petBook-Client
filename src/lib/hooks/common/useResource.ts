import { QueryName, createKey } from "@lib/queries";
import { Resource, ResourceParams, ResourceResult } from "@lib/resources";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import useServerQueryData from "./useServerQueryData";
import { GetResultReturn } from "@lib/API/petBookAPI/RequestCore";
import localConsole from "@lib/utils/localConsole";
import { AxiosError } from "axios";
/**
 * @function useResource : GET 요청 결과를 받아오는 useQuery 를 내포한 Hook
 *
 * @param resource : Page Component 에서 명시한 createResource 의 형식과 같습니다.
 * @param payload : 새로운 파라미터로 GET 요청 할때 사용합니다.
 * @returns useQuery 의 state 를 그대로 반환합니다.
 *
 */
export function useResource<P = ResourceParams, T = ResourceResult>({
  resource,
  payload,
}: {
  resource: Resource<P, T>;
  payload?: P;
}) {
  // 서버에서 사용한 각 페이지 리소스에 대한 쿼리 데이터를 가져옵니다.
  const { serverData, clientHydrated } = useServerQueryData<P, T>(resource);

  // 서버에서 사용한 쿼리 데이터가 있고, 클라이언트가 아직 hydration 되지 않았다면
  // 서버에서 사용한 쿼리 데이터를 클라이언트에 적용합니다.
  if (serverData) {
    // TODO: && clientHydrated.current === false
    resource.querykey = serverData.querykey;

    if (serverData.params) {
      resource.params = serverData.params;
    }
  } else {
    // 서버에서 사용한 쿼리 데이터가 없다면, 새로운 파라미터로 쿼리 키를 생성합니다.
    resource.querykey = createKey(resource.name, payload);

    if (payload) {
      resource.params = payload;
    }
  }

  // 새로운 파라미터가 들어왔다면, 새로운 파라미터로 쿼리 키를 생성합니다.
  if (payload && resource.params !== payload) {
    // TODO : && clientHydrated.current === true
    resource.querykey = createKey(resource.name, payload);
    resource.params = payload;
  }

  // 클라이언트에서 사용할 fetcher 를 생성합니다.
  const paramFetcher = () => {
    return resource.fetcher(resource.params as P);
  };

  return useQuery<GetResultReturn<T, P>, AxiosError<T>>(
    resource.querykey as QueryKey,
    paramFetcher
  );
}

export function createResource<
  P extends ResourceParams,
  T extends ResourceResult
>(resource: {
  name: QueryName;
  fetcher: (payload: P) => Promise<GetResultReturn<T, P>>;
}): Resource<P, T> {
  const resultResource: Resource<P, T> = {
    ...resource,
    createKey,
  };

  return resultResource;
}

export function createListResource<
  P extends ResourceParams,
  T extends ResourceResult
>(params: {
  name: QueryName;
  fetcher: (payload: P) => Promise<GetResultReturn<T, P>>;
  listLength: number;
}): Resource<P, T>[] {
  const resourceList = new Array(params.listLength).fill("").map((_, idx) => {
    const resultResource: Resource<P, T> = {
      ...params,
      isList: true,
      idx,
      createKey,
    };

    return resultResource;
  });

  return resourceList;
}

export function useSetResource<T, P>(request: {
  key: QueryKey;
  requester: (reqBody: P) => Promise<T>;
}) {
  return useMutation({
    mutationKey: request.key,
    mutationFn: request.requester,
  });
}

export function createRequest<T, P>(request: {
  key: QueryKey;
  requester: (reqBody: P) => Promise<T>;
}) {
  return {
    key: request.key,
    requester: request.requester,
  };
}
