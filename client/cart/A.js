import React from 'react'
import NoSSR from 'react-no-ssr'






export default function A({ name }) {
  return (
  <NoSSR>
    <h1>Hello, {name}!</h1>
    </NoSSR>
  );
}


