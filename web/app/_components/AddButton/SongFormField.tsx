import { HTMLInputTypeAttribute, useRef, useState } from "react"

type Props = {
  id: string
  label: string
  placeholder: string
  defaultValue?: string | number
  required?: boolean
  type?: HTMLInputTypeAttribute
  disabled?: boolean
  copy?: boolean
}

export default function SongFormField(props: Props) {
  const [value, setValue] = useState(props.defaultValue ?? "")
  const [copied, setCopied] = useState(false)
  const copiedTimeout = useRef(-1)

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={props.id}
        className="text-black font-bold flex items-center"
      >
        <div>{props.label}</div>

        {props.required && <div className="text-[#FF0D9F] ml-1">*</div>}

        {props.copy && (
          <div
            className="text-sm text-[#FF0D9F] ml-2"
            onClick={() => {
              if (!copied) {
                navigator.clipboard.writeText(String(value)).then(() => {
                  setCopied(true)
                  copiedTimeout.current = window.setTimeout(() => {
                    setCopied(false)
                  }, 5000)
                })
              } else {
                setCopied(false)
                window.clearTimeout(copiedTimeout.current)
              }
            }}
          >
            {copied ? "Copied" : "Copy"}
          </div>
        )}
      </label>

      <input
        style={{
          WebkitTextFillColor: props.disabled ? "rgba(0,0,0,1)" : undefined,
        }}
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
            ? ""
            : props.placeholder
        }
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
    </div>
  )
}
