import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function validation(obj) {
  if (obj.title.trim().length < 6) {
    return { target: "title", message: "Sarlavhani kiriting" };
  }

  return false;
}

export function authValidation(obj) {
  
  if (obj.username.trim().length === 0) {    
    return {
      target: "username",
      message: "Usernamegizni kiriting",
    };
  }
   if (obj.password.trim().length === 0) {
    return {
      target: "password",
      message: "Passwordingizni kiriting",
    };
  }
  return false;
}
