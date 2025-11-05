import React from 'react';
import './ToggleSwitch.css';

type ToggleSwitchProps = {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconOn: React.ReactNode;
  iconOff: React.ReactNode;
  label: string;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, checked, onChange, iconOn, iconOff, label }) => {
  return (
    <div className="toggle-switch-container" title={label}>
      <div className="toggle-switch">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={id} className="slider">
          <span aria-hidden="true">{checked ? iconOn : iconOff}</span>
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;