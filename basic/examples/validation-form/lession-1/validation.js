export function Validator(options) {
    const formMain = document.querySelector(options.form);
    let selectorRules = {};

    function getParents(element, selector) {
        while (element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            
            element = element.parentElement;
        }
    }

    function validate(inputParent, inputElement, rule, errorElement) {
        const listRules = selectorRules[rule.selector];
        let inputValue, errorMessage;

        if(listRules) {
            try {
                listRules.forEach(itemRule => {
                    switch(inputElement.type) {
                        case 'radio':
                        case 'checkbox':
                            inputValue = formMain.querySelector(rule.selector + ':checked');
                            break;

                        default:
                            inputValue = inputElement.value;
                            break;
                    }

                    errorMessage = itemRule(inputValue);

                    if(errorMessage) {
                        inputParent.classList.add(options.errors.class);
                        errorElement.innerText = errorMessage;
                        throw 'Break';
                    } else {
                        removeMessage(inputParent, errorElement);
                    }
                });
            } catch (e) {
                if(e === 'Break') {
                    return false;
                }
            }
        }

        return !errorMessage;
    }

    function removeMessage(inputParent, errorElement) {
        inputParent.classList.remove(options.errors.class);
        errorElement.innerText = '';
    }

    if(formMain) {
        // Check rules
        const rules = options.rules;

        // Check submit form
        formMain.onsubmit = (e) => {
            e.preventDefault();

            let isFormValid = true;

            rules.forEach((rule) => {
                const inputElement = formMain.querySelector(rule.selector);
                const inputParent = getParents(inputElement, '.form-group');
                const errorElement = inputParent.querySelector(options.errors.element);
                const isValid = validate(inputParent, inputElement, rule, errorElement);

                if(!isValid) {
                    isFormValid = false;
                }
            });

            if(isFormValid) {
                if(typeof options.onSubmit === 'function') {
                    let listInputs = [];
                    const inputs = formMain.querySelectorAll('[name]');

                    const datas = Array.from(inputs).reduce((values, input) => {
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
                    options.onSubmit(datas);
                } else {
                    formMain.submit();
                }
            }
        };

        rules.forEach((rule) => {
            // Save rules of inputs
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.check);
            } else {
                selectorRules[rule.selector] = [rule.check];
            }

            // Validate inputs
            const inputElements = formMain.querySelectorAll(rule.selector);

            if(inputElements) {
                Array.from(inputElements).forEach(inputElement => {
                    const inputParent = getParents(inputElement, '.form-group');;
                    const errorElement = inputParent.querySelector(options.errors.element);
                    
                    inputElement.onblur = () => {
                        validate(inputParent, inputElement, rule, errorElement);
                    };
                    
                    inputElement.onchange = () => {
                        if(['select-one', 'checkbox', 'radio'].includes(inputElement.type)) {
                            validate(inputParent, inputElement, rule, errorElement);
                        }
                    };
                    
                    inputElement.oninput = () => {
                        removeMessage(inputParent, errorElement);
                    };
                });
            }
        });
    }
}

Validator.isRequired = (options) => {
    return {
        selector: options.selector,
        check(value) {
            value = value != null ? value.trim() : value;
            return value ? undefined : options.message || 'Vui lòng nhập trường này';
        }
    };
}

Validator.isEmail = (options) => {
    return {
        selector: options.selector,
        check(value) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? undefined : options.message || 'Email không hợp lệ';
        }
    };
}

Validator.minLength = (options) => {
    return {
        selector: options.selector,
        check(value) {
            return value.length >= options.min ? undefined : options.message || `Vui lòng nhập ít nhất ${options.min} ký tự`;
        }
    };
}

Validator.isCompare = (options) => {
    return {
        selector: options.selector,
        check(value) {
            return value === options.compareValue() ? undefined : options.message || 'Giá trị không trùng khớp';
        }
    };
}