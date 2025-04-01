export interface InputFormProps {
    inputText?: string;
    setInputText?: (text: string) => void;
    secretKey?: string;
    setSecretKey?: (key: string) => void;
    algorithm?: string;
    setAlgorithm?: (algorithm: string) => void;
    operation?: string;
    setOperation?: (operation: string) => void;
    handleSubmit?: (e: React.FormEvent) => void;
}