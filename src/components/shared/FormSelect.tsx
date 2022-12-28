import React from 'react'

type Props = {
    id?: string,
    style?: object,
    name?: string,
    type?: string,
    label?: string,
    placeholder?: string,
    className?: string,
    disabled?: boolean,
    required?: boolean,
    options: string[] | number[],
    optionValue?: any,
    defaultValue: string | number,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    onBlur?: () => void,
    noDefaultClasses?: boolean
};

type optionType = any

const FormSelect: React.FC<Props> = ({
    name,
    label,
    className,
    options,
    onChange,
    optionValue,
  ...props
}) => {
  return (
    <div
      className={`mb-6 ${className ?? ""}`}
      style={{ ...props.style }}
    >
      <label aria-label={label} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <select
        name={name}
        onChange={(e) => onChange(e)}
        defaultValue={props.defaultValue ?? options[0]}
        className={`${className} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:outline-none focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"`} 
      >
        {options?.map((option: optionType, i) => {
          return (
            <option className='py-2 hover:bg-gray-400 hover:text-white'
              key={i}
              value={
                option[optionValue] ? option[`${optionValue}`] : option
              }
            >
              {option[`${optionValue}`] ? option[`${optionValue}`] : option}
            </option>
          );
        })}
      </select>
    </div>
  )
}

export default FormSelect