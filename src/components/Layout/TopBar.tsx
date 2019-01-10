import React from 'react'
import { Section } from 'bloomer'

interface ITopBar {
  children?: React.ReactElement<any>
}

const TopBar = (props: ITopBar): React.ReactNode => {
  const { children } = props
  return (
    <Section>
      {children}
    </Section>
  )
}

export { TopBar }
