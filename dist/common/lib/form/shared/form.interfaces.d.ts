import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
export interface Form {
    fields: FormField[];
    groups: FormFieldGroup[];
    control: FormGroup;
}
export interface FormFieldGroupConfig {
    name: string;
    title?: string;
    options?: FormFieldGroupOptions;
}
export interface FormFieldGroup extends FormFieldGroupConfig {
    fields: FormField[];
    control: FormGroup;
}
export interface FormFieldGroupOptions {
    validator?: ValidatorFn;
    errors?: {
        [key: string]: string;
    };
}
export interface FormFieldConfig<T extends FormFieldInputs = FormFieldInputs> {
    name: string;
    title: string;
    type?: string;
    options?: FormFieldOptions;
    inputs?: T;
    subscribers?: {
        [key: string]: ({ field: FormField, control: FormControl }: {
            field: any;
            control: any;
        }) => void;
    };
}
export interface FormField<T extends FormFieldInputs = FormFieldInputs> extends FormFieldConfig<T> {
    control: FormControl;
}
export interface FormFieldOptions {
    validator?: ValidatorFn;
    disabled?: boolean;
    visible?: boolean;
    cols?: number;
    errors?: {
        [key: string]: string;
    };
    disableSwitch?: boolean;
}
export interface FormFieldInputs {
}
export interface FormFieldSelectInputs extends FormFieldInputs {
    choices: BehaviorSubject<FormFieldSelectChoice[]> | FormFieldSelectChoice[];
}
export interface FormFieldSelectChoice {
    value: any;
    title: string;
}
