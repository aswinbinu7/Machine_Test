import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          © {new Date().getFullYear()} Deepnetsoft Solutions. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
