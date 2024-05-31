import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Salah Dev</div>
      <div className={styles.text}>© 2024 All rights reserved.</div>
    </div>
  );
};

export default Footer;