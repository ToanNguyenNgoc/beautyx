/* eslint-disable no-useless-escape */
const validateForm = {
    fullname: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
    // email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
    phone: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    phone_new_rule: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
    password: /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    replace_code: /[ ~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?_]/g
}
//allow +84, 84, 03, ,04, 05, 07, 08, 09, 01
export const vnPhoneCheck = /(((\+|)84)|0)(3|4|5|7|8|9|1)+([0-9]{8,9})/;
export const acceptImage = 'image/png, image/gif, image/jpeg'
export const acceptImageVideo = 'image/*, video/*'
export const regexHTML = /<[^>]+>/g
export const regexImage = /^image\/(jpg|jpeg|png|gif|bmp|svg)$/i;
export const tesRegexHTML = (text: any) => regexHTML.test(text)
export const testRegexImage = (type: string) => regexImage.test(type)
export default validateForm;