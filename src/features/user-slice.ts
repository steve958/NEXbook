import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../helpers/types'

interface UserState {
  loggedIn: string
  loggedInId: string
  allUsersData: User[] | null
  loggedUser: User | null
}

const initialState: UserState = {
  loggedIn: '',
  loggedInId: '',
  allUsersData: null,
  loggedUser: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin(state, action: PayloadAction<string>) {
      state.loggedIn = action.payload
    },

    userLoginId(state, action: PayloadAction<string>) {
      state.loggedInId = action.payload
    },

    userLogout(state) {
      state.loggedIn = ''
      state.loggedInId = ''
      state.allUsersData = null
      state.loggedUser = null
    },
    setInitialUsersdata(state, action: PayloadAction<User[]>) {
      state.allUsersData = action.payload
    },
    setLoggedUsersData(state, action: PayloadAction<User>) {
      state.loggedUser = action.payload
    },
  },
})

export const {
  userLogin,
  userLoginId,
  userLogout,
  setInitialUsersdata,
  setLoggedUsersData,
} = userSlice.actions
export default userSlice.reducer
