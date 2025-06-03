import { useState } from "react"
import Login from "./components/Login"
import Register from "./components/Register"
import collaboration from '../assets/images/collabs.jpg'
import { Container, SimpleGrid, SegmentedControl, Image } from "@mantine/core"

export const Authentication: React.FC = () => {
  const views = ['Sign up', 'Sign in']
  const [value, setValue] = useState(views[0])
  return (
    <SimpleGrid cols={2}>
        <Container size="50%" styles={{
          root: {
            alignItems: "center"
          }
        }}>
            <SegmentedControl
                data={views}
                value={value}
                onChange={setValue}
                size="md" radius="lg"
                styles={{
                  root: {
                    marginLeft: "auto",
                    marginBottom: "40px"
                  }
                }}
            />
            { value === views[0] ? <Register/> : <Login/>}
        </Container>
        <Container>
            <Image src={collaboration} h="auto" radius="lg"/>
        </Container>
    </SimpleGrid>
  )
}
