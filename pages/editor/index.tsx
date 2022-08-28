import React from 'react'
import MainEditor from '../../components/editors/MainEditor/MainEditor'
import { BuildInfo, BuildInfoProps } from '../../components/buildinfo/BuildInfo'

const Index = ({ staticBuildTimestamp, requestTimestamp }: BuildInfoProps) => {
  return (
    <>
      <BuildInfo
        staticBuildTimestamp={staticBuildTimestamp}
        requestTimestamp={requestTimestamp}
      />
      <MainEditor />
    </>
  )
}
/*export async function getServerSideProps(context) {
  const timestamp = new Date().toDateString()
  console.log('getServerSideProps', timestamp)
  return {
    props: {
      requestTimestamp: timestamp,
    }, // will be passed to the page component as props
  }
}*/
export async function getStaticProps(context) {
  const timestamp = new Date().toISOString()
  console.log('getStaticProps', timestamp)
  return {
    props: {
      staticBuildTimestamp: timestamp,
    }, // will be passed to the page component as props
  }
}
export default Index
