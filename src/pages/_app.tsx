import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import awsExports from "@/aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "@/components/layout";
Amplify.configure({
  ...awsExports,
  ssr: true,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default withAuthenticator(App);
