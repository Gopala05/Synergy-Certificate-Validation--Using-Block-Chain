import React from 'react';
import { memo, SVGProps } from 'react';

const Line9Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 1239 2' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M7.54675e-06 1.18069L1239 2.02649e-08' stroke='white' strokeOpacity={0.9} />
  </svg>
);

const Memo = memo(Line9Icon);
export { Memo as Line9Icon };
