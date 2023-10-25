function Header({ title, version }) {
  return (
    <div className="d-flex">
      <h1>{title}</h1>
      <h1 className="ms-auto text-success">
        <u>{version}</u>
      </h1>
    </div>
  );
}

export default Header
