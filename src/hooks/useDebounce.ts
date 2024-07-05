/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from "lodash";
import { useCallback } from "react";

interface SetDebounceKeywordOptions {
  text: string
  callback?: (text: string) => void;
}

export function useDebounce() {
  const onSetDebounceKeyword = useCallback(
    debounce(({ text, callback = () => { } }: SetDebounceKeywordOptions) => callback(text), 700),
    []
  );
  return {
    onSetDebounceKeyword
  }
}