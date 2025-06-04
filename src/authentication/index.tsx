import { useState } from "react"
import Login from "./components/Login"
import Register from "./components/Register"
import { useViewportSize } from "@mantine/hooks"
import collaboration from '../assets/images/collaboration.jpg'
import { Container, SimpleGrid, SegmentedControl, Image, Center } from "@mantine/core"

export const Authentication: React.FC = () => {
  const views = ['Sign up', 'Sign in']
  const [value, setValue] = useState(views[0])
  const { height, width } = useViewportSize()
  return (
    <SimpleGrid cols={2}>
      <Center>
        <Container size="50%" styles={{
          root: {
            alignItems: "center"
          }
        }}>
          <Center>
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
          </Center>
          {value === views[0] ? <Register /> : <Login />}
        </Container>
      </Center>
      <Center>
        <Container py={22}>
          <Image src={collaboration} fit="cover" h={height * 0.85} w={width / 2} radius="lg" />
        </Container>
      </Center>
    </SimpleGrid>
  )
}
