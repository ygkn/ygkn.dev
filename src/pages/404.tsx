import React from 'react';
import { SEO } from 'src/components';

import styled from '@emotion/styled';

const Component: React.FCX = ({ className }) => (
  <main className={className}>
    <h1>Not Found</h1>
  </main>
);

const StyledComponent = styled(Component)``;

export default (props: any) => {
  return (
    <>
      <SEO title='Not Found' pathname={props.path} />
      <StyledComponent />
    </>
  );
};
