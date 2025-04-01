interface InputFormProps {
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

export default function InputForm({ 
  inputText, 
  setInputText, 
  secretKey, 
  setSecretKey, 
  algorithm, 
  setAlgorithm, 
  operation, 
  setOperation, 
  handleSubmit
}: InputFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          Input Text:
          <textarea
            value={inputText || ''}
            onChange={(e) => setInputText?.(e.target.value)}
            rows={4}
            className="w-full"
          />
        </label>
      </div>
      
      <div className="form-group">
        <label>
          Secret Key:
          <input
            type="text"  
            value={secretKey || ''}
            onChange={(e) => setSecretKey?.(e.target.value)}
          />
        </label>
      </div>
      
      <div className="form-group">
        <label>
          Algorithm:
          <select 
            value={algorithm || 'aes-256-cbc'}
            onChange={(e) => setAlgorithm?.(e.target.value)}
          >
            <option value="aes-256-cbc">AES-256-CBC</option>
            <option value="sha256">SHA-256 (Hash)</option>
            <option value="md5">MD5 (Hash)</option>
            <option value="base64">Base64 (Encoding)</option>
          </select>
        </label>
      </div>
      
      <div className="form-group">
        <label>
          Operation:
          <select 
            value={operation || 'encrypt'}
            onChange={(e) => setOperation?.(e.target.value)}
            disabled={!!algorithm && ['sha256', 'md5'].includes(algorithm)}
          >
            <option value="encrypt">Encrypt/Hash/Encode</option>
            <option value="decrypt" 
              disabled={!!algorithm && ['sha256', 'md5'].includes(algorithm)}>
              Decrypt/Decode
            </option>
          </select>
        </label>
      </div>
      
      <button type="submit">Process</button>
    </form>
  );
}