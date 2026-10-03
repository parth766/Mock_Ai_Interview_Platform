"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: "text" | "email" | "password" | "file" | "number";
    disabled?: boolean;
}

const FormField = <T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type = "text",
    disabled = false,
}: FormFieldProps<T>) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2 w-full">
                    {/* Label */}
                    <label className="text-sm font-medium text-light-100">{label}</label>

                    {/* Input */}
                    <input
                        {...field}
                        type={type}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="w-full bg-dark-200 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-200 focus:ring-1 focus:ring-primary-200 transition-colors"
                    />

                    {/* Error */}
                    {fieldState.error && (
                        <p className="text-destructive-100 text-xs mt-1">
                            {fieldState.error.message}
                        </p>
                    )}
                </div>
            )}
        />
    );
};

export default FormField;
