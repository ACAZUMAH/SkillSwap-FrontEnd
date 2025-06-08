import { gql, useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { CreateUserInput, MutationCreateAccountArgs, Response } from "src/interfaces";

const loginMutationGql = gql`
    login(data: $data) {
        message
    }
`;

export const useLoginMutation = () => {
    const [mutate, loginResult] = useMutation<
        { loginResponse: Response },
        MutationCreateAccountArgs
    >(loginMutationGql, { fetchPolicy: "network-only", notifyOnNetworkStatusChange: true});

    const login = async (data: CreateUserInput) => {
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

    return { login, ...loginResult}
}