interface FormErrorProps {
  error?: string | boolean | null
}

const FormError = ({ error }: FormErrorProps) => {
  if (error) {
    return <p className="text-xs text-rose-500">{error}</p>
  }
  return null
}

export default FormError