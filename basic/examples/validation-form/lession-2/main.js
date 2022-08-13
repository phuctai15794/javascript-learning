import { Validator } from "./validation.js";

const form = new Validator('#form-1');

form.onSubmit = (datas) => {
    console.log(datas);
}