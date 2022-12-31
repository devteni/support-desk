import React from 'react';

type Props = {
    type?: string,
    name?: string,
    id?: string,
    label?: string,
    placeholder?: string,
    className?: string,
    disabled?: boolean,
    value?: string | number,
    min?: string | number,
    max?: string | number,
    maxLength?: number,
    minLength?: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: () => void,
    noDefaultClasses?: boolean,
    required?: boolean,
    multiple?: boolean,
    accept?: string
};

const FormInput: React.FC<Props> = ({
    type,
    placeholder,
    name,
    label,
    className,
    disabled,
    value,
    onChange,
    onBlur,
    ...props
}) => {
  return (
    <div className='mb-6'>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <input
          id={props.id}
          type={type ?? "text"}
          name={name}
          placeholder={placeholder}
          value={value}
          min={props.min}
          max={props.max}
          maxLength={props.maxLength}
          minLength={props.minLength}
          accept={props.accept}
          className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:outline-none focus:border-gray-500 block w-full p-2.5"`} 
          disabled={disabled}
          onChange={onChange}
          multiple={props.multiple}
          required={props.required}
      />
    </div>
    
  )
}

export default FormInput;