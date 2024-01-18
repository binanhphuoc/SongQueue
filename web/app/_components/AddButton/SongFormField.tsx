import { HTMLInputTypeAttribute } from "react"

type Props = {
  id: string
  label: string
  placeholder: string
  defaultValue?: string | number
  required?: boolean
  type?: HTMLInputTypeAttribute
  disabled?: boolean
}

export default function SongFormField(props: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.id} className="text-black">
        {props.label}
        {props.required && <span className="text-[#FF0D9F] ml-1">*</span>}
      </label>

      <input
        type={props.type ?? "text"}
        name={props.id}
        id={props.id}
        required={props.required}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        className="text-black placeholder:text-slate-500 bg-transparent outline-none p-2 border-b-2 border-[rgba(128,128,128,1)] focus:border-[rgba(255,107,196,1)] transition-[border-color]"
        placeholder={
          props.disabled &&
          typeof props.defaultValue === "string" &&
          !props.defaultValue
            ? "None"
            : props.placeholder
        }
      />
    </div>
  )
}
