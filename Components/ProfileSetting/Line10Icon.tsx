import React from 'react';
import { memo, SVGProps } from 'react';

const Line10Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 1457 1' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M5.56453e-08 0.205317L1457 1' stroke='white' strokeOpacity={0.9} />
  </svg>
);

const Memo = memo(Line10Icon);
export { Memo as Line10Icon };
