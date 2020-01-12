import { h, Component } from 'preact';

import { Input, InputButton } from './styled';

import { Container } from '../../styles/components';

import DoneIcon from '../IconSVG/DoneIcon';
import EditIcon from '../IconSVG/EditIcon';

export default class InlineInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            value: props.value,
            onHover: false
        };
    }

    toggleEdit = () => {
        const isEdit = !this.state.isEdit;

        if (!isEdit) {
            this.props.onChange(this.state.value);
        }

        this.setState({
            isEdit,
            onHover: false
        });
    };

    onChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    onHover = (onHover) => {
        return () => this.setState({
            onHover
        });
    };

    render() {
        const { value, isEdit, onHover } = this.state;
        return (
            <Container display="flex" onMouseEnter={this.onHover(true)} onMouseLeave={this.onHover(false)}>
                {!isEdit ? (
                    <span>{value}</span>
                ) : (
                    <Input
                        value={value}
                        onChange={this.onChange}
                        readOnly={!isEdit}
                    />
                )}

                {(onHover || isEdit) && (
                    <InputButton
                        _rounded
                        _transparent
                        _small
                        _gray
                        type="button"
                        title={!isEdit ? 'Редактировать' : 'Сохранить'}
                        onClick={this.toggleEdit}>
                        {!isEdit ? <EditIcon _middle /> : <DoneIcon _middle />}
                    </InputButton>
                )}
            </Container>
        );
    }
}
