export const Validation = (email, phone = '', password = '') => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const phoneRegex = /^\d{10}$/
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

  const isPhoneValid = !phone || phoneRegex.test(phone)

  return emailRegex.test(email) && isPhoneValid && passwordRegex.test(password)
}