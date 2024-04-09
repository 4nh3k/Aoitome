import React from 'react'
import { Label, Radio } from "flowbite-react";

interface RadioButtonProps {
  label: string;
  name: string;
  values: { label: string; value: string; }[];
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, name, values }) => {
  return (
    <fieldset className="flex max-w-md flex-col gap-4">
      <span className="text-sm font-medium leading-5">{label}</span>
      <div className='flex flex-start gap-9'>
        {
          values.map((value) => (
            <div className="flex items-center gap-2">
              <Radio id={value.label} name={name} value={value.value} defaultChecked />
              <Label>{value.label}</Label>
            </div>
          ))
        }
      </div>
    </fieldset>
  )
}

export default RadioButton