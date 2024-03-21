import '@shopify/polaris/build/esm/styles.css';
import '../../public/assets/styles/global.css';

import type { AppProps } from 'next/app';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProvider i18n={enTranslations}>
      <Component {...pageProps} />
    </AppProvider>
  );
};

export default MyApp;
