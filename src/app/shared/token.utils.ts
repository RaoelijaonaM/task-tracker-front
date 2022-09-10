
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
