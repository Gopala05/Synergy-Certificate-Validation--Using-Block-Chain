import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { Ellipse11Icon } from './Ellipse11Icon.tsx';
import { Ellipse13Icon } from './Ellipse13Icon.tsx';
import { Ellipse14Icon } from './Ellipse14Icon.tsx';
import { Ellipse15Icon } from './Ellipse15Icon.tsx';
import { Ellipse16Icon } from './Ellipse16Icon.tsx';
import { Ellipse17Icon } from './Ellipse17Icon.tsx';
import { Line9Icon } from './Line9Icon.tsx';
import { Line10Icon } from './Line10Icon.tsx';
import { PlaceholderIcon } from './PlaceholderIcon.tsx';
import classes from './ProfileSetting.module.css';
import { Rectangle6691Icon } from './Rectangle6691Icon.tsx';
import { VuesaxLinearArrowDown } from './VuesaxLinearArrowDown/VuesaxLinearArrowDown.tsx';
import { Woman5Icon } from './Woman5Icon.tsx';
import React from 'react';

interface Props {
  className?: string;
}
/* @figmaId 2502:58 */
export const ProfileSetting: FC<Props> = memo(function ProfileSetting(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle6692}></div>
      <div className={classes.rectangle6696}></div>
      <div className={classes.rectangle6691}>
        <Rectangle6691Icon className={classes.icon} />
      </div>
      <div className={classes.ellipse11}>
        <Ellipse11Icon className={classes.icon2} />
      </div>
      <VuesaxLinearArrowDown className={classes.vuesaxLinearArrowDown} />
      <div className={classes.sYNERGY}>SYNERGY</div>
      <div className={classes.rectangle6693}></div>
      <div className={classes.ellipse13}>
        <Ellipse13Icon className={classes.icon3} />
      </div>
      <div className={classes.wadeWarren}>Wade Warren</div>
      <div className={classes.rectangle6694}></div>
      <div className={classes.ellipse14}>
        <Ellipse14Icon className={classes.icon4} />
      </div>
      <div className={classes.wadewarrenGmailCom}>wadewarren@gmail.com</div>
      <div className={classes.rectangle6695}></div>
      <div className={classes.ellipse15}>
        <Ellipse15Icon className={classes.icon5} />
      </div>
      <div className={classes.ellipse16}>
        <Ellipse16Icon className={classes.icon6} />
      </div>
      <div className={classes._917845127845}>+91 7845127845</div>
      <div className={classes.ellipse17}>
        <Ellipse17Icon className={classes.icon7} />
      </div>
      <div className={classes.india}>India</div>
      <div className={classes.line9}>
        <Line9Icon className={classes.icon8} />
      </div>
      <div className={classes.line10}>
        <Line10Icon className={classes.icon9} />
      </div>
      <div className={classes._2024AllCopyrightsReservedSYNER}>2024 | All Copyrights Reserved | SYNERGY</div>
      <div className={classes.image5}></div>
      <div className={classes.buttons}>
        <div className={classes.user_name}>user_name</div>
      </div>
      <div className={classes.woman5}>
        <Woman5Icon className={classes.icon10} />
      </div>
      <div className={classes.rectangle1072}></div>
      <div className={classes.rectangle10722}></div>
      <div className={classes.rectangle10723}></div>
      <div className={classes.rectangle10724}></div>
      <div className={classes.rectangle10725}></div>
      <div className={classes.rectangle10726}></div>
      <div className={classes.sUPPORT}>SUPPORT</div>
      <div className={classes.rectangle10727}></div>
      <div className={classes.bLOG}>BLOG</div>
      <div className={classes.rectangle10728}></div>
      <div className={classes.uPLOAD}>UPLOAD</div>
      <div className={classes.rectangle10729}></div>
      <div className={classes.vERIFY}>VERIFY</div>
      <div className={classes.line11}></div>
      <div className={classes.rectangle21}></div>
      <div className={classes.placeholder}>
        <PlaceholderIcon className={classes.icon11} />
      </div>
    </div>
  );
});
