import { TableValues } from "@/types/types";
import { Button, Flex, Heading } from "@aws-amplify/ui-react";
import { API } from "aws-amplify";
import router from "next/router";
import { GraphQLQuery } from "@aws-amplify/api";
import { useEffect, useState } from "react";
import * as queries from "@/graphql/queries";
import { ListPlatformsQuery } from "@/API";
import ItemsTable from "@/components/items-table";

export default function Platforms() {
  const [platform, setPlatform] = useState<TableValues[]>();

  useEffect(() => {
    async function grabPlatforms() {
      const allPlatforms = await API.graphql<GraphQLQuery<ListPlatformsQuery>>({
        query: queries.listPlatforms,
      });
      setPlatform(allPlatforms.data?.listPlatforms?.items as TableValues[]);
    }
    grabPlatforms();
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
        <Heading level={1}>Platforms</Heading>
        <Button
          variation="primary"
          onClick={() => router.push("/platforms/new")}
        >
          Add Platform
        </Button>
      </Flex>
      {platform === undefined ? null : (
        <ItemsTable tableName="Platforms" data={platform} />
      )}
    </>
  );
}
