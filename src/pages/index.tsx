import { ListProductsQuery, Product } from "@/API";
import { Button, Flex, Heading, useAuthenticator } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { useEffect, useState } from "react";
import * as queries from "@/graphql/queries";
import ProductsTable from "@/components/products-table";

export default function Home() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [products, setProducts] = useState<Product[]>();

  const session = user.getSignInUserSession();
  const groups = session?.getAccessToken().payload["cognito:groups"];

  useEffect(() => {
    async function grabProducts() {
      const allProducts = await API.graphql<GraphQLQuery<ListProductsQuery>>({
        query: queries.listProducts,
      });
      setProducts(allProducts.data?.listProducts?.items as Product[]);
    }
    grabProducts();
  }, []);

  const onClickDelete = async (id: string) => {
    if (!id) return;
    const res = await fetch("/api/delete", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    if (res.status === 200) {
      const filteredProducts = products?.filter((product) => product.id !== id);
      setProducts(filteredProducts);
    }
  };

  return (
    <Flex justifyContent={"center"} alignItems={"center"} direction={"column"}>
      <Heading level={1}>All Products</Heading>

      {products === undefined ? null : (
        <ProductsTable
          onClickDelete={onClickDelete}
          admin={groups?.includes("admin")}
          products={products}
        />
      )}
      <Button onClick={signOut} variation="primary">
        SignOut
      </Button>
    </Flex>
  );
}
