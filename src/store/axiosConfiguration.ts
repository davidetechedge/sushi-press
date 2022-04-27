
import { useEffect } from "react";
import axios from "axios";

export enum APIStatus { IDLE, PENDING, REJECTED, FULFILLED }

export type APIError = {
  message: string,
  code: string
};

export type APIData<DataType = any> = {
    status: APIStatus,
    error?: APIError,
    data?: DataType
}

export const InternalError = {
  message: 'Generic error during request.',
  code: "ERR001"
};

/**
   * Handle the differents states of an api response ( fulfilled, rejected or pending ).
   *
   * @param response response object to handle
   * @param handlers object that contains the different callbacks to call for each state.
   *
   * @note If the handlers object was declared inline you must wrap it inside useMemo() callback
   *  otherwise the current state callback will be fired for each rendering cycle.
   * @see https://reactjs.org/docs/hooks-reference.html#useMemo
   */
export const useAPIData = <DataType>(response: APIData<DataType>, handlers: { 
      onFulfilled?: (data: DataType) => void, 
      onRejected?: (error: APIError) => void, 
      onPending?: () => void
  }) => {
    const { onFulfilled, onRejected, onPending } = handlers;

    useEffect(() => {
        if ( response.status === APIStatus.REJECTED && onRejected ) {
            onRejected(response.error || InternalError);
        }
    }, [response.status, response.error, onRejected]);

    useEffect(() => {
        if ( response.status === APIStatus.FULFILLED && onFulfilled ) {
          onFulfilled(response.data!);
        }
    }, [response.status, response.data, onFulfilled]);

    useEffect(() => {
        if ( response.status === APIStatus.PENDING && onPending ) {
          onPending();
        }
    }, [response.status, onPending]);
}

export const unauthenticatedRequest = axios.create({
  baseURL: `${process.env.REACT_APP_ROOT_URL}`
});
