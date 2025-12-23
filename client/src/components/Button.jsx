import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  onClick,
  variant = "primary",
  type = "button",
}) {
  const className =
    variant === "primary" ? "btn btn-primary" : "btn btn-ghost";

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
