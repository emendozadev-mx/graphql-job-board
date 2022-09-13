import {getAccessToken} from "../auth";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";

const GRAPHQL_URL = "http://localhost:9000/graphql";

const headers = {
    'Authorization': `Bearer ${getAccessToken()}`
}

export const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {fetchPolicy: "network-only"},
        mutate: {fetchPolicy: "network-only"},
        watchQuery: {fetchPolicy: "network-only"}
    }
});

export async function getJobs() {
    const query = gql`
        query JobsQuery {
            jobs {
                id
                title
                company {
                    id
                    name
                }
            }
        }
    `;

    const {data: {jobs}} = await client.query({query});
    return jobs;
}

export async function getJob(id) {
    const query = gql`
        query JobQuery($id: ID!){
            job(id: $id){
                id
                title
                company {
                    id
                    name
                }
                description
            }
        }
    `;

    const {data: {job}} = await client.query({query, variables: {id}});
    return job;
}

export async function getCompany(id) {
    const query = gql`
        query CompanyQuery($id: ID!) {
            company(id: $id) {
                id
                name
                description
                jobs {
                    id
                    title
                    description
                }
            }
        }
    `;
    const {data: {company}} = await client.query({query, variables: {id}});
    return company;
}

export async function createJob(input) {
    const mutation = gql`
        mutation CreateJobMutation($input: CreateJobInput!) {
            job: createJob(input: $input) {
                id
                title
                description
            }
        }
    `;
    const variables = {input};
    const context = {
        headers
    }
    const {data: {job}} = await client.mutate({mutation, variables, context});
    return job;
}

export async function deleteJob(id) {
    const mutation = gql`
        mutation DeleteJobMutation($id: ID!) {
            job: deleteJob(id: $id) {
                id
            }
        }
    `;

    const variables = {id};
    const context = {
        headers
    }
    const {data: {job}} = await client.mutate({mutation, variables, context});
    return job;
}
