import { TableValues } from "@/types/types";
import { Button, Flex, Heading } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as queries from "@/graphql/queries";
import { GraphQLQuery } from "@aws-amplify/api";
import { ListGenresQuery } from "@/API";
import { API } from "aws-amplify";
import ItemsTable from "@/components/items-table";

export default function Genres() {
  const router = useRouter();
  const [genre, setGenre] = useState<TableValues[]>();

  useEffect(() => {
    async function grabGenres() {
      const allGenres = await API.graphql<GraphQLQuery<ListGenresQuery>>({
        query: queries.listGenres,
      });
      setGenre(allGenres.data?.listGenres?.items as TableValues[]);
    }
    grabGenres();
  }, []);

  return (
    <>
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap="1rem"
        width="100%"
        padding="1rem"
        backgroundColor="white"
        className="underline"
      >
        <Heading level={1}>Genres</Heading>
        <Button variation="primary" onClick={() => router.push("/genres/new")}>
          Add Genre
        </Button>
      </Flex>
      {genre === undefined ? null : (
        <ItemsTable tableName="Genres" data={genre} />
      )}
    </>
  );
}
