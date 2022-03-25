import { FunctionalComponent } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/compat';

import { Input, InputButton } from './styled';

import Container from '@components/Container';

import DoneIcon from '@icons/DoneIcon';
import EditIcon from '@icons/EditIcon';

interface InlineInputProps {
    value: string
    onChange: (value: string) => void
}

const InlineInput: FunctionalComponent<InlineInputProps> = ({ onChange, value }) => {

  const container = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [ isEdit, setEdit ] = useState<boolean>(false);
  const [ text, setText ] = useState<string>(value);
  const [ isHover, setHover ] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isEdit && !container.current?.contains(target)) {
        toggleEdit();
      }
    };

    if (isEdit && input.current) {
      input.current.focus();
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [isEdit]);

  const toggleEdit = useCallback(() => {
    if (isEdit) {
      onChange(text);
    }
    setEdit(!isEdit);
    setHover(false);
  }, [isEdit, text]);

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    []
  );

  const onMouseEnter = useCallback(() => {
    setHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <Container
      ref={container}
      display="flex"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {!isEdit ? (
        <span>{text}</span>
      ) : (
        <Input
          value={text}
          onChange={onChangeInput}
          readOnly={!isEdit}
          ref={input}
        />
      )}

      {(isHover || isEdit) && (
        <InputButton
          _rounded
          _transparent
          _small
          _gray
          type="button"
          title={!isEdit ? 'Редактировать' : 'Сохранить'}
          onClick={toggleEdit}>
          {!isEdit ? <EditIcon _middle /> : <DoneIcon _middle />}
        </InputButton>
      )}
    </Container>
  );
};

export default InlineInput;
