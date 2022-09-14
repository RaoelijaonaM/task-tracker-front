
import jwt_decode from 'jwt-decode';
export const getUserViaToken = () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const tokenValue: any = jwt_decode(token);
    return tokenValue.data[0];
  }
  return null;
};

export const getTokenExpiration = () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const tokenValue: any = jwt_decode(token);
    return tokenValue.exp;
  }
  return null;
};

export const isAdmin = () => {
 const userConnected = getUserViaToken();
 if(userConnected.ID_ROLE == 'R2'){
  return true;
 }
  return false;
};


