import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserData {
  _id: string
  firstName: string
  lastName: string
  avatar: string
  age: string
  profession: string
  userName: string
  password: string
  feeds: any
  inbox: any
}

interface UserState {
  loggedIn: string
  allUsersData: UserData[] | null
  loggedUser: UserData | null
}

const initialState: UserState = {
  loggedIn: '',
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
    userLogout(state) {
      state.loggedIn = ''
    },
    setInitialUsersdata(state, action: PayloadAction<UserData[]>) {
      state.allUsersData = action.payload
    },
    setLoggedUsersData(state, action: PayloadAction<UserData>) {
      state.loggedUser = action.payload
    },
  },
})

export const {
  userLogin,
  userLogout,
  setInitialUsersdata,
  setLoggedUsersData,
} = userSlice.actions
export default userSlice.reducer
