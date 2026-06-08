import React from 'react';
import styles from './ErrorPage.module.css';

type ErrorPageProps = {
  message?: string;
  onSignIn?: () => void;
  onGoHome?: () => void;
};

export default function ErrorPage({
  message = "Something went wrong. Your session may have expired.",
  onSignIn,
  onGoHome,
}: ErrorPageProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <span className={styles.iconSymbol}>!</span>
        </div>

        <h1 className={styles.title}>Session Expired</h1>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          {onSignIn && (
            <button className={styles.primaryButton} onClick={onSignIn}>
              Sign In Again
            </button>
          )}
          {onGoHome && (
            <button className={styles.secondaryButton} onClick={onGoHome}>
              Go to Home
            </button>
          )}
        </div>

        <p className={styles.caption}>
          If this persists, please contact support.
        </p>
      </div>
    </div>
  );
}
