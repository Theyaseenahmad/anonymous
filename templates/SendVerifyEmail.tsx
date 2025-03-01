import { Head, Heading,Preview,Section,Row,Html,Text } from "@react-email/components";

import React from 'react'

const SendVerifyEmail = (username:string,verifyCode:string) => {
  return (
    <Html lang="en">
        <Head>
            <title>Verification code</title>
        </Head>
        
        <Preview>Verification code : {verifyCode}</Preview>
        <Section>
        <Heading as="h2">true Feedback</Heading>
            <Row>
                <Text>hey! {username}</Text>
            </Row>
            <Row>
                <Text>your verification code is : {verifyCode}</Text>
            </Row>
        </Section>
    </Html>
  )
}

export default SendVerifyEmail