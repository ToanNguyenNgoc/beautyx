import commentsApi from "api/commentsApi";
import IStore from "interface/IStore";
import { ParamComment } from "params-query/param.interface";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BodyComment, IComment } from "interface";

export interface Options {
    fetchComments?: boolean
}
export interface PostComment {
    body: BodyComment,
    onSuccess?: (comment: IComment) => void,
    onError?: () => void
}

export function useComment(param?: ParamComment, options?: Options) {
    const history = useHistory()
    const { USER } = useSelector((state: IStore) => state.USER)

    const KEY = ['COMMENT', param]
    const client = useQueryClient()
    const { data, isLoading: loadComment } = useInfiniteQuery({
        queryKey: KEY,
        queryFn: ({ pageParam = 1 }) => commentsApi.finAll(
            param ? { ...param, 'page': pageParam }
                :
                { 'filter[commentable_type]': 'ORGANIZATION', 'filter[commentable_id]': 1 }
        ),
        enabled: options?.fetchComments ? true : false,
    })
    const { mutateAsync, isLoading: loadPost } = useMutation({
        mutationFn: (body: BodyComment) => commentsApi.create(body),
        onSuccess: () => client.invalidateQueries({ queryKey: KEY })
    })

    const comments = data?.pages.map(i => i.context.data).flat() || []
    const totalItem = data?.pages[0]?.context?.total || 1
    const postComment = async ({ body, onSuccess = () => { }, onError = () => { } }: PostComment) => {
        if (!USER) return history.push("/sign-in?1")
        const data = await mutateAsync(body)
        if (data.context) { onSuccess(data.context) }
        else { onError() }
    }
    const mutatePostCommentOrder = useMutation({
        mutationFn: (body: any) => commentsApi.postCommentOrder(body)
    })
    return {
        loadComment,
        comments,
        loadPost,
        postComment,
        mutatePostCommentOrder,
        totalItem
    }
}