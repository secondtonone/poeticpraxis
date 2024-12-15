import type { FunctionalComponent } from 'preact';

import randomize from '@utils/randomize';

import {
  PinButton,
  StyledMatchList,
  Item
} from './styled';

import InlineInput from '@components/InlineInput';

import Cancel from '@icons/Cancel';
import CheckCircle from '@icons/CheckCircle';

interface MatchListProps {
  compact?: boolean
  changeItem?: (index: number, value: string) => void
  type: string
  list: Array<Array<string | undefined> | string>
  handler: React.MouseEventHandler<HTMLButtonElement>
}

const MatchList: FunctionalComponent<MatchListProps> = ({
  handler,
  list,
  type,
  changeItem,
  compact
}) => {
  return (
    <StyledMatchList>
      {list.map((match, index) => {
        const value = Array.isArray(match) ? match.join(' ') : match;
        return (
          <Item
            key={`p${randomize()}-${index}`}
            compact={compact}>
            <PinButton
              _rounded
              _transparent
              _middle
              _gray
              pinned={type === 'cancel'}
              type="button"
              onClick={handler}
              title={type === 'cancel' ? 'Удалить' : 'Выбрать'}
              data-index={index}>
              {type === 'cancel' ? (
                <Cancel _middle data-index={index} />
              ) : (
                <CheckCircle _middle data-index={index} />
              )}
            </PinButton>
            {changeItem ? (
              <InlineInput
                value={value}
                onChange={(value) => {
                  changeItem(index, value);
                }}
              />
            ) : (
              value
            )}
          </Item>
        );
      })}
    </StyledMatchList>
  );
};

export default MatchList;
