import { h } from 'preact';
import { useEffect } from 'preact/compat';

import useResizeUpdate from '@hooks/useResizeUpdate';
import useTitlePage from '@hooks/useTitlePage';
import useChangeHreflang from '@hooks/useChangeHreflang';

import scrollToAnchor from '@utils/scrollToAnchor';
import maxMatchMedia from '@utils/maxMatchMedia';
import getDaysFromNow from '@utils/getDaysFromNow';
import engSuffixNumber from '@utils/engSuffixNumber';

import AboutLanding from './AboutLanding';
import AboutEngine from './AboutEngine';
import AboutRhythmic from './AboutRhythmic';
import AboutProject from './AboutProject';

import {
    Footer
} from '@styles/components';


const daysFromNow = getDaysFromNow(new Date(2016, 4, 25));
const engDateSuffix = engSuffixNumber(daysFromNow);

const About = ({ lang = 'ru', variant }) => {
    const { innerHeight } = useResizeUpdate(800);

    const isRusLang = lang === 'ru';
    const title = isRusLang ? 'Поэтическая практика - ГЛАВНАЯ' : 'HOME';
    const mediaQuery = maxMatchMedia(800);

    useChangeHreflang();
    useTitlePage(title);

    useEffect(() => {
        scrollToAnchor();
    }, []);

    return (
        <section>
            <AboutLanding
                variant={variant}
                lang={lang}
                mediaQuery={mediaQuery}
                boundHeight={innerHeight}
            />

            <AboutEngine
                lang={lang}
                mediaQuery={mediaQuery}
            />

            <AboutRhythmic
                lang={lang}
                mediaQuery={mediaQuery}
            />

            <AboutProject
                lang={lang}
                mediaQuery={mediaQuery}
                boundHeight={innerHeight}
            />

            <Footer>
                &copy; POETIC PRAXIS {daysFromNow}
                {isRusLang ? '-й день' : `${engDateSuffix} day`}
            </Footer>
        </section>
    );
};

export default About;
