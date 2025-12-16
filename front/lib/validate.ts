export const hasAlphabet = (value: string) => /[a-zA-Z]/.test(value);

export const hasNumber = (value: string) => /[0-9]/.test(value);

export const hasSpecial = (value: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);