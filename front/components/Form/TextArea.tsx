import FormError from "@/components/Form/FormError";
import { TextArea as RadixTextArea } from "@radix-ui/themes";
import { ComponentProps } from "react";

interface TextAreaProps extends ComponentProps<typeof RadixTextArea> {
  error?: string | boolean | null
}

const TextArea = ({ title, error, id, ...props }: TextAreaProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-bold">{title}</label>
      <RadixTextArea
        className="w-full"
        id={id}
        {...props}
      />
      <FormError error={error} />
    </div>
  )
}

export default TextArea