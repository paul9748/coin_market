function LoginForm() {
   return (
      <form>
         <div>
            <label>아이디</label>
            <input placeholder="아이디"></input>
         </div>
         <div>
            <label>비밀번호</label>
            <input placeholder="비밀번호"></input>
         </div>
         <button>로그인</button>
      </form>
   );
}

export default LoginForm;

// function loginReducer(userState, action) {
//   switch (action.type) {
//     case "LOGIN_SUCCESS":
//       return {
//         ...userState,
//         user: action.payload,
//       };

//     case "LOGOUT":
//       return {
//         ...userState,
//         user: null,
//       };

//     default:
//       return userState;
//   }
// }

// const [userState, dispatch] = useReducer(loginReducer, {
//   user: null,
// });
