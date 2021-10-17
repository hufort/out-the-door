import React, { useState } from 'react'
import { css } from '@emotion/react'
import { Flex, Grid } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Flex width="100%" height="100vh" position="relative">
      <Header>
        <h1 css={css({ fontSize: '1rem' })}>Out the door</h1>
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          +
        </button>
      </Header>
      <BodyGrid>
        {Array.from(new Array(count)).map((c, i) => (
          <UserContainer key={i} />
        ))}
      </BodyGrid>
    </Flex>
  )
}

const Header = ({ children }) => (
  <Flex
    axis="horizontal"
    alignment="center"
    padding="1rem"
    distribution="space-between"
    width="100%"
    position="sticky"
    top="0"
    background="white"
    borderBottom="1px solid lightgrey"
  >
    {children}
  </Flex>
)

const BodyGrid = ({ children }) => (
  <Grid
    columns="1fr 1fr"
    gap="1rem"
    grow
    gridAutoRows="max-content"
    height="100%"
    padding="1rem"
    width="100%"
  >
    {children}
  </Grid>
)

const UserContainer = ({ children }) => (
  <Flex background="tomato" borderRadius="3px" height="15rem" />
)

export default App
