import { Song } from "@prisma/client"
import { QueryFunction, UseQueryOptions } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const queryKey = ["api/songs"]

type QueryData = {
  songs: Song[]
}

const queryFn: QueryFunction<QueryData, (string | undefined)[]> = async (
  context
) => {
  try {
    const apiEndpoint = context.queryKey[0]
    const res = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${apiEndpoint}`,
    })
    return res.data
  } catch (err) {
    return Promise.reject(err)
  }
}

const optionsWrapper = (
  options?: Omit<UseQueryOptions, "queryKey">
): UseQueryOptions => {
  return {
    queryKey,
    queryFn,

    // https://tanstack.com/query/latest/docs/react/guides/query-retries
    retry: false,

    refetchInterval: 5 * 1000, // 5 secs

    ...(options as any),
  }
}

const useQueryWrapper = (options?: Omit<UseQueryOptions, "queryKey">) => {
  return useQuery<QueryData>(optionsWrapper(options) as any)
}

const GetSongs = {
  queryKey,
  queryFn,
  optionsWrapper,
  useQueryWrapper,
}

export default GetSongs
