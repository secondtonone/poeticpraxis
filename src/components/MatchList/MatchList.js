import { h, Component } from 'preact';

import { randomize } from '../../utils';

import { StyledMatchList } from './styled';

import Cancel from '../../components/IconSVG/Cancel';
import CheckCircle from '../../components/IconSVG/CheckCircle';

export default class MatchList extends Component {
    render({ handler, list, type }) {
        return (
            <StyledMatchList onClick={handler}>
                {list.map((match, index) => {
                    return (
                        <StyledMatchList.Item key={`p${randomize()}`}>
                            <StyledMatchList.PinButton
                                _rounded
                                _transparent
                                _middle
                                _gray
                                pinned={type === 'cancel'}
                                type="button"
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
                            {Array.isArray(match) ? match.join(' ') : match}
                        </StyledMatchList.Item>
                    );
                })}
            </StyledMatchList>
        );
    }
}
