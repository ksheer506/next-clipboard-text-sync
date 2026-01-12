import FormError from "@/components/Form/FormError";
import { TextField as RadixTextField } from "@radix-ui/themes";
import { ComponentProps, ReactNode } from "react";

interface TextFieldProps extends ComponentProps<typeof RadixTextField.Root> {
  title: string
  error?: string | boolean | null
  LeftSlot?: ReactNode
  RightSlot?: ReactNode
}

const TextField = ({ title, error, id, LeftSlot, RightSlot, ...props }: TextFieldProps) => {

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-bold">{title}</label>
      <RadixTextField.Root
        className="w-full"
        id={id}
        {...props}
      >
        {!!LeftSlot && (
          <RadixTextField.Slot side="left">
            {LeftSlot}
          </RadixTextField.Slot>
        )}
        {!!RightSlot && (
          <RadixTextField.Slot side="right">
            {RightSlot}
          </RadixTextField.Slot>
        )}
      </RadixTextField.Root>
      <FormError error={error} />
    </div>
  )
}

export default TextField