import { Validator } from "./validation.js";

Validator({
    form: '#form-1',
    errors: {
        element: '.form-message',
        class: 'invalid'
    },
    rules: [
        Validator.isRequired({
            selector: '#avatar',
            message: 'Vui lòng chọn ảnh đại diện'
        }),
        Validator.isRequired({
            selector: '#fullname',
            message: 'Vui lòng nhập họ tên'
        }),
        Validator.isRequired({
            selector: '#email',
            message: 'Vui lòng nhập email'
        }),
        Validator.isEmail({
            selector: '#email',
            message: 'Email không hợp lệ'
        }),
        Validator.isRequired({
            selector: '#password',
            message: 'Vui lòng nhập mật khẩu'
        }),
        Validator.minLength({
            selector: '#password',
            message: 'Mật khẩu tối thiểu 6 ký tự',
            min: 6
        }),
        Validator.isCompare({
            selector: '#password_confirmation',
            message: 'Mật khẩu nhập lại không chính xác',
            compareValue() {
                return document.querySelector('#form-1 #password').value;
            }
        }),
        Validator.isRequired({
            selector: '#province',
            message: 'Vui lòng chọn Tỉnh/TP'
        }),
        Validator.isRequired({
            selector: 'input[name="gender"]',
            message: 'Vui lòng chọn giới tính'
        }),
        Validator.isRequired({
            selector: 'input[name="skill"]',
            message: 'Vui lòng chọn kỹ năng'
        })
    ],
    onSubmit(datas) {
        console.log(datas);
    }
});

Validator({
    form: '#form-2',
    errors: {
        element: '.form-message',
        class: 'invalid'
    },
    rules: [
        Validator.isRequired({
            selector: '#email-login',
            message: 'Vui lòng nhập email'
        }),
        Validator.isEmail({
            selector: '#email-login',
            message: 'Email không hợp lệ'
        }),
        Validator.isRequired({
            selector: '#password-login',
            message: 'Vui lòng nhập mật khẩu'
        })
    ],
    onSubmit(datas) {
        console.log(datas);
    }
});