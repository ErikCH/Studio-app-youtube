import PlatformCreateForm from "@/ui-components/PlatformCreateForm";
import { Flex, Heading } from "@aws-amplify/ui-react";
import router from "next/router";

export default function PlatformsNew() {
  return (
    <>
      <Heading level={1}>Create New Platform</Heading>
      <Flex justifyContent="center">
        <PlatformCreateForm
          width="340px"
          border="1px solid black"
          borderRadius="1 rem"
          onSuccess={() => router.push("/platforms")}
        ></PlatformCreateForm>
      </Flex>
    </>
  );
}
