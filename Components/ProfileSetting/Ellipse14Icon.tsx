import React from 'react';
import { memo, SVGProps } from 'react';

const Ellipse14Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    preserveAspectRatio='none'
    viewBox='0 0 56 46'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    {...props}
  >
    <ellipse cx={28} cy={23} rx={28} ry={23} fill='url(#pattern0_2584_17)' />
    <defs>
      <pattern id='pattern0_2584_17' patternContentUnits='objectBoundingBox' width={1} height={1}>
        <use xlinkHref='#image0_2584_17' transform='matrix(0.00444444 0 0 0.00541063 0 -0.108696)' />
      </pattern>
      <image
        id='image0_2584_17'
        width={225}
        height={225}
        xlinkHref='data:image/png;base64,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'
      />
    </defs>
  </svg>
);

const Memo = memo(Ellipse14Icon);
export { Memo as Ellipse14Icon };
