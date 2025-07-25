import { Alert, Badge, Group, Paper, Text, Title } from '@mantine/core';
import React from 'react'
import { Conditional } from 'src/components';

interface AvalabilityProps {
    available?: Array<string | null>;
}

export const Avalability: React.FC<AvalabilityProps> = ({ available }) =>{
  return (
    <Paper shadow="0" p="xs" mt="lg" h="100%" w="100%" withBorder>
        <Title order={2} c="dimmed" mb="sm">Available on</Title>
        <Group gap="xs" wrap="wrap">
            {available?.map((day, index) => (
                <Badge key={index} variant="default" size="lg" radius="sm">
                    {day}
                </Badge>
            ))}
        </Group>
        <Conditional condition={!available || available.length === 0}>
            <Alert>
                <Text size="md">No availability information available</Text>
            </Alert>
        </Conditional>
    </Paper>
  )
}
