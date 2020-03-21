import { h, Component } from 'preact';

import { Input, InputButton } from './styled';

import { Container } from '@styles/components';

import DoneIcon from '@icons/DoneIcon';
import EditIcon from '@icons/EditIcon';

export default class InlineInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            value: props.value,
            onHover: false
        };

        this.container = null;
        this.input = null;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (e) => {
        if (this.state.isEdit && !this.container.contains(e.target)) {
            this.toggleEdit();
        }
    }

    toggleEdit = () => {
        const isEdit = !this.state.isEdit;

        if (!isEdit) {
            this.props.onChange(this.state.value);
        }

        console.log('toggleEdit');

        this.setState({
            isEdit,
            onHover: false
        }, () => {
            if (this.state.isEdit && this.input) {
                this.input.focus();
            }
        });
    };

    onChange = (e) => {
        this.setState({
            value: e.target.value
        });
    };

    onHover = (onHover) => {
        return () =>
            this.setState({
                onHover
            });
    };

    render() {
        const { value, isEdit, onHover } = this.state;
        return (
            <Container
                ref={(ref) => (this.container = ref)}
                display="flex"
                onMouseEnter={this.onHover(true)}
                onMouseLeave={this.onHover(false)}>
                {!isEdit ? (
                    <span>{value}</span>
                ) : (
                    <Input
                        value={value}
                        onChange={this.onChange}
                        readOnly={!isEdit}
                        ref={(ref) => (this.input = ref)}
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
