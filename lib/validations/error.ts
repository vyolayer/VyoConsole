export type ValidationErrors<K> = Partial<Record<keyof K, string>>;

export type FormErrors<K> = ValidationErrors<K & { root?: string }>;

export function getError<K>(errors: ValidationErrors<K>, key: keyof K) {
    return errors[key];
}
