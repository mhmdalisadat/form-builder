export interface ISubmitButtonProps {
  text?: string;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | "custom";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  loadingText?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  position?: "left" | "center" | "right";
  icon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export interface ICustomInputs {
  [key: string]: React.ReactNode;
}


export interface IColumnsConfig {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}


export interface IFormErrors {
  [key: string]: string | undefined;
}