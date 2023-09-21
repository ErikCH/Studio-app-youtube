import ProductCreateForm from "@/ui-components/ProductCreateForm";
import { Flex, Heading } from "@aws-amplify/ui-react";
import router from "next/router";

export default function Products() {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
      width="650px"
      margin="0 auto"
    >
      <Heading level={1}>Create New Platform</Heading>
      <ProductCreateForm
        width="100%"
        border="1px solid black"
        padding="1rem"
        borderRadius="1 rem"
        onSuccess={() => router.push("/")}
      ></ProductCreateForm>
    </Flex>
  );
}
