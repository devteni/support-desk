import React from 'react';

type Props = {
    id?: string,
    name?: string,
    type?: string,
    label?: string,
    placeholder?: string,
    className?: string,
    disabled?: boolean,
    required?: boolean,
    value: string | number,
    min?: string | number,
    max?: string | number,
    maxLength?: number,
    minLength?: number,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    onBlur?: () => void,
    noDefaultClasses?: boolean
};

const Textarea: React.FC<Props> = ({
    type,
    placeholder,
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
      <label htmlFor={'text-area'} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <textarea
        name={props.name}
        id={props.id}
        placeholder={placeholder}
        value={value}
        maxLength={props.maxLength}
        minLength={props.minLength}
        className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:outline-none focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"`} 
        disabled={disabled}
        onChange={onChange}
        required={props.required}
      />
    </div>
    
  )
}

export default Textarea;