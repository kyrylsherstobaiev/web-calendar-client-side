import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Icon } from "../Icon/";

function Input({
  placeholder = "Enter a text",
  label = "",
  type = "text",
  id,
  name,
  error = "",
  classNameLabel,
  classNameInput,
  disabled = false,
  onChange,
  ...props
}) {
  const [isType, setIsType] = useState("password");

  const handleClick = () => {
    setIsType(isType === "password" ? "text" : "password");
  };

  // noinspection JSValidateTypes
  return (
    <label
      data-testid="label-test"
      className={classNames("custom-label", classNameLabel, {
        isDisabledInput: disabled,
      })}
    >
      {label}
      <input
        placeholder={placeholder}
        type={type === "password" ? isType : type}
        name={name}
        id={id}
        className={classNames("input-class", classNameInput, {
          isErrorInput: error,
        })}
        disabled={disabled}
        onChange={onChange}
        role="textbox"
        {...props}
      />
      <div className="error" data-testid="error-div">
        {error}
      </div>

      {type === "password" && !disabled && (
        <button
          {...(type === "password" && { onClick: () => handleClick() })}
          className="show-pass"
        >
          <Icon
            name={isType === "password" ? "close-eye" : "open-eye"}
            color={"black"}
          />
        </button>
      )}
    </label>
  );
}

Input.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "password"]),
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
};
export { Input };
