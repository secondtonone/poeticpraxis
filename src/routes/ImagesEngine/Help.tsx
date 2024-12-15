import type { FunctionalComponent } from 'preact';

import useSessionStorage from '@hooks/useSessionStorage';
import type { Langs } from '@typings/Langs';

import Info from '@components/Info';

import Container from '@components/Container';

import isSupportRecognition from '@utils/isSupportRecognition';

const useHelpState = () => {
  const { valueSessionStorage, setValueSessionStorage } = useSessionStorage(
    'isHideImagesEngineHelp'
  );

  return {
    isHidden: valueSessionStorage,
    hideHelp: () => setValueSessionStorage('true'),
  };
};

const Help: FunctionalComponent<{ lang: Langs }> = ({ lang = 'ru' }) => {
  const recognitionSupport = isSupportRecognition();
  const isLangRU = lang === 'ru';
  const { isHidden, hideHelp } = useHelpState();

  if (isHidden) {
    return null;
  }

  return (
    <Info
      lang={lang}
      onClose={hideHelp}
      unfoldedContent={
        <div>
          <Container margin="10px 0 0">
            {isLangRU
              ? `Записывайте ${
                recognitionSupport ? 'или диктуйте' : ''
              }
                        слова, любые которые приходят вам в голову и в голову
                        ваших друзей.`
              : `Write down ${
                recognitionSupport ? 'or dictate' : ''
              } words that come to your mind and to mind of your friends.`}
          </Container>
          {lang === 'ru' ? (
            <Container margin="10px 0 0">
                            Дополнительно к ним можно получить случайные слова
                            нажав на "Найти слова".
            </Container>
          ) : null}
          <Container margin="10px 0 0">
            {isLangRU
              ? 'Нажмите на кнопку "Собрать", чтобы получить словосочетания.'
              : 'Click on the “Montage” button to get phrases.'}
          </Container>
          <Container margin="10px 0 0">
            {isLangRU
              ? 'Выбирайте те, которые привлекли ваше внимание и дополняйте их для создания образов ранее ещё не проявленных.'
              : 'Choose those that have attracted your attention and supplement them to create images that have not yet been manifested.'}
          </Container>
        </div>
      }
      foldedContent={
        <div>
          {isLangRU
            ? 'Как завести мотор этой машины?'
            : 'How to start the engine of this machine?'}
        </div>
      }
    />
  );
};

export default Help;
