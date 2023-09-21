// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { APIClass, Amplify, withSSRContext } from "aws-amplify";
import awsExports from "@/aws-exports";
import { DeleteProductInput } from "@/API";
import { GraphQLQuery } from "@aws-amplify/api";
import * as mutations from "@/graphql/mutations";

Amplify.configure({
  ...awsExports,
  ssr: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { Auth, API } = withSSRContext({ req });

  if (req.method === "DELETE") {
    const { id } = JSON.parse(req.body);
    try {
      const b = await Auth.currentAuthenticatedUser();
      console.log("b", b);
      const {
        signInUserSession: {
          accessToken: { payload },
        },
      } = await Auth.currentAuthenticatedUser();

      if (payload["cognito:groups"]?.includes("admin")) {
        await (API as APIClass).graphql<GraphQLQuery<DeleteProductInput>>({
          query: mutations.deleteProduct,
          variables: { input: { id } },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        res.status(200).json({ success: true, message: "success" });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Authorization failed" });
      }
    } catch (e) {
      // unauthenticated
      console.log("go there", e);
      res.status(401).json({ success: false, message: "Authorization failed" });
    }
  } else {
    // Not DELETE method
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
}
