import { h, Component } from 'preact';

import { randomize } from '../../utils';

import { StyledMatchList } from './styled';

import InlineInput from '../../components/InlineInput';

import Cancel from '../../components/IconSVG/Cancel';
import CheckCircle from '../../components/IconSVG/CheckCircle';

export default class MatchList extends Component {
    render() {
        const { handler, list, type, changeItem, compact } = this.props;
        return (
            <StyledMatchList>
                {list.map((match, index) => {
                    const value = Array.isArray(match)
                        ? match.join(' ')
                        : match;
                    return (
                        <StyledMatchList.Item key={`p${randomize()}-${index}`} compact={compact}>
                            <StyledMatchList.PinButton
                                _rounded
                                _transparent
                                _middle
                                _gray
                                pinned={type === 'cancel'}
                                type="button"
                                onClick={handler}
                                title={
                                    type === 'cancel' ? 'Удалить' : 'Выбрать'
                                }
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
}
