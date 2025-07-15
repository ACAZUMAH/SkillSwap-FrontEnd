import { Container, Tabs } from "@mantine/core";
import { IconLock, IconUser } from "@tabler/icons-react";
import React from "react";
import classes from "./styles/index.module.css";
import { AccountSettingTabs } from "./component/AccountSettingTabs";
import { PasswordSettingsTab } from "./component/PasswordSettingsTab";

export const Settings: React.FC = () => {
  return (
    <>
      <Container w="100%" maw={1400} pb={50}>
        <Container size="md" mt="xl">
          <Tabs variant="unstyled" orientation="vertical" defaultValue="account" classNames={classes}>
            <Tabs.List>
              <Tabs.Tab value="account" leftSection={<IconUser />}>Account</Tabs.Tab>
              <Tabs.Tab value="security" leftSection={<IconLock />}>Security</Tabs.Tab>
              {/* <Tabs.Tab value="notifications">Notifications</Tabs.Tab> */}
            </Tabs.List>

            <Tabs.Panel value="account" ml="3rem">
              <AccountSettingTabs />
            </Tabs.Panel>
            <Tabs.Panel value="security" ml="3rem">
                <PasswordSettingsTab />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </Container>
    </>
  );
};
