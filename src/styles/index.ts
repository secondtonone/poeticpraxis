import { css, type FlattenSimpleInterpolation } from 'styled-components';

import common from './common';
import reset from './reset';

const styles: FlattenSimpleInterpolation = css`
  ${reset}
  ${common}
`;

export default styles;
