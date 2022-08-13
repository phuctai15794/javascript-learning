export function Validator(formSelector) {
    const _this = this;
    const formRules = {};
    const formElement = document.querySelector(formSelector);
    const validateRules = {
        required(value, message) {
            return value ? undefined : message || 'Vui lòng nhập trường này';
        },
        email(value, message) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? undefined : message || 'Email không hợp lệ';
        },
        min(min) {
            return function (value, message) {
                return value.length >= min ? undefined : message || `Vui lòng nhập ít nhất ${min} ký tự`;
            }
        },
        max(max) {
            return function (value, message) {
                return value.length <= max ? undefined : message || `Vui lòng nhập tối đa ${max} ký tự`;
            }
        },
        compare(element) {
            return function (value, message) {
                return value === getCompareValue(element) ? undefined : message || `Giá trị không trùng khớp`;
            }
        }
    };
    
    function getParents(element, selector) {
        while (element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            
            element = element.parentElement;
        }
    }
    
    function getCompareValue(element) {
        return formElement.querySelector(element).value;
    }
    
    function handleMessages(messages) {
        let result = {};
        
        if(messages) {
            if(messages.includes('|')) {
                messages = messages.split('|');
                result = messages.reduce((values, message) => {
                    message = message.includes(':') ? message.split(':') : '';
                    values[message[0]] = message[1] ? message[1] : '';
                    return values;
                }, {});
            } else {
                messages = messages.includes(':') ? messages.split(':') : '';
                
                if(Array.isArray(messages)) {
                    result[messages[0]] = messages[1];
                }
            }
        }
        
        return result;
    }
    
    function handleValidator(event) {
        const inputSelector = event.target;
        const inputValue = inputSelector.value;
        const inputParent = getParents(inputSelector, '.form-group');
        const errorElement = inputParent.querySelector('.form-message');
        const ruleFuncs = formRules[inputSelector.name];
        let errorMessage;
        
        if(ruleFuncs.length) {
            ruleFuncs.some(ruleFunc => {
                const func = ruleFunc['func'];
                const message = ruleFunc['message'];
                errorMessage = func(inputValue, message);
                return errorMessage;
            });
            
            if(errorMessage) {
                inputParent.classList.add('invalid');
                errorElement.innerText = errorMessage;
            } else {
                inputParent.classList.remove('invalid');
                errorElement.innerText = '';
            }
        }
        
        return !errorMessage;
    }
    
    function handleClearMessage(event) {
        const inputSelector = event.target;
        const inputParent = getParents(inputSelector, '.form-group');
        const errorElement = inputParent.querySelector('.form-message');
        
        if(inputParent.classList.contains('invalid')) {
            inputParent.classList.remove('invalid');
            errorElement.innerText = '';
        }
    }
    
    if(formElement) {
        const inputs = formElement.querySelectorAll('[name][rules]');
        
        if(inputs) {
            for(const input of inputs) {
                let rules = input.getAttribute('rules');
                let messages = input.getAttribute('messages');
                
                if(rules) {
                    rules = rules ? rules.split('|') : undefined;
                    
                    if(rules) {
                        messages = handleMessages(messages);
                        
                        for (let key in rules) {
                            const isRuleHasValue = rules[key].includes(':');
                            let ruleInfo = {}, ruleValue, ruleFunc, ruleFuncName;
                            
                            if(isRuleHasValue) {
                                ruleValue = rules[key].split(':');
                                rules[key] = ruleValue[0];
                            }
                            
                            ruleFuncName = rules[key];
                            ruleFunc = validateRules[rules[key]];
                            
                            if(isRuleHasValue) {
                                ruleFunc = ruleFunc(ruleValue[1]);
                            }
                            
                            ruleInfo = {
                                'func': ruleFunc,
                                'message': messages[ruleFuncName] ? messages[ruleFuncName] : ''
                            }
                            
                            if(Array.isArray(formRules[input.name])) {
                                formRules[input.name].push(ruleInfo);
                            } else {
                                formRules[input.name] = [ruleInfo];
                            }
                        }
                        
                        input.onblur = handleValidator;
                        input.oninput = handleClearMessage;
                    }
                }
            }
        }
        
        formElement.onsubmit = (event) => {
            event.preventDefault();
            let isValid = true, listInputs = [];
            
            if(inputs) {
                for(const input of inputs) {
                    if(!handleValidator({target: input})) {
                        isValid = false;
                        break;
                    }
                }
            }
            
            if(isValid) {
                if(_this.onSubmit && typeof _this.onSubmit === 'function') {
                    const inputsValue = formElement.querySelectorAll('[name]');
                    const datas = Array.from(inputsValue).reduce((values, input) => {
                        if(!listInputs.includes(input.name) || input.type === 'checkbox') {
                            switch(input.type) {
                                case 'radio':
                                const inputParent = getParents(input, '.form-group');
                                let inputChecked = inputParent.querySelector('input[name="' + input.name + '"]:checked');
                                
                                if(inputChecked) {
                                    values[input.name] = inputChecked.value;
                                }
                                break;
                                
                                case 'checkbox':
                                if(!input.matches(':checked')) return values;
                                if(!Array.isArray(values[input.name])) values[input.name] = [];
                                values[input.name].push(input.value);
                                break;
                                
                                case 'file':
                                if(input.files.length) {
                                    values[input.name] = input.files;
                                }
                                break;
                                
                                default:
                                if(input.value) {
                                    values[input.name] = input.value;
                                }
                                break;
                            }
                            
                            if(!listInputs.includes(input.name)) {
                                listInputs.push(input.name);
                            }
                        }
                        
                        return values;
                    }, {});
                    
                    listInputs = [];
                    _this.onSubmit(datas);
                } else {
                    formElement.submit();
                }
            }
        };
    }
}