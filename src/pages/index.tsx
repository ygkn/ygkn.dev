import React from 'react';
import { SEO } from 'src/components';

import styled from '@emotion/styled';

const Component: React.FCX = ({ className }) => {
  return (
    <main className={className}>
      <h1>Welcome to ygkn.dev</h1>
    </main>
  );
};

const StyledComponent = styled(Component)``;

export default (props: any) => {
  return (
    <>
      <SEO title='Home' pathname={props.path} />
      <StyledComponent />
    </>
  );
};
