import { h } from 'preact';

import randomize from '@utils/randomize';

import { StyledMatchList } from './styled';

import InlineInput from '@components/InlineInput';

import Cancel from '@icons/Cancel';
import CheckCircle from '@icons/CheckCircle';

export default function MatchList({
    handler,
    list,
    type,
    changeItem,
    compact
}) {
    return (
        <StyledMatchList>
            {list.map((match, index) => {
                const value = Array.isArray(match) ? match.join(' ') : match;
                return (
                    <StyledMatchList.Item
                        key={`p${randomize()}-${index}`}
                        compact={compact}>
                        <StyledMatchList.PinButton
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
                        </StyledMatchList.PinButton>
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
                    </StyledMatchList.Item>
                );
            })}
        </StyledMatchList>
    );
}
