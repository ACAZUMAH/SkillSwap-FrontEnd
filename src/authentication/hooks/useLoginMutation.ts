import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { CreateUserInput, MutationLoginArgs, Response } from "src/interfaces";

const loginMutationGql = gql`
    mutation Login($data: loginUserInput!){
        login(data: $data){
            message
        }
    }
`;

export const useLoginMutation = () => {
    const [mutate, loginResult] = useMutation<
        { loginResponse: Response },
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
                message: "Login successful",
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