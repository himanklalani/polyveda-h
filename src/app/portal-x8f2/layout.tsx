import Link from 'next/link';
import styles from './AdminLayout.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <img 
            src="/PV_Logo_Blue_Color_wo_Name_Transparent_Final.png" 
            alt="Polyveda" 
            style={{ width: 28, height: 'auto', display: 'block' }} 
          />
          <span>Polyveda Admin</span>
        </div>
        <nav className={styles.nav}>
          <Link href="/portal-x8f2/leads" className={styles.navLink}>
            Enquiries & Leads
          </Link>
          <Link href="/portal-x8f2/posts" className={styles.navLink}>
            Blog CMS
          </Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
