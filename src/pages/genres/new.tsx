import GenreCreateForm from "@/ui-components/GenreCreateForm";
import { Flex, Heading } from "@aws-amplify/ui-react";
import router from "next/router";

export default function GenresNew() {
  return (
    <>
      <Heading level={1}>Create New Genre</Heading>
      <Flex justifyContent="center">
        <GenreCreateForm
          width="340px"
          border="1px solid black"
          borderRadius="1 rem"
          onSuccess={() => router.push("/genres")}
        ></GenreCreateForm>
      </Flex>
    </>
  );
}
