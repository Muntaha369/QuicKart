export const otpStore = {}

export const setOtp = ( email, otp, name, date) => {
  otpStore[email]={ otp, name, CreatedAt: date };
}

export const getOtp = (email) => otpStore[email] ;

export const clearOtp = (email) => {
  delete otpStore[email];
};

