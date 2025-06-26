import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { CreateUserInput, Mutation, MutationLoginArgs } from "src/interfaces";

const loginMutationGql = gql`
    mutation Login($data: loginUserInput!){
        login(data: $data){
            message
        }
    }
`;

export const useLoginMutation = () => {
    const [mutate, loginResult] = useMutation<
        { login: Mutation["login"] },
        MutationLoginArgs
    >(loginMutationGql, { fetchPolicy: "network-only", notifyOnNetworkStatusChange: true });

    const handleLogin = async (data: CreateUserInput) => {
        try {
            await mutate({
                variables: {
                    data,
                },
            })

            showNotification({
                title: "Success",
                message: "OTP sent successfully",
                color: "blue"
            })
            return true;
        } catch (error) {
            showNotification({
                title: "Error",
                message: "Login failed. Please try again.",
                color: "red"
            })
        }
    }

    return { handleLogin, ...loginResult }
}