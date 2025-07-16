export const otpStore = {}

export const setOtp = (name, age, height) => {
  otpStore[name]={age,height}
}

export const getOtp = (name) => otpStore[name] ;

export const clearOtp = (email) => {
  delete otpStore[email];
};

