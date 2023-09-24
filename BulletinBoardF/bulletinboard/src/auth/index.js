//islogin=>
//dologin=> data =>set to local storage
//dologout=>remove from local storage

export const islogin = () => {
  let data = localStorage.getItem("login");
  if (data != null) {
    return true;
  } else {
    return false;
  }
};
//set to local storage
export const doLogin = (login, next) => {
  localStorage.setItem("login", JSON.stringify(login));
  next();
};
//remove from localstorage
export const doLogout = (next) => {
  localStorage.removeItem("login");
  next();
};

//get current user
export const getCurrentUserDetail = () => {
  if (islogin()) {
    return JSON.parse(localStorage.getItem("login"));
  } else {
    return undefined;
  }
};
