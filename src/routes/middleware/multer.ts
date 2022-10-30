import multer from 'multer'

// 使用此中间件, 可以上传单个文件, 表单名必须是 file, 可从 request.file 中获取上传的表单数据(multipart/form-data)
export const single = multer().single('file')