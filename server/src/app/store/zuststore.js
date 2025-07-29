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