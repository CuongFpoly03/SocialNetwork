import Joi from "joi";

const MessageSchema = Joi.object({
    message_content: Joi.string()
        .min(1)
        .max(1000) // Giới hạn độ dài tối đa của nội dung tin nhắn
        .required()
        .messages({
            "string.base": "Nội dung tin nhắn phải là một chuỗi.",
            "string.empty": "Nội dung tin nhắn không được để trống.",
            "string.min": "Nội dung tin nhắn phải có ít nhất {#limit} ký tự.",
            "string.max": "Nội dung tin nhắn không được vượt quá {#limit} ký tự.",
            "any.required": "Nội dung tin nhắn là bắt buộc."
        }),
    message_sender: Joi.string()
        .required()
        .messages({
            "string.base": "Người gửi phải là một chuỗi.",
            "string.empty": "Người gửi không được để trống.",
            "any.required": "Người gửi là bắt buộc."
        }),
    message_receiver: Joi.string()
        .required()
        .messages({
            "string.base": "Người nhận phải là một chuỗi.",
            "string.empty": "Người nhận không được để trống.",
            "any.required": "Người nhận là bắt buộc."
        }),
    message_read_status: Joi.string()
        .valid("unread", "read", "deleted") // Chỉ cho phép các giá trị cụ thể
        .required()
        .messages({
            "string.base": "Trạng thái đọc phải là một chuỗi.",
            "string.empty": "Trạng thái đọc không được để trống.",
            "any.required": "Trạng thái đọc là bắt buộc.",
            "any.only": "Trạng thái đọc chỉ có thể là một trong các giá trị sau: 'unread', 'read', 'deleted'."
        }),
    message_conversation: Joi.array()
        .items(Joi.string())
        .min(2) // Ít nhất hai người tham gia
        .required()
        .messages({
            "array.base": "Cuộc trò chuyện phải là một mảng.",
            "array.min": "Cuộc trò chuyện phải có ít nhất {#limit} người tham gia.",
            "any.required": "Cuộc trò chuyện là bắt buộc."
        }),
    createAt: Joi.date()
        .iso() // Định dạng ngày ISO 8601
        .required()
        .messages({
            "date.base": "Ngày tạo phải là một ngày hợp lệ.",
            "date.format": "Ngày tạo phải có định dạng ISO.",
            "any.required": "Ngày tạo là bắt buộc."
        })
});

export default MessageSchema;
