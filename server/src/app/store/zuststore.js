import { create } from 'zustand'

export const userDetails = create((set) => ({
  details:{
    name:"",
    email:"",
    pass:""
  },
  ChangeDetails: (name, email, pass) => set(() => ({
    details:{
    name,email,pass
    } 
})),
}))

export const productDetails = create((set) => ({
  details:{
    productIMG:"",
    productName:"",
    productDescription:"",
    price:""
  },
  ChangeDetails: (img,name,desc,price) => set(() => ({
    details:{
    img,name,desc,price
    } 
})),
}))