import React, { useCallback, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { Dropdown, Flex, Grid } from './components'

function App() {
  const [count, setCount] = useState(0)
  return (
    <Flex width="100%" height="100vh" position="relative">
      <Header>
        <h1 css={css({ fontSize: '1rem' })}>Out the Door</h1>
        <Dropdown title="New user" placement="bottom-end">
          <Flex padding="8px">
            <button type="button" onClick={() => setCount((c) => c + 1)}>
              +
            </button>
          </Flex>
        </Dropdown>
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
    alignment="center"
    axis="horizontal"
    background="white"
    borderBottom="1px solid lightgrey"
    distribution="space-between"
    padding="1rem"
    position="sticky"
    top="0"
    width="100%"
  >
    {children}
  </Flex>
)

const BodyGrid = ({ children }) => (
  <Grid
    columns="1fr 1fr"
    gap="1rem"
    gridAutoRows="max-content"
    grow
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
