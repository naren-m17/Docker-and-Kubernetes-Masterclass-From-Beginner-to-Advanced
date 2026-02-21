import logo from "../logo.svg";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Store logo" className="logo" />
        <span className="brand-name">Store</span>
      </div>

      <div className="header-right">
        {/* future nav / user menu */}
      </div>
    </header>
  );
}
export default Header;
