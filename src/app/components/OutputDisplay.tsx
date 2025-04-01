interface OutputDisplayProps {
  outputText?: string;
}

export default function OutputDisplay({ outputText }: OutputDisplayProps) {
  return (
    <div className="mt-6">
      <h2>Result:</h2>
      <textarea
        value={outputText || ''}
        readOnly
        rows={4}
        className="w-full"
      />
    </div>
  );
}