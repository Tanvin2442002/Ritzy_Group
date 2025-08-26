import type * as React from "react"

function Card({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`bg-white border border-gray-200 rounded-xl shadow-sm ${className}`} {...props} />
}

function CardHeader({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`p-6 pb-4 ${className}`} {...props} />
}

function CardTitle({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`font-semibold text-lg leading-none ${className}`} {...props} />
}

function CardDescription({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`text-gray-600 text-sm mt-1 ${className}`} {...props} />
}

function CardContent({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`px-6 pb-6 ${className}`} {...props} />
}

function CardFooter({ className = "", ...props }: React.ComponentProps<"div">) {
  return <div className={`flex items-center px-6 pb-6 pt-4 border-t border-gray-100 ${className}`} {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
