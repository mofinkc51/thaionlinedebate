import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://thaionlinedebate-a03ceea788c1.herokuapp.com/api/",
  withCredentials: true,
});
