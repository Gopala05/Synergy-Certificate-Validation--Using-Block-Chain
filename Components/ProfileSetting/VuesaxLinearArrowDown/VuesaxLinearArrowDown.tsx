import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './VuesaxLinearArrowDown.module.css';
import { VuesaxLinearArrowDownIcon } from './VuesaxLinearArrowDownIcon.tsx';
import React from 'react';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
}
/* @figmaId 1:52 */
export const VuesaxLinearArrowDown: FC<Props> = memo(function VuesaxLinearArrowDown(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={classes.vuesaxLinearArrowDown}>
        <VuesaxLinearArrowDownIcon className={classes.icon} />
      </div>
    </div>
  );
});
