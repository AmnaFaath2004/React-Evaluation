import { createSlice } from "@reduxjs/toolkit"
const useSlice = createSlice({
    name: "userSlice",
    initialState: { //names like users,user,isAuthenticated can be change
        users: JSON.parse(localStorage.getItem("eventUsers")) || [], //to store all data of all registered users
        user: JSON.parse(localStorage.getItem("eventUser")) || null,  //to store data of logined user
        isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false //to find any user logined or not
        //getItem("users") : name in store
    },
    reducers: {
        uesrRegister: (state, action) => {   //action={payload:{}} in payloadhave : userRegister({fullNmae:"tom", age:20})
            state.users.push(action.payload)
            localStorage.setItem("eventUsers", JSON.stringify(state.users))

        },
        userLogin: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("eventUser", JSON.stringify(state.user));
            localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated))

        },
        userLogout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("eventUser");
            localStorage.removeItem("isAuthenticated")

        },
        DeleteUser: (state, action) => {
            const userId = state.users.findIndex((us) => us.id === action.payload)
            if (userId !== -1) { //-1 : if not have that certain index(not matches)
                state.users.splice(userId, 1)
                localStorage.setItem("eventUsers", JSON.stringify(state.users));
            }
        },
        changeUserRole: (state, action) => {  //payload = {id:2, role:"admin"}
            const userindex = state.users.findIndex((u) =>
                 u.id === action.payload.id)
            console.log("useindex-------->",userindex);
            
            if (userindex !== -1) {
                state.users[userindex].role = action.payload.role;
                localStorage.setItem("eventUsers", JSON.stringify(state.users))
            }
            if (state.user && state.user.id === action.payload.id) {
                state.user.role = action.payload.role;
                localStorage.setItem("eventUser", JSON.stringify(state.user))

            }

        },
        changeUserStatus:(state, action)=>{ //id =123
              const userindex = state.users.findIndex((u) => u.id === action.payload)

                  
            if (userindex !== -1) {
                state.users[userindex].status = !state.users[userindex].status
                localStorage.setItem("eventUsers", JSON.stringify(state.users))

            }
            if (state.user && state.user.id === action.payload) {
                state.user.status = !state.user.status
                localStorage.setItem("eventUser", JSON.stringify(state.user))

            }
              
        },
         editUser: (state, action) => {
            const userIndex = state.users.findIndex((pr) => pr.id === action.payload.id)
            if (userIndex !== -1) { //-1 : if not have that certain index(not matches)
                state.users[userIndex] = action.payload;
                localStorage.setItem("eventUsers", JSON.stringify(state.users));
            }
    }
    }

})
export const { uesrRegister, userLogin, userLogout, DeleteUser,changeUserRole,changeUserStatus,editUser } = useSlice.actions //export all for btn actns,forms etc..
export default useSlice.reducer; //to import in store.js