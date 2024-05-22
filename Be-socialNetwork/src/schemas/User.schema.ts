import joi from "joi";
const userSchema = joi.object({
  user_name: joi.string().required().messages({
    "string.empty": "Tên không được để trống",
    "any.required": 'Trường "Tên" là bắt buộc',
  }),
  user_email: joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "any.required": 'Trường "Email" là bắt buộc',
    "string.email": "Email không đúng định dạng",
  }),
  user_phone_number: joi
    .string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Giá trị phải là số điện thoại hợp lệ",
      "string.empty": "Trường không được để trống",
      "any.required": "Trường là bắt buộc",
    }),
  user_password: joi.string().min(6).required().messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường mật khẩu là bắt buộc",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
  }),
  confirmPassword: joi
    .string()
    .valid(joi.ref("user_password"))
    .required()
    .messages({
      "any.only": "Mật khẩu không khớp",
      "string.empty": "Mật khẩu không được để trống",
      "any.required": "Trường repassword là bắt buộc",
    }),
  user_address: joi.string().required().messages({
    "string.empty": "Dia chi không được để trống",
    "any.required": 'Trường "Dia chi" là bắt buộc',
  }),
});

export default userSchema;
