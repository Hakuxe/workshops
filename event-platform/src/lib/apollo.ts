import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: "https://api-sa-east-1.graphcms.com/v2/cl4ovofd513ir01xxcy3w49ux/master",
	cache: new InMemoryCache(),
});
