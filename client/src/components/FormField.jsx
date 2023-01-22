import React from "react";

export default function FormField({
  labelName,
  type,
  name,
  value,
  handleChange,
  placeholder,
  isSurpriseMe,
  handleSurpriseMe,
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-300 tracking-wide"
        >
          {labelName || "Label"}
        </label>

        {isSurpriseMe && (
          <button type="button" onClick={handleSurpriseMe} 
          className="text-xs font-semibold py-1 px-2 rounded-md border-2 border-gray-500">
            Surprise Me
          </button>
        )}
      </div>

      <input
        type={type}
        id={name}
        name={name}
        className="border-2 block font-semibold text-sm border-gray-600 focus:ring-[#6469ff] focus:border-[#6469ff] rounded-lg p-3 outline-none w-full"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        required
      />
    </div>
  );
}
