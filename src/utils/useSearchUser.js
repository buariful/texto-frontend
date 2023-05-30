// import { useSelector } from "react-redux";
// import { useGetUsersMutation } from "../features/auth/userApi";
// import {
//   getUserBySearch,
//   searchUserError,
//   searchUserLoading,
// } from "../features/auth/searchUserSlice";

// export default function useSearchUser(value,dispatch) {
//   const userData = useSelector((state) => state.user);
//   const token = userData?.user?.token;
//   const [getUsers] = useGetUsersMutation();

//   getUsers({ token: token, search: value })
//     .unwrap()
//     .then((res) => {
//       dispatch(searchUserLoading());
//       dispatch(getUserBySearch(res?.data));
//     })
//     .catch((err) => {
//       dispatch(searchUserError(err.data.message));
//     });
// }

// inputUtils.js

// import { useDispatch, useSelector } from 'react-redux';

//   const token = userData?.user?.token;
//   const [getUsers] = useGetUsersMutation();

// apiUtils.js

import {
  getUsersMutation,
  useGetUsersMutation,
} from "../features/auth/userApi"; // Import your mutation query function
import { yourReduxAction } from "./reduxActions"; // Import your Redux action creator

export const performMutationWithInputData = (inputData) => {
  return getUsersMutation(inputData)
    .then((result) => {
      // Dispatch the result to the Redux store

      yourReduxAction(result);
    })
    .catch((error) => {
      // Handle error if necessary
      console.error(error);
    });
};
