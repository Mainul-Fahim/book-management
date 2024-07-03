import React from 'react';

// Define a type for the filter options
interface FilterOption {
  value: string;
  label: string;
}

// Define the props for the FilterDropdown component
interface FilterDropdownProps {
  label?: string;
  options: FilterOption[];
  selectedValue?: string;
  onChange: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  onChange,
}) => {

  // @ts-ignore
  const handleChange = (e) => {
    onChange(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div style={{ marginRight: 8 }}>
      <select
        // defaultValue={label}
        // open={open}
        // onOpen={() => setOpen(true)}
        // onClose={() => setOpen(false)}
        // onChange={onChange}
        style={{padding: '10px'}}
        onChange={handleChange}
      >
        {/* <option value="">{label}</option> */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
