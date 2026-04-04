type Inputprops = {
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any;
  placeholder: string;
};

export function Input({ value, onChange, placeholder }: Inputprops) {
  return (
    <input
      type="textbox"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
