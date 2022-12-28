import React from 'react'

type Props =  { 
  type?: "button" | "submit" | "reset" | undefined, children: string | JSX.Element, 
  className?: string, variant?: string,
  value?: string | number
  onClick?: () => void
};

const Button: React.FC<Props> = ({ type, children, className, value, variant="dark", onClick }) => {
    const VARIANTS: Record<string, string> = {
        "primary": "text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
        "danger": "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 font-medium text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
        "secondary": "",
        "white": "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-medium text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
        "dark": "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700", 
        "outline-primary": "",
        "outline-secondary": "",
        "outline-danger": "",
    }
  return (
    <button value={value} type={type ?? 'submit'} className={`${VARIANTS[variant]} ${className ?? ''}`} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button