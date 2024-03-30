import React from 'react';

const IncludeExClude = ({ options, onChange = () => { }, value, padding = 4 }) => {
  return (
    <>
      <style>
        {`
          .includeExclude {
            display: flex;
            justify-content: space-between;
            border: 1px solid #ccc;
            margin:8px 0px;
          }
          .isActive-include {
            background: #d7d7d7;
          }
          .single-includeExclude {
            display: flex;
            width: 100%;
            justify-content: center;
            transition: background 0.2s ease-in-out;
            cursor: pointer;
          }
          .single-includeExclude p {
              margin: 0;
              padding: ${padding}px 0;
            }
          .single-includeExclude-hover:hover {
            background: #ebebeb;
          }
          `}
      </style>
      <div className="includeExclude">
        {options?.map((option, i) => (
          <div
            key={i}
            onClick={() => onChange(option)}
            className={`single-includeExclude ${
              value === option
                ? 'isActive-include'
                : 'single-includeExclude-hover'
            }`}
          >
            <p style={{ textTransform: 'capitalize' }}>{option}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default IncludeExClude;
